import { User } from "../types/user";

export interface MenuBarProps {
  isAuthenticated: boolean;
  user?: User | null;
  onLogout: () => void;
}
