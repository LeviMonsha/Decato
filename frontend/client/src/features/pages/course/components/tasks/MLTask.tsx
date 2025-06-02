import { useState } from "react";

import { TaskProps } from "../../../../types/task";

const MLTask = ({ task }: TaskProps) => {
  return (
    <div>
      {task.content.text && <p className="mb-2">{task.content.text}</p>}
      {task.content.dataset_url && (
        <a
          href={task.content.dataset_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Download Dataset
        </a>
      )}
      {task.content.submission_format && (
        <p>Submission Format: {task.content.submission_format}</p>
      )}
    </div>
  );
};

export default MLTask;
