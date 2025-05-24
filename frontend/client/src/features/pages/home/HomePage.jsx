import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuBarComponent } from "./components/MenuBarComponent";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <MenuBarComponent />
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
        Добро пожаловать!
      </h1>
    </div>
  );
}
