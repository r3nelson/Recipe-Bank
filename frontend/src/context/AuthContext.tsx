import { createContext, useState, useEffect, ReactNode } from "react";
import { checkLoginStatus } from "../api/authAPI";

export type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  refreshLoginStatus: () => Promise<void>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshLoginStatus = async () => {
    setLoading(true);
    try {
      const status = await checkLoginStatus();
      setIsLoggedIn(status);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loading, refreshLoginStatus, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
