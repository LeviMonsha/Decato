import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Task } from "../../types/task";

export const CourseTasksPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(
          `/api/courses/${courseId}/tasks`
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

  if (loading) return <div>Загрузка заданий...</div>;
  if (tasks.length === 0) return <div>Задания не найдены</div>;

  const currentTask = tasks[currentTaskIndex];

  return (
    <div>
      <nav className="flex space-x-2 mb-4">
        {tasks.map((task, index) => (
          <button
            key={task.id}
            onClick={() => setCurrentTaskIndex(index)}
            className={`px-3 py-1 rounded ${
              index === currentTaskIndex
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {task.sort_order}
          </button>
        ))}
      </nav>

      <div className="p-6 border rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Задание {currentTask.sort_order}
        </h2>
        {currentTask.content.text && (
          <p className="mb-2">{currentTask.content.text}</p>
        )}

        {currentTask.content.image_url && (
          <img
            src={currentTask.content.image_url}
            alt={`Task ${currentTask.sort_order}`}
            className="mb-4"
          />
        )}
        {currentTask.content.code_template && (
          <pre className="bg-gray-100 p-4 rounded">
            <code>{currentTask.content.code_template}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
