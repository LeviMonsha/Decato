import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Loader } from "lucide-react";
import apiClient from "../../../hooks/apiClient";

export const RegisterPage = () => {
  const [registerForm, setRegisterForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdult: "",
    gender: "",
  });

  const [isAcceptRules, setAcceptRules] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "isAcceptRules") {
        setAcceptRules(checked);
      } else {
        setRegisterForm((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      setRegisterForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAcceptRules) {
      setMessage("You must accept the rules!");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const userData = {
        firstname: registerForm.firstname,
        lastname: registerForm.lastname,
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
        confirmPassword: registerForm.confirmPassword,
        isAdult: registerForm.isAdult === "true",
        gender: registerForm.gender,
      };

      await apiClient.post("/auth/signup", userData, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;
        if (typeof data === "object" && data !== null) {
          setMessage(Object.values(data).filter(Boolean).join(" "));
        } else {
          setMessage(String(data));
        }
      } else {
        setMessage("Registration error");
      }
      setLoading(false);
    }
  };

  return (
    <Form.Root
      className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-800"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
        Регистрация
      </h2>

      {message && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm text-center">
          {message}
        </div>
      )}

      <Form.Field name="firstName" className="mb-4">
        <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Имя
        </Form.Label>
        <Form.Control asChild>
          <input
            type="text"
            name="firstname"
            placeholder="Ivan"
            value={registerForm.firstname}
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="lastName" className="mb-4">
        <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Фамилия
        </Form.Label>
        <Form.Control asChild>
          <input
            type="text"
            name="lastname"
            placeholder="Ivanov"
            value={registerForm.lastname}
            onChange={handleChange}
            autoComplete="off"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="username" className="mb-4">
        <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Имя пользователя
        </Form.Label>
        <Form.Control asChild>
          <input
            type="text"
            name="username"
            placeholder="Ivan"
            value={registerForm.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="email" className="mb-4">
        <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Электронная почта
        </Form.Label>
        <Form.Control asChild>
          <input
            type="email"
            name="email"
            placeholder="ivan@email.com"
            value={registerForm.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="password" className="mb-4">
        <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Пароль
        </Form.Label>
        <Form.Control asChild>
          <input
            type="password"
            name="password"
            placeholder="Pass!word123"
            value={registerForm.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="confirmPassword" className="mb-4">
        <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Подтверждение пароля
        </Form.Label>
        <Form.Control asChild>
          <input
            type="password"
            name="confirmPassword"
            value={registerForm.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="isAcceptRules" className="mb-4">
        <Form.Label className="flex items-center text-gray-700 dark:text-gray-300">
          <Form.Control asChild>
            <input
              type="checkbox"
              name="isAcceptRules"
              checked={isAcceptRules}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-primary-600 dark:text-primary-500 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
            />
          </Form.Control>
          Я принимаю&nbsp;
          <a
            href="/rules"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 underline transition-colors"
          >
            правила
          </a>
        </Form.Label>
      </Form.Field>

      <Form.Field name="isAdult" className="mb-4">
        <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Вам есть 18 лет?
        </Form.Label>
        <Form.Control asChild>
          <select
            name="isAdult"
            value={registerForm.isAdult}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Выбери</option>
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </select>
        </Form.Control>
      </Form.Field>

      <Form.Field name="gender" className="mb-6">
        <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Пол
        </Form.Label>
        <div className="flex gap-6 text-gray-700 dark:text-gray-300">
          <label className="flex items-center">
            <Form.Control asChild>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={registerForm.gender === "Male"}
                onChange={handleChange}
                className="mr-2"
                required
              />
            </Form.Control>
            Мужчина
          </label>
          <label className="flex items-center">
            <Form.Control asChild>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={registerForm.gender === "Female"}
                onChange={handleChange}
                className="mr-2"
                required
              />
            </Form.Control>
            Женщина
          </label>
        </div>
      </Form.Field>

      <Form.Submit asChild>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <Loader className="animate-spin h-5 w-5 mr-2" /> Подождите...
            </>
          ) : (
            "Зарегистрироваться"
          )}
        </button>
      </Form.Submit>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Уже есть аккаунт?{" "}
          <Link
            to="/login"
            className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
          >
            Войти
          </Link>
        </p>
      </div>
    </Form.Root>
  );
};
