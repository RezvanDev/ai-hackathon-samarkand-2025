"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { ChartBarInteractive } from "@/components/custom/Chart";
import BackgorundAnimation from "@/components/custom/BackgroundAnimation";
export default function Home() {
  return (
    <div className="px-6 py-4">
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 mt-16">
        {/* Left: Animation */}

        <div className="w-full md:w-1/2 flex justify-center relative z-3">
          <DotLottieReact
            src="/animations/dcf09ed0-2080-4219-81e0-e18fae2bc4ec.json"
            loop
            autoplay
          />
          <div className="absolute z-[-1] w-full top-[-10%]">
            <BackgorundAnimation />
          </div>
        </div>

        {/* Right: Text + Button */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-blue-900 leading-tight drop-shadow-md">
            <Typewriter
              options={{
                strings: [
                  "AI-ассистент по анализам",
                  "Мгновенная проверка здоровья",
                  "Доступная медицина каждому",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>

          <p className="text-lg font-semibold text-blue-700 max-w-xl bg-blue-50/60 px-4 py-2 rounded-lg backdrop-blur-sm shadow">
            Просто загрузите файл с анализами — и получите расшифровку,
            приоритеты заболеваний и рекомендации. Всё за секунды.
          </p>

          <Link href="/analysis">
            <button className="mt-4  bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300">
              Перейти к анализу →
            </button>
          </Link>
        </div>
      </section>

      <div>
        <ChartBarInteractive />
      </div>
    </div>
  );
}
