"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Mic, MicOff, Volume2, VolumeX } from "lucide-react";

async function sendMessageToBackend(message: string): Promise<string> {
  try {
    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    });
    const data = await res.json();
    if (data.error) return `Ошибка: ${data.error}`;
    if (data.answer) return data.answer;
    return JSON.stringify(data);
  } catch (e) {
    return "Ошибка соединения с сервером";
  }
}

// Добавляем тип для webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition?: any;
  }
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Здравствуйте! Я ваш ИИ-ассистент. Чем могу помочь?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [isAutoSpeak, setIsAutoSpeak] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Инициализация распознавания речи (браузерное API)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0]?.transcript ?? "")
        .join(" ")
        .trim();
      if (transcript) {
        setInput((prev) => (prev ? prev + " " : "") + transcript);
      }
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  // Голос: произнести текст
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    const voices = window.speechSynthesis.getVoices();
    const ru = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("ru"));
    const fallback = voices.find((v) => v.lang && v.lang.toLowerCase().includes("ru"));
    const pick = ru ?? fallback ?? null;
    if (pick) utterance.voice = pick;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Начать/остановить запись при удержании кнопки
  const startListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      alert("Распознавание речи недоступно в этом браузере");
      return;
    }
    // простая эвристика определения языка по введённому тексту
    const textSample = (input || "").slice(-100).toLowerCase();
    const hasLatin = /[a-z]/i.test(textSample);
    const hasCyrillic = /[а-яё]/i.test(textSample);
    // Если явных подсказок нет, оставляем ru-RU по умолчанию.
    if (hasLatin && !hasCyrillic) {
      // Предположим английский для латиницы (в т.ч. uz-latin часто близок к en для распознавания на клиенте)
      recognition.lang = "en-US";
    } else if (hasCyrillic) {
      recognition.lang = "ru-RU";
    } else {
      // попытаться узбекский, если доступен в браузере (редко поддерживается)
      // стандартного uz-UZ во многих движках нет; fallback — ru-RU
      recognition.lang = "ru-RU";
    }
    if (!isListening) {
      try {
        recognition.start();
        setIsListening(true);
      } catch { }
    }
  };

  const stopListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (isListening) {
      try { recognition.stop(); } catch { }
      setIsListening(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = { from: "user", text: input } as const;
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    setMessages((msgs) => [...msgs, { from: "ai", text: "Ассистент печатает..." }]);
    const answer = await sendMessageToBackend(userMsg.text);
    setMessages((msgs) => [
      ...msgs.slice(0, -1),
      { from: "ai", text: answer },
    ]);
    setLoading(false);
    if (isAutoSpeak && answer) {
      speakText(answer);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 cursor-pointer right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          aria-label="Открыть чат с ассистентом"
        >
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Modal Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">ИИ-ассистент</h3>
                <p className="text-blue-100 text-xs">Онлайн консультация</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Закрыть чат"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.from === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                      : "bg-gradient-to-r from-gray-500 to-gray-600"
                    }`}>
                    {msg.from === "user" ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Bot className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl ${msg.from === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                      : "bg-white text-gray-800 shadow-sm border border-gray-200"
                    }`}>
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    {/* Кнопка озвучить для сообщений ИИ */}
                    {msg.from === "ai" && (
                      <div className="flex justify-end mt-1">
                        <button
                          type="button"
                          onClick={() => (isSpeaking ? stopSpeaking() : speakText(msg.text))}
                          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          aria-label="Озвучить ответ"
                        >
                          {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                          {isSpeaking ? "Стоп" : "Озвучить"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ваш вопрос..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                disabled={loading}
              />
              {/* Кнопка микрофона (удерживать) */}
              <button
                type="button"
                onPointerDown={startListening}
                onPointerUp={stopListening}
                onPointerLeave={stopListening}
                onPointerCancel={stopListening}
                disabled={loading}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 ${isListening
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                aria-label={isListening ? "Отпустите, чтобы остановить запись" : "Удерживайте, чтобы говорить"}
                title={isListening ? "Отпустите, чтобы остановить запись" : "Удерживайте, чтобы говорить"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              {/* Тумблер автоозвучки */}
              <button
                type="button"
                onClick={() => setIsAutoSpeak((v) => !v)}
                disabled={loading}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 ${isAutoSpeak
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                aria-label={isAutoSpeak ? "Отключить автоозвучку" : "Включить автоозвучку"}
                title={isAutoSpeak ? "Отключить автоозвучку" : "Включить автоозвучку"}
              >
                {isAutoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:scale-100"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
} 