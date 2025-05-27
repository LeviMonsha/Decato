export type TaskContent = {
  text?: string;
  image_url?: string;
  code_template?: string;
};

export type Task = {
  id: string;
  sort_order: number;
  type: "THEORY" | "PRACTICE" | "QUIZ";
  content: TaskContent;
  chapterId?: string;
};
