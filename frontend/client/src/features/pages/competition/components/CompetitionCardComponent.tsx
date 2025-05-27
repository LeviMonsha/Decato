import { Link } from "react-router-dom";
import { CompetitionCardProps } from "../../../types/competition";
import { Calendar } from "lucide-react";

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const CompetitionCardComponent = ({
  competition,
}: CompetitionCardProps) => {
  const {
    id,
    title,
    description,
    imageUrl,
    difficultyLevel,
    startDate,
    endDate,
    isActive,
  } = competition;

  const levelLabel = difficultyLevelToLabel(difficultyLevel);

  const cardContent = (
    <>
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Нет изображения
          </div>
        )}
        <span
          className={`absolute top-3 right-3 inline-block px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(
            levelLabel
          )}`}
        >
          {capitalize(levelLabel)}
        </span>
      </div>

      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs mb-2 space-x-1">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <span>
            {formatDate(startDate)} - {formatDate(endDate)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-grow">
          {description}
        </p>
      </div>
    </>
  );

  return isActive ? (
    <Link
      to={`/competition/${id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 h-full"
      aria-label={`Competition: ${title}, Level: ${capitalize(levelLabel)}`}
    >
      {cardContent}
    </Link>
  ) : (
    <div
      className="relative flex flex-col overflow-hidden rounded-lg shadow-sm bg-white dark:bg-gray-800 h-full cursor-not-allowed opacity-70"
      aria-label={`Competition ended: ${title}, Level: ${capitalize(
        levelLabel
      )}`}
      tabIndex={-1}
    >
      {cardContent}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg pointer-events-none">
        <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium select-none">
          Соревнование закончилось
        </span>
      </div>
    </div>
  );
};
