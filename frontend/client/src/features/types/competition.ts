export type Competition = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  difficultyLevel: number;
  isActive: boolean;
};

export type CompetitionCardProps = {
  competition: Competition;
};
