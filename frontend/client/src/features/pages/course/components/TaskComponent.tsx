import { TaskProps } from "../../../types/task";

import TheoryTask from "./tasks/TheoryTask";
import CodeReviewTask from "./tasks/CodeReviewTask";
import PracticeTask from "./tasks/PracticeTask";
import QuizTask from "./tasks/QuizTask";
import GraphTask from "./tasks/GraphTask";
import MLTask from "./tasks/MLTask";

export const TaskComponent = ({ task }: TaskProps) => {
  switch (task.type) {
    case "THEORY":
      return <TheoryTask task={task} />;
    case "CODER":
      return <CodeReviewTask task={task} />;
    case "PRACTICE":
      return <PracticeTask task={task} />;
    case "QUIZ":
      return <QuizTask task={task} />;
    case "GRAPH":
      return <GraphTask task={task} />;
    case "ML":
      return <MLTask task={task} />;
    default:
      return (
        <div className="p-4 text-center text-red-600 font-semibold">
          Неизвестный тип задания: {task.type}
        </div>
      );
  }
};
