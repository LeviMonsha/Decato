import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { CompetitionCardComponent } from "./components/CompetitionCardComponent";
import { Competition } from "../../types/competition";

export const CompetitionsPage = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Competition[]>("/api/competitions");
        setCompetitions(response.data);
      } catch (err) {
        setError("Failed to load courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return <p className="text-center py-8">Загружаем соревнования...</p>;
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Соревнования
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions.map((competition) => (
          <CompetitionCardComponent
            key={competition.id}
            competition={competition}
          />
        ))}
      </div>
    </div>
  );
};
