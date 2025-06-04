import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import { updateUserEmail } from "../../../../store/slices/authSlice";

interface ChangeCredentialsFormProps {
  onSuccess?: () => void;
}

const ChangeCredentialsForm = ({ onSuccess }: ChangeCredentialsFormProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setEmail(user?.email || "");
  }, [user?.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await dispatch(updateUserEmail(email)).unwrap();
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(typeof err === "string" ? err : err.message || "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md text-gray-900 dark:text-white"
    >
      <label className="block mb-2 font-semibold" htmlFor="email">
        Новый Email
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600"
        required
      />
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && (
        <p className="text-green-600 mb-2">Email успешно обновлён!</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Обновление..." : "Сменить Email"}
      </button>
    </form>
  );
};

export default ChangeCredentialsForm;
