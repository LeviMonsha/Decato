import { useEffect, useState } from "react";

import { TaskProps } from "../../../../types/task";

const QuizTask = ({ task }: TaskProps) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setSelectedOptions([]);
    setSubmitted(false);
    setIsCorrect(null);
  }, [task.id]);

  const handleOptionChange = (optionId) => {
    setSelectedOptions([optionId]);
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) {
      alert("Пожалуйста, выберите вариант ответа");
      return;
    }

    const correctOptions = task.content.options
      .filter((opt) => opt.is_correct)
      .map((opt) => opt.id);

    const correct =
      selectedOptions.length === correctOptions.length &&
      selectedOptions.every((id) => correctOptions.includes(id));

    setIsCorrect(correct);
    setSubmitted(true);
  };

  return (
    <div>
      <p className="mb-4 font-semibold">{task.content.question}</p>
      <form>
        {task.content.options.map((option) => (
          <label key={option.id} className="block mb-2 cursor-pointer">
            <input
              type="radio"
              name="quiz-option"
              value={option.id}
              checked={selectedOptions.includes(option.id)}
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
