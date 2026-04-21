// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // only render children if authenticated
  return children;
}
