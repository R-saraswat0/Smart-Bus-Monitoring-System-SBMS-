import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  alerts as initialAlerts,
  busLogs as initialLogs,
  fleet as initialFleet,
  guards as initialGuards,
} from "../data/sbmsData";

const DataContext = createContext(null);
const AUTH_STORAGE_KEY = "sbms-auth";

function getAuthToken() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.token || null;
  } catch {
    return null;
  }
}

function getAuthHeaders() {
  const token = getAuthToken();
  if (!token) return { "Content-Type": "application/json" };
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [buses, setBuses] = useState(initialFleet);
  const [guards, setGuards] = useState(initialGuards);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [logs, setLogs] = useState(initialLogs);

  const fetchAllData = useCallback(async () => {
    try {
      const [b, l, a, g] = await Promise.all([
        fetch('/api/buses').then(r => r.json()),
        fetch('/api/logs').then(r => r.json()),
        fetch('/api/alerts').then(r => r.json()),
        fetch('/api/guards').then(r => r.json())
      ]);
      if (Array.isArray(b)) setBuses(b);
      if (Array.isArray(l)) setLogs(l);
      if (Array.isArray(a)) setAlerts(a);
      if (Array.isArray(g)) setGuards(g);
    } catch (e) {
      console.error("Failed to load initial data", e);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const addBus = async (bus) => {
    try {
      const response = await fetch('/api/buses', {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(bus)
      });
      if (!response.ok) throw new Error("Failed to add bus");
      await fetchAllData();
    } catch (error) {
      console.error(error);
      setBuses((prev) => [...prev, bus]);
    }
  };

  const removeBus = async (busNumber) => {
    try {
      const response = await fetch(`/api/buses/${busNumber}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to remove bus");
      await fetchAllData();
    } catch (error) {
      console.error(error);
      setBuses((prev) => prev.filter((b) => b.busNumber !== busNumber));
    }
  };
  
  const updateBus = (busNumber, updates) => {
    setBuses((prev) => prev.map((b) => b.busNumber === busNumber ? { ...b, ...updates } : b));
    fetch(`/api/buses/${busNumber}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    }).catch(e => console.error(e));
  };

  const addGuard = async (guard) => {
    try {
      const response = await fetch('/api/guards', {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: guard.name,
          email: guard.email || `${String(guard.name || "guard").toLowerCase().replace(/\s+/g, ".")}@sbms.local`,
          password: guard.password || "guard123",
          gate: guard.gate || guard.destination,
          shift: guard.shift || guard.dutyTime,
        }),
      });
      if (!response.ok) throw new Error("Failed to add guard");
      await fetchAllData();
    } catch (error) {
      console.error(error);
      setGuards((prev) => [...prev, guard]);
    }
  };

  const removeGuard = async (id) => {
    try {
      const response = await fetch(`/api/guards/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to remove guard");
      await fetchAllData();
    } catch (error) {
      console.error(error);
      setGuards((prev) => prev.filter((g) => g.id !== id));
    }
  };

  const addAlert = (alert) => {
    setAlerts((prev) => [alert, ...prev]);
    fetch('/api/alerts', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(alert),
    }).catch((error) => console.error(error));
  };
  
  const removeAlert = async (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    try {
      await fetch(`/api/alerts/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Handle addLog locally but sync to backend
  const addLog = async (log) => {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          busNumber: log.busNumber,
          type: log.type,
          time: log.time,
          date: log.date,
          gate: log.gate,
          occupancy: log.occupancy,
          isLate: log.isLate
        })
      });
      fetchAllData();
    } catch(e) {
      console.error(e);
      setLogs((prev) => [log, ...prev]); // optimistic fallback
    }
  };
  
  const removeLog = async (id) => {
    setLogs((prev) => prev.filter((l) => l.id !== id));
    try {
      await fetch(`/api/logs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    buses,
    addBus,
    removeBus,
    updateBus,
    guards,
    addGuard,
    removeGuard,
    alerts,
    addAlert,
    removeAlert,
    logs,
    addLog,
    removeLog,
    refreshData: fetchAllData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
