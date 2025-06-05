import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import apiClient from "../../../hooks/apiClient";
import { Task } from "../../types/task";
import { TaskComponent } from "./components/TaskComponent";

export const CourseTasksPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<Record<string, { status: string }>>(
    {}
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get<Task[]>(
          `/courses/${courseId}/tasks`
        );
        const tasksParsed = response.data.map((task) => ({
          ...task,
          content:
            typeof task.content === "string"
              ? JSON.parse(task.content)
              : task.content,
        }));
        setTasks(tasksParsed);
      } catch (error) {
        console.error("Ошибка загрузки заданий:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadProgress = async () => {
      try {
        const response = await apiClient.get(`/progress/course/${courseId}`);
        const progressData = response.data.reduce(
          (acc: Record<string, any>, item: any) => {
            acc[item.taskId] = item;
            return acc;
          },
          {}
        );
        setProgress(progressData);
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Сессия истекла. Пожалуйста, войдите заново.");
        } else {
          console.error("Ошибка загрузки прогресса:", error);
        }
      }
    };

    fetchTasks();
    loadProgress();
  }, [courseId]);

  if (loading)
    return <div className="text-center py-10">Загрузка заданий...</div>;
  if (tasks.length === 0)
    return <div className="text-center py-10">Задания не найдены</div>;

  const allCompleted = tasks.every(
    (task) => progress[task.id]?.status === "completed"
  );

  const currentTask = tasks[currentTaskIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {allCompleted && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded shadow">
          Поздравляем! Вы успешно прошли курс.
        </div>
      )}

      <nav className="flex space-x-2 mb-6 justify-center">
        {tasks.map((task, index) => (
          <button
            key={task.id}
            onClick={() => setCurrentTaskIndex(index)}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              index === currentTaskIndex
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            } ${
              progress[task.id]?.status === "completed" ? "bg-green-500" : ""
            }`}
            aria-current={index === currentTaskIndex ? "page" : undefined}
          >
            {task.sort_order}
          </button>
        ))}
      </nav>

      {!allCompleted && <TaskComponent task={currentTask} />}
    </div>
  );
};
