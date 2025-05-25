import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../../store/slices/authSlice";
import { MenuBarComponent } from "./components/MenuBarComponent";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <MenuBarComponent
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
        Добро пожаловать!
      </h1>
    </div>
  );
}
