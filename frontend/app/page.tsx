"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { ChartBarInteractive } from "@/components/custom/Chart";
import BackgorundAnimation from "@/components/custom/BackgroundAnimation";
import { 
  Shield, 
  Zap, 
  Heart, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative px-6 py-8 lg:py-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left: Animation */}
            <div className="w-full lg:w-1/2 flex justify-center relative">
              <div className="relative">
                <DotLottieReact
                  src="/animations/dcf09ed0-2080-4219-81e0-e18fae2bc4ec.json"
                  loop
                  autoplay
                  className="w-full max-w-md"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl"></div>
              </div>
              <div className="absolute z-[-1] w-full top-[-10%]">
                <BackgorundAnimation />
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Award className="w-4 h-4" />
                  Инновационное решение для здоровья
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                  <Typewriter
                    options={{
                      strings: [
                        "AI-ассистент",
                        "Проверка здоровья",
                        "Забота доступна",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Просто загрузите файл с анализами — и получите расшифровку,
                  приоритеты заболеваний и рекомендации. Всё за секунды.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/analysis">
                  <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2">
                    Начать анализ
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                
                <button className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl">
                  Узнать больше
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">99%</div>
                  <div className="text-sm text-gray-600">Точность анализа</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">10k+</div>
                  <div className="text-sm text-gray-600">Пользователей</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-600">Доступность</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Наша платформа объединяет передовые технологии ИИ с медицинской экспертизой
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Мгновенный анализ</h3>
              <p className="text-gray-600 leading-relaxed">
                Получите расшифровку анализов за считанные секунды с помощью передового ИИ
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Безопасность данных</h3>
              <p className="text-gray-600 leading-relaxed">
                Ваши медицинские данные защищены современными стандартами шифрования
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Персональный подход</h3>
              <p className="text-gray-600 leading-relaxed">
                Индивидуальные рекомендации на основе ваших уникальных показателей
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100 hover:border-orange-200 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Отслеживание динамики</h3>
              <p className="text-gray-600 leading-relaxed">
                Контролируйте изменения показателей здоровья в динамике
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 hover:border-teal-200 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Экспертная поддержка</h3>
              <p className="text-gray-600 leading-relaxed">
                Доступ к опытным врачам и специалистам через наш чат-ассистент
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-100 hover:border-yellow-200 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Простота использования</h3>
              <p className="text-gray-600 leading-relaxed">
                Интуитивный интерфейс для людей любого возраста и уровня подготовки
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Аналитика и статистика
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Визуализация данных для лучшего понимания вашего здоровья
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <ChartBarInteractive />
          </div>
        </div>
      </section>
    </div>
  );
}
