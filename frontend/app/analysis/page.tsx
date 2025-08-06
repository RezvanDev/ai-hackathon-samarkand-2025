"use client";

import ManualTest from "@/components/custom/ManualTest";
import { RobotAnimate } from "@/components/custom/RobotAnimate";
import BackgorundAnimation from "@/components/custom/BackgroundAnimation";

interface Props {}

const Analysis: React.FC<Props> = () => {
  return (
    <div className="px-6 py-4">
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-16">
        {/* Left: Analysis Form */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-blue-900 leading-tight drop-shadow-md mb-4">
              AI Анализ Результатов
            </h1>
            <p className="text-lg font-semibold text-blue-700 max-w-xl bg-blue-50/60 px-4 py-2 rounded-lg backdrop-blur-sm shadow">
              Введите ваши медицинские показатели для детального анализа и
              получите расшифровку, приоритеты заболеваний и рекомендации.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50/60 rounded-lg border border-blue-100 shadow">
              <div className="text-2xl font-bold text-blue-900">99.8%</div>
              <div className="text-xs text-blue-700">Точность</div>
            </div>
            <div className="text-center p-4 bg-blue-50/60 rounded-lg border border-blue-100 shadow">
              <div className="text-2xl font-bold text-blue-900">AI</div>
              <div className="text-xs text-blue-700">Анализ</div>
            </div>
            <div className="text-center p-4 bg-blue-50/60 rounded-lg border border-blue-100 shadow">
              <div className="text-2xl font-bold text-blue-900">24/7</div>
              <div className="text-xs text-blue-700">Доступ</div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <ManualTest />
          </div>
        </div>

        {/* Right: Robot Animation */}
        <div className="w-full lg:w-1/2 flex justify-center relative z-3">
          <RobotAnimate />
          <div className="absolute z-[-1] w-full top-[-10%]">
            <BackgorundAnimation />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analysis;
