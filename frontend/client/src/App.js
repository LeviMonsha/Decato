import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setTheme } from "./store/slices/themeSlice";

import { RootLayout } from "./features/layouts/RootLayout";
import { AuthLayout } from "./features/layouts/AuthLayout";

import HomePage from "./features/pages/home/HomePage";
import { CoursesPage } from "./features/pages/course/CoursesPage";
import { CourseDetailPage } from "./features/pages/course/CourseDetailPage";
import { CourseTasksPage } from "./features/pages/course/CourseTasksPage";
import { CompetitionsPage } from "./features/pages/competition/CompetitionsPage";
import { CompetitionDetailPage } from "./features/pages/competition/CompetitionDetailPage";
import { NewsPage } from "./features/pages/news/NewsPage";
import { ProfilePage } from "./features/pages/extra/ProfilePage";
import { LoginPage } from "./features/pages/auth/LoginPage";
import { RegisterPage } from "./features/pages/auth/RegisterPage";
import { NotFoundPage } from "./features/pages/extra/NotFoundPage";
import { RulesPage } from "./features/pages/auth/RulesPage";

import "./styles/App.css";

function App() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dispatch(setTheme("dark"));
    }
  }, [dispatch]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/courses/:courseId/tasks" element={<CourseTasksPage />} />
        <Route path="competitions" element={<CompetitionsPage />} />
        <Route
          path="competitions/:competitionId"
          element={<CompetitionDetailPage />}
        />
        <Route path="news" element={<NewsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="rules" element={<RulesPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
