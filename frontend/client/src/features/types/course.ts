export type Course = {
  id: string;
  title: string;
  description: string;
  difficultyLevel: number;
  categoryId: string;
  sortOrder?: number;
  imageUrl?: string;
};

export type CourseCardProps = {
  course: Course;
};
