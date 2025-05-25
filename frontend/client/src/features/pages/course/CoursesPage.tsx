import { useEffect, useState } from "react";
import axios from "axios";

import { CourseCardComponent } from "./components/CourseCardComponent";
import { Course } from "../../types/course";

export const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Course[]>("/api/courses");
        setCourses(response.data);
        
      } catch (err) {
        setError("Failed to load courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center py-8">Загружаем курсы...</p>;
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Доступные курсы
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCardComponent key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
