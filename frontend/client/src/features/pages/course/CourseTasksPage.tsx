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

    fetchTasks();
  }, [courseId]);

  if (loading)
    return <div className="text-center py-10">Загрузка заданий...</div>;
  if (tasks.length === 0)
    return <div className="text-center py-10">Задания не найдены</div>;

  const currentTask = tasks[currentTaskIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <nav className="flex space-x-2 mb-6 justify-center">
        {tasks.map((task, index) => (
          <button
            key={task.id}
            onClick={() => setCurrentTaskIndex(index)}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              index === currentTaskIndex
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            aria-current={index === currentTaskIndex ? "page" : undefined}
          >
            {task.sort_order}
          </button>
        ))}
      </nav>

      <TaskComponent task={currentTask} />
    </div>
  );
};
