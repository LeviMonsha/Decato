import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { EnterIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

type User = {
  username?: string;
  avatar?: string;
};

interface MenuBarProps {
  isAuthenticated: boolean;
  user?: User | null;
  onLogout: () => void;
}

export function MenuBarComponent({
  isAuthenticated,
  user,
  onLogout,
}: MenuBarProps) {
  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-3 bg-white p-3 rounded-md shadow-md dark:bg-gray-800">
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
          onClick={onLogout}
          className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Logout"
        >
          Exit
        </button>
      </div>
    );
  }

  // Not authenticated: show login/register menu
  return (
    <NavigationMenu.Root className="flex gap-4 bg-white p-3 rounded-md shadow-md dark:bg-gray-800">
      <NavigationMenu.List className="flex gap-4">
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <EnterIcon className="w-5 h-5" />
            Войти в аккаунт
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/register"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <PlusCircledIcon className="w-5 h-5" />
            Создать аккаунт
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
