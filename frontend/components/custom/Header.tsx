import { IoNotificationsSharp } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  Sparkles,
  Activity,
  TrendingUp,
  Heart
} from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-white via-blue-50 to-indigo-50 px-6 py-4 shadow-lg border-b border-gray-200 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm">
      {/* Левая часть */}
      <div className="flex items-center gap-6">
        {/* Quick Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
            <Activity className="w-3 h-3 text-green-600" />
            <span className="text-xs font-medium text-green-700">Система активна</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
            <TrendingUp className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">99% точность</span>
          </div>
        </div>
      </div>

      {/* Центральная часть - Поиск */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск анализов, симптомов..."
            className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Правая часть */}
      <div className="flex items-center gap-4">
        {/* Уведомления */}
        <div className="relative">
          <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-white/80 rounded-lg transition-all duration-200 group">
            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </button>
        </div>

        {/* Настройки */}
        <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/80 rounded-lg transition-all duration-200 group">
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        </button>

        {/* Профиль пользователя */}
        <div className="flex items-center gap-3 p-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 group">
          <div className="relative">
            <Avatar className="w-10 h-10 ring-2 ring-blue-200 group-hover:ring-blue-300 transition-all duration-200">
              <AvatarImage src="/СабинаХайрова.jpg" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
                СХ
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold text-gray-900">Сабрина Хайрова</p>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-500" />
              <p className="text-xs text-gray-500">Пациент</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <User className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
