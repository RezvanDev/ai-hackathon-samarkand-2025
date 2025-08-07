"use client";

import FileTest from "@/components/custom/FileTest";
import ManualTest from "@/components/custom/ManualTest";
import React, { useState } from "react";
import { Upload, FileText, BarChart3, Sparkles } from "lucide-react";
import AnalysisResults from "@/components/custom/AnalysisResults";

const Page: React.FC = () => {
    const [analysisData, setAnalysisData] = useState<any[]>([]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        AI-анализ медицинских данных
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">
                        Анализ здоровья
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Загрузите файл с анализами или введите данные вручную для получения мгновенной расшифровки
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Left Column - Input Methods */}
                    <div className="space-y-8">
                        {/* File Upload Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <Upload className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">Загрузка файла</h3>
                                        <p className="text-blue-100 text-sm">Поддерживаемые форматы: PDF, DOC, JPG, PNG</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <FileTest onAnalysisResult={setAnalysisData} />
                            </div>
                        </div>

                        {/* Manual Input Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">Ручной ввод</h3>
                                        <p className="text-green-100 text-sm">Введите данные анализов в текстовом формате</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <ManualTest />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Results */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Результаты анализа</h3>
                                    <p className="text-purple-100 text-sm">Детальная расшифровка и рекомендации</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <AnalysisResults data={analysisData} />
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Возможности анализа
                        </h2>
                        <p className="text-gray-600">
                            Наша система может обрабатывать различные типы медицинских данных
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Лабораторные анализы</h3>
                            <p className="text-sm text-gray-600">Общий анализ крови, биохимия, гормоны</p>
                        </div>

                        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Визуализация данных</h3>
                            <p className="text-sm text-gray-600">Графики и диаграммы для наглядности</p>
                        </div>

                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">AI-рекомендации</h3>
                            <p className="text-sm text-gray-600">Персональные советы от ИИ-ассистента</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;