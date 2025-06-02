import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../../store/slices/authSlice";

export const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-800 mt-12">
      <div className="flex flex-col items-center">
        <img
          src={
            user?.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${
              user?.username || "default"
            }`
          }
          alt={user?.username}
          className="h-24 w-24 rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {user?.username}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{user?.email}</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          <LogOut className="h-5 w-5 mr-2" /> Выйти
        </button>
      </div>
    </div>
  );
};
