import { Link } from "react-router-dom";
import { Search, Home } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="relative">
        <div className="text-9xl font-bold text-gray-200 dark:text-gray-800">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search className="h-20 w-20 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
      <h1 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white">
        Страница не найдена
      </h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-md">
        Страница, которую вы ищете, не существует или была перемещена
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
      >
        <Home className="mr-2 h-5 w-5" />
        Вернуться на главную страницу
      </Link>
    </div>
  );
};
