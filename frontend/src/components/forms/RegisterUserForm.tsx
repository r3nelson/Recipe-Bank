import React, { useState } from "react";
import { register } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";

const RegisterUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const name = `${firstName.toLowerCase()} ${lastName.toLowerCase()} `;
      const user = { email, name, password };
      const response = await register(user);
      console.log("User registered:", response);
      navigate("/login");
    } catch (err) {
      setError(`Registration failed: ${err}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-black p-6 bg-white rounded shadow-md"
      >
        <div className="mb-2">
          <label htmlFor="First name" className="block mb-1 font-semibold">
            First Name
          </label>
          <input
            id="first name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="Last name" className="block mb-1 font-semibold">
            Last Name
          </label>
          <input
            id="last name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>
        {error && <div>{error}</div>}
        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-blue-500 text-white text-lg px-4 py-2 mt-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUserForm;
