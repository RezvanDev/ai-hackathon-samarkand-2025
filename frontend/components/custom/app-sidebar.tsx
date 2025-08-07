"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MdSpaceDashboard } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { 
  Home, 
  BarChart3, 
  Settings, 
  LogOut, 
  Sparkles,
  Activity,
  Heart,
  User
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/",
      icon: <Home className="w-5 h-5" />,
      label: "Главная",
      description: "Домашняя страница"
    },
    {
      href: "/analysis",
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Анализы",
      description: "Загрузка и анализ"
    },
    {
      href: "/profile",
      icon: <User className="w-5 h-5" />,
      label: "Мой профиль",
      description: "Дашборд здоровья"
    }
  ];

  const footerItems = [
    {
      href: "/settings",
      icon: <Settings className="w-5 h-5" />,
      label: "Настройки",
      description: "Конфигурация"
    },
    {
      href: "/logout",
      icon: <LogOut className="w-5 h-5" />,
      label: "Выход",
      description: "Завершить сессию",
      isLogout: true
    }
  ];

  return (
    <Sidebar className="px-4 py-6 bg-gradient-to-b from-blue-50 via-white to-indigo-50 border-r border-gray-200">
      <SidebarHeader className="mb-8">
        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <p className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI MED
            </p>
            <p className="text-xs text-gray-500">Медицинский ассистент</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="space-y-2">
        <SidebarGroup>
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
              Навигация
            </h3>
          </div>
          
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`group relative p-3 rounded-xl transition-all duration-200 cursor-pointer mb-2 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                    : 'hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/20' 
                        : 'bg-gray-100 group-hover:bg-blue-100'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{item.label}</div>
                      <div className={`text-xs ${
                        isActive ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </Link>
            );
          })}
        </SidebarGroup>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-green-600" />
            <h3 className="text-sm font-semibold text-gray-700">Статистика</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">99%</div>
              <div className="text-xs text-gray-500">Точность</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">24/7</div>
              <div className="text-xs text-gray-500">Доступность</div>
            </div>
          </div>
        </div>
      </SidebarContent>

      <hr className="my-6 border-gray-200" />
      
      <SidebarFooter className="space-y-2">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
            Аккаунт
          </h3>
        </div>
        
        {footerItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`group relative p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                item.isLogout 
                  ? 'hover:bg-red-50 border border-transparent hover:border-red-200' 
                  : isActive 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg' 
                    : 'hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-all duration-200 ${
                    item.isLogout 
                      ? 'bg-red-100 group-hover:bg-red-200' 
                      : isActive 
                        ? 'bg-white/20' 
                        : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${
                      item.isLogout ? 'text-red-600' : ''
                    }`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </SidebarFooter>
    </Sidebar>
  );
}
