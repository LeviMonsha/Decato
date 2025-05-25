import React from "react";
import { Link } from "react-router-dom";

export function RulesPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-800 mt-10 mb-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Правила платформы обучения нейронным сетям
      </h1>
      <ol className="list-decimal pl-6 space-y-4 text-gray-800 dark:text-gray-200 text-lg">
        <li>
          <span className="font-semibold">Уважайте других участников.</span> Не
          допускается оскорбительное поведение, дискриминация или троллинг в
          обсуждениях, комментариях и личных сообщениях.
        </li>
        <li>
          <span className="font-semibold">
            Используйте материалы платформы только для обучения.
          </span>{" "}
          Запрещено копировать, распространять или использовать курсы и задания
          в коммерческих целях без разрешения.
        </li>
        <li>
          <span className="font-semibold">
            Самостоятельное выполнение заданий.
          </span>{" "}
          Решения заданий должны быть вашими собственными. Плагиат, публикация
          готовых решений или обмен ими запрещены.
        </li>
        <li>
          <span className="font-semibold">
            Соблюдайте академическую честность.
          </span>{" "}
          Не используйте автоматизированные средства для прохождения курсов и не
          пытайтесь обойти систему проверки.
        </li>
        <li>
          <span className="font-semibold">Уважайте авторские права.</span> При
          публикации материалов, кода или данных обязательно указывайте
          источник.
        </li>
        <li>
          <span className="font-semibold">Соблюдайте конфиденциальность.</span>{" "}
          Не размещайте личные данные свои или других пользователей в открытом
          доступе.
        </li>
        <li>
          <span className="font-semibold">Следуйте законам своей страны.</span>{" "}
          Использование платформы не должно нарушать законы вашей страны.
        </li>
        <li>
          <span className="font-semibold">Соблюдайте правила общения.</span> Не
          размещайте спам, рекламу, вредоносные ссылки или вирусы.
        </li>
      </ol>
      <div className="mt-8 text-center">
        <Link
          to="/register"
          className="inline-block px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm transition-colors"
        >
          Вернуться к регистрации
        </Link>
      </div>
    </div>
  );
}
