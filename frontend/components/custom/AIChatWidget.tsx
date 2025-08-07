"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

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

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Здравствуйте! Я ваш ИИ-ассистент. Чем могу помочь?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    setMessages((msgs) => [...msgs, { from: "ai", text: "Ассистент печатает..." }]);
    const answer = await sendMessageToBackend(userMsg.text);
    setMessages((msgs) => [
      ...msgs.slice(0, -1), // убираем "Ассистент печатает..."
      { from: "ai", text: answer },
    ]);
    setLoading(false);
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
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
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
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.from === "user" 
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500" 
                      : "bg-gradient-to-r from-gray-500 to-gray-600"
                  }`}>
                    {msg.from === "user" ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Bot className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl ${
                    msg.from === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                      : "bg-white text-gray-800 shadow-sm border border-gray-200"
                  }`}>
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
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