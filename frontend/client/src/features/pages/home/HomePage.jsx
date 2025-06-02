import { Link } from "react-router-dom";
import { Brain, BookOpen, Trophy, Newspaper, ArrowRight } from "lucide-react";

import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../../store/slices/authSlice";

import { MenuBarComponent } from "./components/MenuBarComponent";
import { FeatureCardComponent } from "./components/FeatureCardComponent";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-64px)] justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl">
          <div className="flex justify-center mb-6">
            <Brain className="h-20 w-20 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Освойте машинное обучение и нейронные сети
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
            Учитесь интерактивно, развивайте практические навыки и
            присоединяйтесь к сообществу энтузиастов ИИ на нашей комплексной
            образовательной платформе.
          </p>
          <MenuBarComponent
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={() => dispatch(logout())}
          />
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          <div className="transition-shadow transition-transform duration-300 rounded-lg hover:shadow-lg hover:-translate-y-1 hover:bg-blue-50">
            <Link to="/courses">
              <FeatureCardComponent
                icon={BookOpen}
                title="Интерактивные курсы"
                description="Учитесь в удобном темпе с нашими увлекательными практическими курсами, разработанными экспертами."
              />
            </Link>
          </div>

          <div className="transition-shadow transition-transform duration-300 rounded-lg hover:shadow-lg hover:-translate-y-1 hover:bg-blue-50">
            <Link to="/competitions">
              <FeatureCardComponent
                icon={Trophy}
                title="Реальные соревнования"
                description="Применяйте свои навыки в конкурсах с реальными наборами данных и выигрывайте призы."
              />
            </Link>
          </div>

          <div className="transition-shadow transition-transform duration-300 rounded-lg hover:shadow-lg hover:-translate-y-1 hover:bg-blue-50">
            <Link to="/news">
              <FeatureCardComponent
                icon={Newspaper}
                title="Будьте в курсе"
                description="Следите за быстрыми изменениями в сфере ИИ с помощью наших тщательно подобранных новостей и обновлений."
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">С возвращением!</h1>
            <p className="mt-2 text-primary-100">
              У вас серия из {0} дней обучения. Так держать!
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 rounded-md bg-white text-primary-700 hover:bg-primary-50 font-medium transition-colors"
            >
              Продолжить обучение
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
