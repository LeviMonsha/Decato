import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Award, BookOpen, Clock, Users } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Course } from "../../types/course";

export const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get<Course>(`/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setCourse(null);
        } else {
          console.error("Ошибка при загрузке курса:", error);
          setCourse(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <div>Загрузка...</div>;
  if (!course) return <div>Курс не найден</div>;

  const handleStartOrContinue = () => {
    navigate(`/courses/${courseId}/tasks`);
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

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link
          to="/courses"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {course.title}
        </h1>
      </div>

      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Описание курса
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {course.description}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Хотите погрузиться в мир знаний?
            </h3>
            <button
              onClick={handleStartOrContinue}
              className="mt-8 inline-flex items-center justify-center rounded-md border border-transparent bg-primary-400 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              {course.started ? "Продолжить курс" : "Начать курс"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Студенты
                </span>
                <span className="font-medium text-gray-900 dark:text-white flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  {course.studentsCount ?? "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Модули</span>
                <span className="font-medium text-gray-900 dark:text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-1" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Продолжительность
                </span>
                <span className="font-medium text-gray-900 dark:text-white flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Сертификат
                </span>
                <span className="font-medium text-gray-900 dark:text-white flex items-center">
                  <Award className="h-5 w-5 mr-1" />
                  Включен
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
