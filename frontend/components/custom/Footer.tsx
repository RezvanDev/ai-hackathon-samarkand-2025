interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Медицинский мемо */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-blue-800">Важно:</span>{" "}
            Результаты анализа не заменяют консультацию врача
          </p>
        </div>

        {/* Команда */}
        <div className="text-center">
          <p className="text-gray-700 font-medium">
            Разработано командой{" "}
            <span className="text-indigo-600 font-bold">NexPride</span>
          </p>
        </div>

        {/* Копирайт с медицинским акцентом */}
        <div className="text-right">
          <p className="text-xs text-gray-500">
            © 2025 AI Health Assistant <br />
            Сертифицировано ISO 13485:2016
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
