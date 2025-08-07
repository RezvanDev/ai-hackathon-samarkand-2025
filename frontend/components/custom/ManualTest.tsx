"use client";

import { useRef, useState } from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const tabs = [
  "Биохимический анализ крови",
  "Общий анализ крови",
  "Общий анализ мочи",
];

const ManualTest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const swiperRef = useRef<any>(null);
  const handleSlideChange = (index: number) => {
    setActiveTab(index);
    swiperRef.current?.slideTo(index);
  };
  return (
    <div className="w-full">
      <div className="max-w-[800px]">
        <div className="relative flex gap-10  justify-between items-center bg-[#F0F2F5] p-1 rounded-4xl w-full">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`relative z-10 px-6 py-1.5  flex items-center justify-between cursor-pointer text-sm font-semibold rounded-3xl transition-all ${activeTab === index ? "text-black" : "text-gray-400"
                }`}
            >
              {activeTab === index && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-[#9bd5ff] rounded-3xl z-[-1]"
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>

        <Swiper
          className="w-full flex justify-start"
          spaceBetween={10}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        >
          {/* Биохимия */}
          <SwiperSlide>
            <div className="text-black text-sm space-y-2 mt-5 grid grid-cols-2 gap-4">
              <TestInput label="Глюкоза (ммоль/л)" />
              <TestInput label="Холестерин общий (ммоль/л)" />
              <TestInput label="Билирубин общий (мкмоль/л)" />
              <TestInput label="АСТ (ед/л)" />
              <TestInput label="АЛТ (ед/л)" />
            </div>
          </SwiperSlide>

          {/* ОАК */}
          <SwiperSlide>
            <div className="text-black text-sm space-y-2 mt-5 grid grid-cols-2 gap-4">
              <TestInput label="Гемоглобин (г/л)" />
              <TestInput label="Эритроциты (10^12/л)" />
              <TestInput label="Лейкоциты (10^9/л)" />
              <TestInput label="Тромбоциты (10^9/л)" />
              <TestInput label="СОЭ (мм/ч)" />
            </div>
          </SwiperSlide>

          {/* Анализ мочи */}
          <SwiperSlide>
            <div className="text-black text-sm space-y-2 mt-5 grid grid-cols-2 gap-4">
              <TestInput label="Цвет мочи" />
              <TestInput label="Прозрачность" />
              <TestInput label="Относительная плотность" />
              <TestInput label="Белок (г/л)" />
              <TestInput label="Глюкоза (ммоль/л)" />
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="mt-6 mb-6">
          <Button className="bg-[#1A94E5] w-[50%]">Анализировать</Button>
        </div>
      </div>
    </div>
  );
};
const TestInput = ({ label }: { label: string }) => (
  <div className="flex flex-col gap-1">
    <Label className="font-medium text-[#0A395E] text-sm">{label}</Label>
    <Input
      type="text"
      placeholder="Введите значение"
      className="py-5 px-4 rounded-lg border  border-gray-300 focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none placeholder:text-gray-400"
    />
  </div>
);

export default ManualTest;