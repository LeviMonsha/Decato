import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { BrainCircuit } from "lucide-react";

export const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BrainCircuit className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Decato
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Изучайте машинное обучение и нейронные сети в интерактивном режиме
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
