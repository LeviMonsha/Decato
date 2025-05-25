import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import {
  BrainCircuit,
  Menu,
  X,
  Sun,
  Moon,
  Home,
  BookOpen,
  Trophy,
  Newspaper,
  User,
  LogOut,
} from "lucide-react";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BrainCircuit className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-2" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Decato
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated && (
              <>
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/"
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Главная
                </Link>
                <Link
                  to="/courses"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname.startsWith("/courses")
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Курсы
                </Link>
                <Link
                  to="/competitions"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname.startsWith("/competitions")
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Соревнования
                </Link>
                <Link
                  to="/news"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/news"
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Новости
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <img
                    src={
                      user?.avatar ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                    }
                    alt={user?.username || "User"}
                    className="h-8 w-8 rounded-full"
                  />
                  <span>{user?.username || "User"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-primary-400 text-black hover:bg-primary-300"
                >
                  Зарегистрироваться
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-2 rounded-md text-gray-500 dark:text-gray-400"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/"
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Home className="h-5 w-5 mr-2" /> Главная
                </Link>
                <Link
                  to="/courses"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname.startsWith("/courses")
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <BookOpen className="h-5 w-5 mr-2" /> Курсы
                </Link>
                <Link
                  to="/competitions"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname.startsWith("/competitions")
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Trophy className="h-5 w-5 mr-2" /> Соревнования
                </Link>
                <Link
                  to="/news"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/news"
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Newspaper className="h-5 w-5 mr-2" /> Новости
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/profile"
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <User className="h-5 w-5 mr-2" /> Профиль
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="h-5 w-5 mr-2" /> Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                >
                  Зарегистрироваться
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
