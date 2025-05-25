import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

export const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setMessage("Please fill all fields");
      return;
    }
    if (!captchaValue) {
      setMessage("Please confirm you are not a robot");
      return;
    }

    try {
      setLoading(true);
      // await axios.post("/api/secure/captcha", { recaptchaToken: captchaValue });
      const response = await axios.post("/api/auth/signin", loginForm, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/");
      } else {
        setMessage("Login error. Please try again.");
        recaptchaRef.current?.reset();
        setCaptchaValue(null);
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          error.response?.data ||
          "Login error. Please try again."
      );
      recaptchaRef.current?.reset();
      setCaptchaValue(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Root
      className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md dark:bg-gray-800"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
        Войти в аккаунт
      </h2>

      <Form.Field name="email" className="mb-4">
        <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Электронная почта
        </Form.Label>
        <Form.Control asChild>
          <input
            type="email"
            name="email"
            placeholder="ivan@email.com"
            value={loginForm.email}
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
            value={loginForm.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </Form.Control>
      </Form.Field>

      <div className="mb-4 flex justify-center">
        <ReCAPTCHA
          sitekey={
            process.env.REACT_APP_CAPTCHA_API_KEY || "REACT_APP_CAPTCHA_API_KEY"
          }
          onChange={handleCaptchaChange}
          ref={recaptchaRef}
        />
      </div>

      <Form.Submit asChild>
        <button
          type="submit"
          disabled={!captchaValue || loading}
          className="w-full flex justify-center py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Подождите..." : "Войти"}
        </button>
      </Form.Submit>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Нет аккаунта?{" "}
          <Link
            to="/register"
            className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>

      {message && (
        <div className="mt-4 text-center text-red-600 dark:text-red-400">
          {message}
        </div>
      )}
    </Form.Root>
  );
};
