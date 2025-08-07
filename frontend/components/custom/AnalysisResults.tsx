import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  BarChart3,
  Heart,
  Zap,
  Info
} from "lucide-react";

interface AnalysisItem {
  patient?: string;
  analysis_type: string;
  test_name: string;
  value: string;
  status: string;
  priority: string;
  recommendations?: string;
  reference_range?: string;
  date?: string;
}

interface AnalysisResultsProps {
  data?: AnalysisItem[];
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data }) => {
  console.log("Данные в AnalysisResults:", data);
  if (data && data.length > 0) {
    console.log("Первый элемент:", data[0]);
    console.log("Рекомендации первого элемента:", data[0].recommendations);
  }
  
  const hasData = Array.isArray(data) && data.length > 0;

  // Статистика
  const stats = hasData ? {
    total: data.length,
    normal: data.filter(item => item.status === 'normal').length,
    high: data.filter(item => item.status === 'high').length,
    low: data.filter(item => item.status === 'low').length,
    critical: data.filter(item => item.priority === 'high').length
  } : { total: 0, normal: 0, high: 0, low: 0, critical: 0 };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'high': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'low': return <TrendingDown className="w-4 h-4 text-yellow-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium': return <Activity className="w-4 h-4 text-yellow-600" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Результаты анализа</h1>
            <p className="text-blue-100">Детальная расшифровка и рекомендации</p>
          </div>
        </div>
        
        {/* Statistics */}
        {hasData && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-blue-100">Всего показателей</div>
            </div>
            <div className="bg-green-500/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-200">{stats.normal}</div>
              <div className="text-xs text-green-100">В норме</div>
            </div>
            <div className="bg-red-500/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-200">{stats.high}</div>
              <div className="text-xs text-red-100">Повышены</div>
            </div>
            <div className="bg-yellow-500/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-200">{stats.low}</div>
              <div className="text-xs text-yellow-100">Понижены</div>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-200">{stats.critical}</div>
              <div className="text-xs text-orange-100">Критично</div>
            </div>
          </div>
        )}
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Детальные результаты
          </h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Тип анализа</TableHead>
                <TableHead className="font-semibold text-gray-700">Показатель</TableHead>
                <TableHead className="font-semibold text-gray-700">Значение</TableHead>
                <TableHead className="font-semibold text-gray-700">Референсный диапазон</TableHead>
                <TableHead className="font-semibold text-gray-700">Статус</TableHead>
                <TableHead className="font-semibold text-gray-700">Приоритет</TableHead>
                <TableHead className="font-semibold text-gray-700 w-1/3 min-w-[180px]">Рекомендации</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasData ? (
                data?.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 transition-colors align-top">
                    <TableCell className="font-medium text-gray-900 align-top">{item.analysis_type}</TableCell>
                    <TableCell className="font-medium text-gray-800 align-top">{item.test_name}</TableCell>
                    <TableCell className="font-semibold text-gray-900 align-top">{item.value}</TableCell>
                    <TableCell className="text-gray-600 align-top">{item.reference_range || '-'}</TableCell>
                    <TableCell className="align-top">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'normal' ? 'bg-green-100 text-green-800' :
                          item.status === 'high' ? 'bg-red-100 text-red-800' :
                          item.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status === 'normal' ? 'Норма' :
                           item.status === 'high' ? 'Повышен' :
                           item.status === 'low' ? 'Понижен' : item.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(item.priority)}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.priority === 'high' ? 'bg-red-100 text-red-800' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          item.priority === 'low' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.priority === 'high' ? 'Высокий' :
                           item.priority === 'medium' ? 'Средний' :
                           item.priority === 'low' ? 'Низкий' : item.priority}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="align-top w-1/3 min-w-[180px] whitespace-pre-line break-words">
                      {item.recommendations ? (
                        <div className="text-sm text-gray-700 leading-relaxed bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500 whitespace-pre-line break-words">
                          {item.recommendations}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Нет рекомендаций</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                // Показываем пустую таблицу с заглушками
                Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-400">-</TableCell>
                    <TableCell className="text-gray-400">-</TableCell>
                    <TableCell className="text-gray-400">-</TableCell>
                    <TableCell className="text-gray-400">-</TableCell>
                    <TableCell className="text-gray-400">-</TableCell>
                    <TableCell className="text-gray-400">-</TableCell>
                    <TableCell className="text-gray-400">-</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Recommendations Section */}
      {hasData && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-600" />
              Рекомендации по лечению
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {data?.filter(item => item.recommendations && item.recommendations.length > 0).map((item, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">
                          {item.test_name} ({item.analysis_type})
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Значение: <span className="font-semibold text-gray-900">{item.value}</span>
                        {item.reference_range && (
                          <span className="text-gray-500"> (норма: {item.reference_range})</span>
                        )}
                      </p>
                      <p className="text-gray-700 leading-relaxed bg-white p-3 rounded-lg border">
                        {item.recommendations}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.priority === 'high' ? 'bg-red-100 text-red-800' :
                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        item.priority === 'low' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.priority === 'high' ? 'Высокий приоритет' :
                         item.priority === 'medium' ? 'Средний приоритет' :
                         item.priority === 'low' ? 'Низкий приоритет' : 'Приоритет'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {data?.filter(item => item.recommendations && item.recommendations.length > 0).length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Специальных рекомендаций по лечению не требуется.</p>
                  <p className="text-sm text-gray-500 mt-2">Все показатели находятся в пределах нормы.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
