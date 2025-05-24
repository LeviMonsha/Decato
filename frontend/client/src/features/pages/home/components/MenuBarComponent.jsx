import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { EnterIcon, PlusCircledIcon } from "@radix-ui/react-icons";

export function MenuBarComponent() {
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
