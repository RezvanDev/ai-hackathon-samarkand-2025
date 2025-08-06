import { IoNotificationsSharp } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header: React.FC = () => {
    return (
        <header className="w-full bg-white px-6 py-4 shadow-[1px] border-b flex items-center justify-between sticky top-0 z-50">
            {/* Левая часть */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    С возвращением, <span className="text-primary">Сабрина!</span>
                </h1>
                <p className="text-sm text-gray-500">Надеюсь, у тебя всё хорошо 👋</p>
            </div>

            {/* Правая часть */}
            <div className="flex items-center gap-6">
                <button className="text-gray-500 hover:text-gray-700 transition">
                    <IoNotificationsSharp size={22} />
                </button>

                <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src="/СабинаХайрова.jpg" />
                        <AvatarFallback>SG</AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                        <p className="text-sm font-medium text-gray-900">Сабрина Хайрова</p>
                        <p className="text-xs text-gray-500">Пациент</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
