import { createContext, useContext, useEffect, useState } from "react";

const AUTH_STORAGE_KEY = "sbms-auth";

const demoUsers = {
  admin: {
    role: "admin",
    name: "Anita Reddy",
    title: "Transport Admin",
    email: "admin@sbms.local",
    password: "admin123",
  },
  guard: {
    role: "guard",
    name: "Rajesh Kumar",
    title: "Main Gate Guard",
    email: "guard@sbms.local",
    password: "guard123",
  },
};

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

  function login(role, email, password) {
    const user = demoUsers[role];

    if (!user || user.email !== email || user.password !== password) {
      return { ok: false, message: "Invalid credentials for the selected role." };
    }

    const nextSession = {
      role: user.role,
      name: user.name,
      title: user.title,
      email: user.email,
    };

    setSession(nextSession);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
    return { ok: true, session: nextSession };
  }

  function logout() {
    setSession(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ session, login, logout, demoUsers }}>
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
