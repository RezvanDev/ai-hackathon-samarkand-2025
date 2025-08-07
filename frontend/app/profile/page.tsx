"use client";

import React, { useState } from "react";
import { 
  User, 
  Activity, 
  TrendingUp, 
  Heart, 
  Weight, 
  Ruler, 
  Calculator,
  FileText,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  BarChart3
} from "lucide-react";

interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  date: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'health' | 'medication' | 'appointment' | 'general';
}

const ProfilePage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Прием витаминов',
      content: 'Начать прием витамина D по 2000 МЕ ежедневно',
      date: '2024-01-15',
      category: 'medication'
    },
    {
      id: '2',
      title: 'Запись к кардиологу',
      content: 'Записаться на прием к кардиологу на следующей неделе',
      date: '2024-01-20',
      category: 'appointment'
    }
  ]);

  const [newNote, setNewNote] = useState({ title: '', content: '', category: 'general' as const });

  const healthMetrics: HealthMetric[] = [
    {
      id: '1',
      name: 'Вес',
      value: '65',
      unit: 'кг',
      status: 'normal',
      trend: 'stable',
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Рост',
      value: '170',
      unit: 'см',
      status: 'normal',
      trend: 'stable',
      date: '2024-01-15'
    },
    {
      id: '3',
      name: 'ИМТ',
      value: '22.5',
      unit: '',
      status: 'normal',
      trend: 'stable',
      date: '2024-01-15'
    },
    {
      id: '4',
      name: 'Артериальное давление',
      value: '120/80',
      unit: 'мм рт.ст.',
      status: 'normal',
      trend: 'stable',
      date: '2024-01-15'
    },
    {
      id: '5',
      name: 'Пульс',
      value: '72',
      unit: 'уд/мин',
      status: 'normal',
      trend: 'stable',
      date: '2024-01-15'
    },
    {
      id: '6',
      name: 'Глюкоза',
      value: '5.2',
      unit: 'ммоль/л',
      status: 'normal',
      trend: 'down',
      date: '2024-01-15'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-green-600 rotate-180" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'bg-blue-100 text-blue-800';
      case 'medication': return 'bg-green-100 text-green-800';
      case 'appointment': return 'bg-purple-100 text-purple-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addNote = () => {
    if (newNote.title && newNote.content) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        date: new Date().toISOString().split('T')[0],
        category: newNote.category
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '', category: 'general' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <User className="w-4 h-4" />
            Личный кабинет
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Мой профиль
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Дашборд здоровья с основными показателями, статистикой анализов и заметками
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Health Metrics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Health Metrics */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Основные показатели</h2>
                    <p className="text-blue-100 text-sm">Ключевые метрики здоровья</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {healthMetrics.map((metric) => (
                    <div key={metric.id} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(metric.status)}
                          <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                        </div>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                        <span className="text-sm text-gray-600">{metric.unit}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{metric.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analysis Statistics */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Статистика анализов</h2>
                    <p className="text-green-100 text-sm">Обзор последних результатов</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">Всего анализов</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-sm text-gray-600">В норме</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-600">3</div>
                    <div className="text-sm text-gray-600">Требуют внимания</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-xl">
                    <div className="text-2xl font-bold text-red-600">1</div>
                    <div className="text-sm text-gray-600">Критично</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Notes */}
          <div className="space-y-8">
            {/* Notes Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Заметки</h2>
                    <p className="text-purple-100 text-sm">Личные записи о здоровье</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {/* Add Note Form */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3">Добавить заметку</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Заголовок"
                      value={newNote.title}
                      onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <textarea
                      placeholder="Содержание заметки"
                      value={newNote.content}
                      onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      rows={3}
                    />
                    <select
                      value={newNote.category}
                      onChange={(e) => setNewNote({...newNote, category: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="general">Общее</option>
                      <option value="health">Здоровье</option>
                      <option value="medication">Лекарства</option>
                      <option value="appointment">Приемы</option>
                    </select>
                    <button
                      onClick={addNote}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Добавить
                    </button>
                  </div>
                </div>

                {/* Notes List */}
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div key={note.id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(note.category)}`}>
                            {note.category === 'health' ? 'Здоровье' :
                             note.category === 'medication' ? 'Лекарства' :
                             note.category === 'appointment' ? 'Приемы' : 'Общее'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Edit className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{note.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{note.content}</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{note.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 