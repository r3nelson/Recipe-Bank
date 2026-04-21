// src/pages/Landing.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginButton from "../components/buttons/LoginButton";
import SignUpButton from "../components/buttons/SignUpButton";

export default function Landing() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          MyCookBook!
        </h1>
        <h2>To start adding recipes login or sign up</h2>
        <LoginButton styling="w-40 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md" />
        <SignUpButton styling="w-40 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md" />
      </div>
    </div>
  );
}
