import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

const AUTH_STORAGE_KEY = "sbms-auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!saved) { setLoading(false); return; }
    try {
      setSession(JSON.parse(saved));
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const nextSession = { token: data.token, ...data.user };
    setSession(nextSession);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
    return { ok: true, session: nextSession };
  }

  function logout() {
    setSession(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ session, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within an AuthProvider");
  return value;
}
