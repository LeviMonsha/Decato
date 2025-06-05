import { useEffect, useState } from "react";
import { TaskProps } from "../../../../types/task";
import apiClient from "../../../../../hooks/apiClient";

const QuizTask = ({ task }: TaskProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await apiClient.get(`/progress/task/${task.id}`);
        const progress = response.data;

        if (progress) {
          setSelectedOption(progress.selectedOptionId ?? null);
          setSubmitted(
            progress.status === "completed" || progress.status === "in_progress"
          );
          setIsCorrect(progress.status === "completed");
        } else {
          setSelectedOption(null);
          setSubmitted(false);
          setIsCorrect(null);
        }
      } catch (error) {
        console.error("Ошибка загрузки прогресса:", error);
        setSelectedOption(null);
        setSubmitted(false);
        setIsCorrect(null);
      }
    };

    loadProgress();
  }, [task.id]);

  const handleOptionChange = (optionId: string) => {
    if (!submitted) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      alert("Пожалуйста, выберите вариант ответа");
      return;
    }

    const correctOption = task.content.options.find((opt) => opt.is_correct);
    const correct = selectedOption === correctOption?.id;

    try {
      await apiClient.put(`/progress/task/${task.id}`, {
        taskId: task.id,
        status: correct ? "completed" : "in_progress",
        selectedOptionId: selectedOption,
      });
      setIsCorrect(correct);
      setSubmitted(true);
    } catch (error) {
      console.error("Ошибка сохранения результата:", error);
    }
  };

  return (
    <div>
      <p className="mb-4 font-semibold">{task.content.question}</p>
      <form>
        {task.content.options.map((option: any) => (
          <label key={option.id} className="block mb-2 cursor-pointer">
            <input
              type="radio"
              name="quiz-option"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleOptionChange(option.id)}
              className="mr-2"
              disabled={submitted}
            />
            {option.text}
          </label>
        ))}
      </form>

      <button
        onClick={handleSubmit}
        disabled={submitted}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Отправить
      </button>

      {submitted && (
        <div
          className={`mt-4 p-3 rounded ${
            isCorrect
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {isCorrect
            ? "Ответ правильный! 🎉"
            : "Ответ неправильный. Попробуйте ещё раз."}
        </div>
      )}
    </div>
  );
};

export default QuizTask;
