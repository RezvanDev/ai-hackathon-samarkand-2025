"use client";

import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import LoadingAnimate from "./LoadingAnimate";

interface FileTestProps {
  onAnalysisResult: (data: any[]) => void;
}

const FileTest: React.FC<FileTestProps> = ({ onAnalysisResult }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleFile = (file: File) => {
    if (
      file && (
        file.type.match(/application\/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document|text)/) ||
        file.type.match(/image\/(jpeg|jpg|png|bmp|tiff)/)
      )
    ) {
      setSelectedFile(file);
    } else {
      alert("Формат файла не поддерживается");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Сначала выбери файл");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://e946a3a99226.ngrok-free.app/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Результат анализа:", result);
        console.log("Данные для таблицы:", result.medical_results);
        if (result.medical_results && result.medical_results.length > 0) {
          console.log("Первый элемент с рекомендациями:", result.medical_results[0]);
          console.log("Рекомендации первого элемента:", result.medical_results[0].recommendations);
        }
        alert(`Анализ завершён: ${result.inserted_count} показателей добавлено`);
        setSelectedFile(null);
        if (typeof onAnalysisResult === 'function') {
          onAnalysisResult(result.medical_results);
        } else {
          console.error('onAnalysisResult is not a function:', onAnalysisResult);
        }
      } else {
        alert("Ошибка: " + result.error);
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        alert("Ошибка подключения к серверу. Убедитесь, что бэкенд запущен на порту 5001");
      } else {
        alert("Ошибка загрузки: " + (error instanceof Error ? error.message : String(error)));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full border border-dashed border-gray-300 rounded-xl p-10 text-center mx-auto relative"
      >
        {isLoading && (
          <div className="h-full w-full bg-white/80 absolute top-0 left-0 flex justify-center items-center z-10">
            <div className="text-center">
              <LoadingAnimate />
              <p className="mt-2 text-sm text-gray-600">Анализируем документ...</p>
            </div>
          </div>
        )}

        <h2 className="text-lg font-semibold mb-2">
          Загрузка медицинских документов
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Перетащите файл или выберите его вручную, чтобы загрузить анализы
          <br />и получить более точную диагностику.
        </p>

        <label htmlFor="document-upload" className="inline-block">
          <div className="cursor-pointer bg-gray-100 text-gray-800 font-semibold px-5 py-2 rounded-full shadow-sm hover:bg-gray-200 transition">
            Загрузить документ
          </div>
        </label>
        <input
          id="document-upload"
          type="file"
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.bmp,.tiff,image/jpeg,image/png,image/bmp,image/tiff"
          onChange={handleInputChange}
          className="hidden"
        />

        {selectedFile && (
          <div
            className={`mt-4 text-sm text-green-600 transition-opacity duration-500 ${selectedFile ? 'opacity-100' : 'opacity-0'}`}
          >
            {selectedFile ? `Выбран файл: ${selectedFile.name}` : ''}
          </div>
        )}
      </div>

      <Button
        className="bg-blue-500 mt-3 cursor-pointer"
        onClick={handleUpload}
        disabled={isLoading || !selectedFile}
      >
        {isLoading ? "Анализируем..." : "Анализировать"}
      </Button>
    </>
  );
};

export default FileTest;