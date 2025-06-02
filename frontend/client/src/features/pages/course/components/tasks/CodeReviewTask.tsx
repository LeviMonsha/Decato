import { TaskProps } from "../../../../types/task";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeReviewTask = ({ task }: TaskProps) => {
  const [isDark, setIsDark] = useState(false);

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

      {task.content.code_template && (
        <SyntaxHighlighter
          language="python"
          style={isDark ? oneDark : oneLight}
          customStyle={{
            borderRadius: "0.5rem",
            padding: "1rem",
            fontSize: "1rem",
          }}
          showLineNumbers
        >
          {task.content.code_template}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

export default CodeReviewTask;
