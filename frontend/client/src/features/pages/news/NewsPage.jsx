import React, { useEffect, useState } from "react";
import axios from "axios";
import { NewsCardComponent } from "./components/NewsCardComponent";

export const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNews = (page) => {
    setLoading(true);
    axios
      .get("/news-api/news/", {
        params: { page, page_size: pageSize },
      })
      .then((response) => {
        setNews(response.data);
        setError(null);
      })
      .catch(() => {
        setError("Ошибка при загрузке новостей");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (news.length === pageSize) setPage(page + 1);
  };

  return (
    <div className="text-center py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Новости</h1>

      {error && <div className="mb-6 text-red-600">{error}</div>}

      {loading ? (
        <div>Загрузка...</div>
      ) : news.length > 0 ? (
        news.map((item) => <NewsCardComponent key={item.id} news={item} />)
      ) : (
        <div>Новости пока не загружены</div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Назад
        </button>
        <span className="px-4 py-2">Страница {page}</span>
        <button
          onClick={handleNext}
          disabled={news.length < pageSize}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Вперед
        </button>
      </div>
    </div>
  );
};
