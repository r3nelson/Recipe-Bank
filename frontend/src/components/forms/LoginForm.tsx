import React, { useState } from "react";
import { login } from "../../api/authAPI";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setIsLoggedIn, refreshLoginStatus } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = { email, password };
      const response = await login(user);
      await refreshLoginStatus(); // confirm with server that login truly succeeded
      setIsLoggedIn(true);
      console.log(`${user} login successful: ${response}`);
      navigate("/");
    } catch (err) {
      setError(`${err}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-black p-6 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-blue-500 text-white text-lg px-4 py-2 mt-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
