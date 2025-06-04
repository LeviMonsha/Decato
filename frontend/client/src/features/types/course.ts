export type Course = {
  id: string;
  title: string;
  description: string;
  difficultyLevel: number;
  categoryId: string;
  sortOrder?: number;
  imgUrl?: string;
  started?: boolean;
  studentsCount?: number;
};

export type CourseCardProps = {
  course: Course;
};
