import { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setTokenState(parsed.token);
      setAuthToken(parsed.token);
    }
  }, []);

  function login(userData, tokenData) {
    setUser(userData);
    setTokenState(tokenData);
    setAuthToken(tokenData);
    localStorage.setItem("auth", JSON.stringify({ user: userData, token: tokenData }));
  }

  function logout() {
    setUser(null);
    setTokenState(null);
    setAuthToken(null);
    localStorage.removeItem("auth");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}