export type TaskContent = {
  text?: string;
  image_url?: string;
  code_template?: string;
};

export type Task = {
  id: string;
  sort_order: number;
  type: "THEORY" | "CODER" | "PRACTICE" | "QUIZ" | "GRAPH" | "ML";
  content: TaskContent;
  chapterId?: string;
};

export type TaskProps = {
  task: any;
};
