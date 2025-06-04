import { Link } from "react-router-dom";

import { CourseCardProps } from "../../../types/course";

const difficultyLevelToLabel = (level: number): string => {
  if (level <= 2) return "beginner";
  if (level === 3) return "intermediate";
  if (level >= 4) return "advanced";
  return "unknown";
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "intermediate":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "advanced":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

export const CourseCardComponent = ({ course }: CourseCardProps) => {
  const { id, title, description, imgUrl, difficultyLevel } = course;
  const levelLabel = difficultyLevelToLabel(difficultyLevel);

  return (
    <Link
      to={`/courses/${id}`}
      className="group flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 h-full"
      aria-label={`Course: ${title}, Level: ${levelLabel}`}
    >
      <div className="relative h-48 overflow-hidden">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Нет изображения
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
              levelLabel
            )}`}
          >
            {levelLabel.charAt(0).toUpperCase() + levelLabel.slice(1)}
          </span>
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
};
