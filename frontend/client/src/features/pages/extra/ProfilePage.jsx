import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";

import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { logout, fetchCurrentUser } from "../../../store/slices/authSlice";
import ChangeCredentialsForm from "./components/ChangeCredentials";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading) {
    return <div className="text-center p-6">Загрузка...</div>;
  }

  if (!user) {
    return (
      <div className="text-center p-6">
        <p>Пользователь не найден. Пожалуйста, войдите в систему.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-800 mt-12">
      <div className="flex flex-col items-center">
        <img
          src={
            user.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
          }
          alt={user.username}
          className="h-28 w-28 rounded-full mb-6 border-2 border-blue-500"
        />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {user.username}
        </h1>

        <div className="w-full max-w-md text-gray-700 dark:text-gray-300 mb-6">
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Имя:</span> {user.firstName}
          </p>
          <p>
            <span className="font-semibold">Фамилия:</span> {user.lastName}
          </p>
          <p>
            <span className="font-semibold">Совершеннолетний:</span>{" "}
            {user.isAdult}
          </p>
          <p>
            <span className="font-semibold">Пол:</span> {user.gender}
          </p>
        </div>

        <button
          onClick={() => setEditMode(!editMode)}
          className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {editMode ? "Отмена" : "Изменить учетные данные"}
        </button>

        {editMode && (
          <ChangeCredentialsForm onSuccess={() => setEditMode(false)} />
        )}

        <button
          onClick={handleLogout}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center"
        >
          <LogOut className="h-5 w-5 mr-2" /> Выйти
        </button>
      </div>
    </div>
  );
};
