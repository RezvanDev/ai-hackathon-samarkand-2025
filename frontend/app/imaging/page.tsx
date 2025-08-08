"use client";

import React, { useState, useRef, useCallback } from "react";
import { Upload, X, FileImage, FileText, AlertCircle, CheckCircle, Loader2, Brain, Eye, Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingAnimate from "@/components/custom/LoadingAnimate";

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  status: 'uploading' | 'success' | 'error' | 'analyzing';
  progress: number;
  error?: string;
  analysis?: string;
}

// Функция для выделения ключевых слов в анализе
const highlightKeywords = (text: string) => {
  if (!text) return text;

  // Ключевые медицинские термины и их категории с inline стилями
  const keywords = {
    // Типы исследований
    'МРТ': 'background-color: #dbeafe; color: #1e40af;',
    'КТ': 'background-color: #dbeafe; color: #1e40af;', 
    'рентген': 'background-color: #dbeafe; color: #1e40af;',
    'УЗИ': 'background-color: #dbeafe; color: #1e40af;',
    'томография': 'background-color: #dbeafe; color: #1e40af;',
    
    // Анатомические структуры
    'мозг': 'background-color: #dcfce7; color: #166534;',
    'сердце': 'background-color: #dcfce7; color: #166534;',
    'легкие': 'background-color: #dcfce7; color: #166534;',
    'печень': 'background-color: #dcfce7; color: #166534;',
    'почки': 'background-color: #dcfce7; color: #166534;',
    'позвоночник': 'background-color: #dcfce7; color: #166534;',
    'кости': 'background-color: #dcfce7; color: #166534;',
    'сосуды': 'background-color: #dcfce7; color: #166534;',
    'нервы': 'background-color: #dcfce7; color: #166534;',
    
    // Патологии
    'опухоль': 'background-color: #fee2e2; color: #991b1b;',
    'рак': 'background-color: #fee2e2; color: #991b1b;',
    'перелом': 'background-color: #fee2e2; color: #991b1b;',
    'травма': 'background-color: #fee2e2; color: #991b1b;',
    'воспаление': 'background-color: #fee2e2; color: #991b1b;',
    'инфекция': 'background-color: #fee2e2; color: #991b1b;',
    'кровотечение': 'background-color: #fee2e2; color: #991b1b;',
    'отек': 'background-color: #fee2e2; color: #991b1b;',
    
    // Статусы
    'норма': 'background-color: #dcfce7; color: #166534;',
    'нормальный': 'background-color: #dcfce7; color: #166534;',
    'патология': 'background-color: #fee2e2; color: #991b1b;',
    'патологический': 'background-color: #fee2e2; color: #991b1b;',
    'отклонение': 'background-color: #fef3c7; color: #92400e;',
    'аномалия': 'background-color: #fef3c7; color: #92400e;',
    
    // Качество изображения
    'четкость': 'background-color: #f3e8ff; color: #6b21a8;',
    'контрастность': 'background-color: #f3e8ff; color: #6b21a8;',
    'качество': 'background-color: #f3e8ff; color: #6b21a8;',
    'разрешение': 'background-color: #f3e8ff; color: #6b21a8;',
    
    // Рекомендации
    'консультация': 'background-color: #fed7aa; color: #c2410c;',
    'специалист': 'background-color: #fed7aa; color: #c2410c;',
    'врач': 'background-color: #fed7aa; color: #c2410c;',
    'срочно': 'background-color: #fee2e2; color: #991b1b;',
    'немедленно': 'background-color: #fee2e2; color: #991b1b;',
    'рекомендуется': 'background-color: #dbeafe; color: #1e40af;',
    'необходимо': 'background-color: #dbeafe; color: #1e40af;',
    
    // Размеры и измерения
    'мм': 'background-color: #f3f4f6; color: #374151;',
    'см': 'background-color: #f3f4f6; color: #374151;',
    'размер': 'background-color: #f3f4f6; color: #374151;',
    'диаметр': 'background-color: #f3f4f6; color: #374151;',
    'объем': 'background-color: #f3f4f6; color: #374151;'
  };

  let highlightedText = text;

  // Заменяем ключевые слова на выделенные версии
  Object.entries(keywords).forEach(([keyword, style]) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    highlightedText = highlightedText.replace(regex, 
      `<span style="padding: 2px 4px; border-radius: 4px; font-size: 0.875rem; font-weight: 500; ${style}">${keyword}</span>`
    );
  });

  // Выделяем важные фразы в кавычках
  highlightedText = highlightedText.replace(
    /"([^"]+)"/g, 
    '<span style="padding: 2px 4px; border-radius: 4px; font-size: 0.875rem; font-weight: 500; background-color: #fef3c7; color: #92400e;">"$1"</span>'
  );

  // Выделяем цифры с единицами измерения
  highlightedText = highlightedText.replace(
    /(\d+(?:\.\d+)?)\s*(мм|см|мл|л|г|кг|%|°)/g,
    '<span style="padding: 2px 4px; border-radius: 4px; font-size: 0.875rem; font-weight: 500; background-color: #f3f4f6; color: #374151;">$1 $2</span>'
  );

  return highlightedText;
};

export default function ImagingPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/tiff',
    'image/tif',
    'application/dicom',
    'application/pdf'
  ];

  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return 'Неподдерживаемый формат файла. Разрешены: JPEG, PNG, TIFF, DICOM, PDF';
    }
    if (file.size > maxFileSize) {
      return 'Файл слишком большой. Максимальный размер: 50MB';
    }
    return null;
  };

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve('/file.svg'); // Fallback icon
      }
    });
  };

  const handleFiles = useCallback(async (files: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const error = validateFile(file);
      
      if (error) {
        newFiles.push({
          id: `${Date.now()}-${i}`,
          file,
          status: 'error',
          progress: 0,
          error
        });
        continue;
      }

      const preview = await createPreview(file);
      newFiles.push({
        id: `${Date.now()}-${i}`,
        file,
        preview,
        status: 'uploading',
        progress: 0
      });
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach((fileObj, index) => {
      if (fileObj.status === 'uploading') {
        const interval = setInterval(() => {
          setUploadedFiles(prev => prev.map(f => {
            if (f.id === fileObj.id) {
              const newProgress = Math.min(f.progress + 10, 100);
              const newStatus = newProgress === 100 ? 'success' : 'uploading';
              return { ...f, progress: newProgress, status: newStatus };
            }
            return f;
          }));
          
          if (fileObj.progress >= 100) {
            clearInterval(interval);
          }
        }, 200);
      }
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const retryUpload = async (id: string) => {
    setUploadedFiles(prev => prev.map(f => 
      f.id === id ? { ...f, status: 'uploading', progress: 0, error: undefined } : f
    ));
    
    // Simulate retry
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(f => {
        if (f.id === id) {
          const newProgress = Math.min(f.progress + 20, 100);
          const newStatus = newProgress === 100 ? 'success' : 'uploading';
          return { ...f, progress: newProgress, status: newStatus };
        }
        return f;
      }));
      
      const currentFile = uploadedFiles.find(f => f.id === id);
      if (currentFile && currentFile.progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const analyzeImage = async (fileObj: UploadedFile) => {
    if (fileObj.status !== 'success') return;

    setUploadedFiles(prev => prev.map(f => 
      f.id === fileObj.id ? { ...f, status: 'analyzing' } : f
    ));
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', fileObj.file);

      const response = await fetch('/api/imaging-analysis', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Сохраняем результат в базу данных
      const saveResponse = await fetch('/api/save-imaging-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: fileObj.file.name,
          analysis: data.analysis,
          file_size: fileObj.file.size,
          analysis_timestamp: data.analysis_timestamp
        }),
      });

      if (saveResponse.ok) {
        const saveData = await saveResponse.json();
        console.log('Анализ сохранен:', saveData);
      }

      setUploadedFiles(prev => prev.map(f => 
        f.id === fileObj.id ? { 
          ...f, 
          status: 'success', 
          analysis: data.analysis || 'Анализ завершен успешно'
        } : f
      ));

      // Добавляем результат в общий список
      setAnalysisResults(prev => [...prev, {
        id: fileObj.id,
        filename: fileObj.file.name,
        analysis: data.analysis,
        timestamp: data.analysis_timestamp
      }]);

    } catch (error) {
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileObj.id ? { 
          ...f, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Ошибка анализа'
        } : f
      ));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const successfulFiles = uploadedFiles.filter(f => f.status === 'success');
  const hasFiles = uploadedFiles.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Анализ снимков</h1>
              <p className="text-gray-600">Загрузите медицинские изображения для ИИ-анализа</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Загрузка файлов</CardTitle>
                    <CardDescription>
                      Поддерживаются: JPEG, PNG, TIFF, DICOM, PDF (до 50MB)
                    </CardDescription>
                  </div>
                  {hasFiles && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{uploadedFiles.length} файл(ов)</span>
                      {successfulFiles.length > 0 && (
                        <span className="text-green-600">• {successfulFiles.length} готово к анализу</span>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 relative ${
                    isDragOver
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10 rounded-lg">
                      <div className="text-center">
                        <LoadingAnimate />
                        <p className="mt-4 text-lg font-medium text-gray-700">Анализируем снимок...</p>
                        <p className="text-sm text-gray-500">ИИ изучает изображение</p>
                      </div>
                    </div>
                  )}

                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Перетащите файлы сюда</h3>
                  <p className="text-gray-600 mb-4">или нажмите для выбора</p>
                  <Button 
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Выбрать файлы
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.tiff,.tif,.dcm,.pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* Files List */}
                {hasFiles && (
                  <div className="mt-6 space-y-3">
                    {uploadedFiles.map((fileObj) => (
                      <div key={fileObj.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        {/* Preview */}
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden border">
                          {fileObj.preview && fileObj.preview !== '/file.svg' ? (
                            <img 
                              src={fileObj.preview} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FileText className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        
                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {fileObj.file.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        
                        {/* Status & Actions */}
                        <div className="flex items-center gap-3">
                          {fileObj.status === 'uploading' && (
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                              <span className="text-sm text-gray-600">{fileObj.progress}%</span>
                            </div>
                          )}
                          
                          {fileObj.status === 'success' && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <Button 
                                size="sm"
                                onClick={() => analyzeImage(fileObj)}
                                disabled={isAnalyzing}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                {isAnalyzing ? (
                                  <>
                                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                    Анализ...
                                  </>
                                ) : (
                                  <>
                                    <Brain className="w-3 h-3 mr-1" />
                                    Анализировать
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                          
                          {fileObj.status === 'analyzing' && (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                <LoadingAnimate />
                                <span className="text-sm text-gray-600">Анализируем...</span>
                              </div>
                            </div>
                          )}
                          
                          {fileObj.status === 'error' && (
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-red-600" />
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => retryUpload(fileObj.id)}
                              >
                                Повторить
                              </Button>
                            </div>
                          )}
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(fileObj.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisResults.length > 0 && (
              <Card className="mt-6 border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Результаты анализа</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResults.map((result) => (
                      <div key={result.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-green-900 mb-2">{result.filename}</h4>
                            <div 
                              className="text-sm text-green-800 whitespace-pre-line leading-relaxed"
                              dangerouslySetInnerHTML={{ 
                                __html: highlightKeywords(result.analysis) 
                              }}
                            />
                            <p className="text-xs text-green-600 mt-2">
                              Анализ выполнен: {new Date(result.timestamp).toLocaleString('ru-RU')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            {successfulFiles.length > 0 && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => successfulFiles.forEach(f => analyzeImage(f))}
                    disabled={isAnalyzing}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Анализируем...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Анализировать все
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Info */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileImage className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Форматы</h4>
                    <p className="text-sm text-gray-600">JPEG, PNG, TIFF, DICOM, PDF</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Безопасность</h4>
                    <p className="text-sm text-gray-600">Ваши данные защищены</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">ИИ-анализ</h4>
                    <p className="text-sm text-gray-600">Автоматическое распознавание</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 