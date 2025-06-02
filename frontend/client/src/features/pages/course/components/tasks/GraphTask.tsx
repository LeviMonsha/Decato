import { useState } from "react";

import { TaskProps } from "../../../../types/task";

const GraphTask = ({ task }: TaskProps) => {
  return (
    <div>
      {task.content.text && <p className="mb-2">{task.content.text}</p>}
      {task.content.graph_url && (
        <img src={task.content.graph_url} alt="Graph" className="mb-4" />
      )}
      {task.content.questions && (
        <ul>
          {task.content.questions.map((question: string, index: number) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GraphTask;
