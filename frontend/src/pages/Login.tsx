import LoginForm from "../components/forms/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { isLoggedIn } = useAuth();

  // need to add logout button on form

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="bg-gray-100">
      <LoginForm />
    </div>
  );
}
