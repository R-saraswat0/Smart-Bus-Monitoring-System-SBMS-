import { createContext, useContext, useEffect, useState } from "react";

const AUTH_STORAGE_KEY = "sbms-auth";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSession(parsed);
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  async function login(role, email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return { ok: false, message: data.error || "Login failed" };
      }

      if (data.user.role !== role) {
        return { ok: false, message: `Access denied. Registered role is ${data.user.role}, but tried to login as ${role}.` };
      }

      const nextSession = {
        token: data.token,
        ...data.user
      };

      setSession(nextSession);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
      return { ok: true, session: nextSession };
    } catch (error) {
      return { ok: false, message: "Network error during login." };
    }
  }

  function logout() {
    setSession(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return value;
}
