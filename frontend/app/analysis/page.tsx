"use client";

import ManualTest from "@/components/custom/ManualTest";
import { RobotAnimate } from "@/components/custom/RobotAnimate";
import BackgorundAnimation from "@/components/custom/BackgroundAnimation";
import FileTest from "@/components/custom/FileTest";

interface Props { }

const Analysis: React.FC<Props> = () => {
    return (
        <div className="px-6 py-6 w-full mx-auto overflow-x-hidden">
            <div>
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-blue-900 leading-tight drop-shadow-md mb-4">
                        AI Анализ Результатов
                    </h1>
                    <p className="text-lg font-semibold text-blue-700 w-[70%] bg-blue-50/60 px-4 py-2 rounded-lg backdrop-blur-sm shadow mx-auto ">
                        Введите ваши медицинские показатели для детального анализа и
                        получите расшифровку, приоритеты заболеваний и рекомендации.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                    <div className="text-center w-full p-4 bg-blue-50/60 rounded-lg border border-blue-100 shadow">
                        <div className="text-2xl font-bold text-blue-900">99.8%</div>
                        <div className="text-xs text-blue-700">Точность</div>
                    </div>
                    <div className="text-center w-full p-4 bg-blue-50/60 rounded-lg border border-blue-100 shadow">
                        <div className="text-2xl font-bold text-blue-900">AI</div>
                        <div className="text-xs text-blue-700">Анализ</div>
                    </div>
                    <div className="text-center w-full p-4 bg-blue-50/60 rounded-lg border border-blue-100 shadow">
                        <div className="text-2xl font-bold text-blue-900">24/7</div>
                        <div className="text-xs text-blue-700">Доступ</div>
                    </div>
                </div>
            </div>

            <section className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-16">
                {/* Left: Analysis Form */}
                <div className="w-full space-y-6">
                    {/* Form */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                        <ManualTest />
                    </div>
                </div>

                {/* Right: Robot Animation */}
                <div className="w-full  flex justify-center relative z-3">
                    <RobotAnimate />
                    <div className="absolute z-[-1] w-full top-[-10%]">
{/*                         <BackgorundAnimation />
 */}                    </div>
                </div>
            </section>

            <FileTest/>
        </div>
    );
};

export default Analysis;
