import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiFetch } from "../lib/api";

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};

export const DataProvider = ({ children }) => {
  const [buses, setBuses] = useState([]);
  const [guards, setGuards] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      const [busData, logData, guardData, alertData, msgData] = await Promise.all([
        apiFetch("/buses"),
        apiFetch("/logs"),
        apiFetch("/guards"),
        apiFetch("/alerts"),
        apiFetch("/messages"),
      ]);
      setBuses(busData);
      setLogs(logData);
      setGuards(guardData);
      setAlerts(alertData);
      setMessages(msgData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // --- Buses ---
  const addBus = async (bus) => {
    const created = await apiFetch("/buses", { method: "POST", body: JSON.stringify(bus) });
    setBuses((prev) => [...prev, created]);
  };

  const removeBus = async (busNumber) => {
    await apiFetch(`/buses/${busNumber}`, { method: "DELETE" });
    setBuses((prev) => prev.filter((b) => b.busNumber !== busNumber));
  };

  const updateBus = async (busNumber, updates) => {
    const updated = await apiFetch(`/buses/${busNumber}`, { method: "PUT", body: JSON.stringify(updates) });
    setBuses((prev) => prev.map((b) => b.busNumber === busNumber ? updated : b));
  };

  // --- Guards ---
  const addGuard = async (guard) => {
    const created = await apiFetch("/guards", { method: "POST", body: JSON.stringify(guard) });
    setGuards((prev) => [...prev, created]);
  };

  const removeGuard = async (id) => {
    await apiFetch(`/guards/${id}`, { method: "DELETE" });
    setGuards((prev) => prev.filter((g) => g.id !== id && g._id !== id));
  };

  // --- Logs ---
  const addLog = async (log) => {
    const created = await apiFetch("/logs", { method: "POST", body: JSON.stringify(log) });
    setLogs((prev) => [created, ...prev]);
    // refresh buses status
    const busData = await apiFetch("/buses");
    setBuses(busData);
    // refresh alerts
    const alertData = await apiFetch("/alerts");
    setAlerts(alertData);
    return created;
  };

  const removeLog = async (id) => {
    await apiFetch(`/logs/${id}`, { method: "DELETE" });
    setLogs((prev) => prev.filter((l) => l.id !== id && l._id !== id));
  };

  // --- Alerts ---
  const addAlert = async (alert) => {
    const created = await apiFetch("/alerts", { method: "POST", body: JSON.stringify(alert) });
    setAlerts((prev) => [created, ...prev]);
  };

  const removeAlert = async (id) => {
    await apiFetch(`/alerts/${id}`, { method: "DELETE" });
    setAlerts((prev) => prev.filter((a) => a.id !== id && a._id !== id));
  };

  const resolveAlert = async (id) => {
    const updated = await apiFetch(`/alerts/${id}/resolve`, { method: "PATCH" });
    setAlerts((prev) => prev.map((a) => (a.id === id || a._id === id) ? updated : a));
  };

  // --- Messages ---
  const addMessage = async (msg) => {
    const created = await apiFetch("/messages", { method: "POST", body: JSON.stringify(msg) });
    setMessages((prev) => [created, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      buses, guards, alerts, logs, messages,
      loading, searchQuery, setSearchQuery,
      addBus, removeBus, updateBus,
      addGuard, removeGuard,
      addLog, removeLog,
      addAlert, removeAlert, resolveAlert,
      addMessage,
      refresh: fetchAll,
    }}>
      {children}
    </DataContext.Provider>
  );
};
