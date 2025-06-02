import React from "react";

export const NewsCardComponent = ({ news }) => {
  const { title, content, link, category, published_at } = news;

  const formattedDate = published_at
    ? new Date(published_at).toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Дата не указана";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      aria-label={`Перейти к новости: ${title}`}
    >
      <div className="p-6 flex flex-col h-full">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300 line-clamp-4">
          {content}
        </p>
        <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={published_at}>{formattedDate}</time>
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full font-medium select-none">
            {category}
          </span>
        </div>
      </div>
    </a>
  );
};
