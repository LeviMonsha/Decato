import { useState } from "react";

import { TaskProps } from "../../../../types/task";

const TheoryTask = ({ task }: TaskProps) => {
  return (
    <div>
      {task.content.text && <p className="mb-2">{task.content.text}</p>}
      {task.content.image_url && (
        <img
          src={task.content.image_url}
          alt="Theory Illustration"
          className="mb-4"
        />
      )}
    </div>
  );
};

export default TheoryTask;
