import { TaskProps } from "../../../../types/task";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";

import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-okaidia.css";

const highlightCode = (code: string, isDark: boolean) => {
  const themeClass = isDark ? "prism-okaidia" : "prism";
  return Prism.highlight(code, Prism.languages.python, "python");
};

const PracticeTask = ({ task }: TaskProps) => {
  const [code, setCode] = useState(task.content.code_template || "");
  const [isDark, setIsDark] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = () => {
    const correct = null;

    setIsCorrect(correct);
    setSubmitted(true);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    setIsDark(root.classList.contains("dark"));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {task.content.text && <p className="mb-2">{task.content.text}</p>}

      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) => highlightCode(code, isDark)}
        padding={16}
        style={{
          fontFamily: '"Fira code", monospace',
          fontSize: 14,
          borderRadius: 8,
          backgroundColor: isDark ? "#272822" : "#f5f5f5",
          color: isDark ? "#f8f8f2" : "#000",
          minHeight: "200px",
          overflow: "auto",
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        }}
      />

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
            ? "Решение верное! 🎉"
            : "Решение неверное. Попробуйте ещё раз."}
        </div>
      )}
    </div>
  );
};

export default PracticeTask;
