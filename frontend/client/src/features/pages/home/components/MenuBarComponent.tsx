import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { EnterIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { MenuBarProps } from "../../../interfaces/menubar";

function NavigationMenuLink(props: React.ComponentProps<typeof Link>) {
  return (
    <NavigationMenu.Link asChild>
      <Link {...props} />
    </NavigationMenu.Link>
  );
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
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${
                user?.username || "default"
              }}`
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

  return (
    <NavigationMenu.Root className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
      <NavigationMenu.List className="flex gap-6 items-center">
        <NavigationMenu.Item>
          <NavigationMenuLink
            to="/login"
            className="flex items-center gap-2 px-5 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors h-10"
          >
            <EnterIcon className="w-5 h-5" />
            Войти в аккаунт
          </NavigationMenuLink>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenuLink
            to="/register"
            className="flex items-center gap-2 px-5 py-2 rounded-md bg-primary-400 text-black hover:bg-primary-300 transition-colors h-10"
          >
            <PlusCircledIcon className="w-5 h-5" />
            Создать аккаунт
          </NavigationMenuLink>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
