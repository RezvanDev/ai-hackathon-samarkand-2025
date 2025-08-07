"use client";

import React, { useState } from "react";
import FileTest from "./FileTest";
import AnalysisResults from "./AnalysisResults";

const AnalysisPage: React.FC = () => {
  const [analysisData, setAnalysisData] = useState<any[]>([]);

  const handleAnalysisResult = (data: any[]) => {
    console.log("Получены данные в MiddlewareAnalysisTable:", data);
    console.log("Тип данных:", typeof data, "Длина:", data?.length);
    setAnalysisData(data);
  };

  return (
    <div className="container mx-auto p-4">
      <FileTest onAnalysisResult={handleAnalysisResult} />
      {analysisData.length > 0 && <AnalysisResults data={analysisData} />}
    </div>
  );
};

export default AnalysisPage;
