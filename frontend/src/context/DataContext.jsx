import { createContext, useContext, useState } from "react";
import {
  alerts as initialAlerts,
  busLogs as initialLogs,
  fleet as initialFleet,
  guards as initialGuards,
} from "../data/sbmsData";

const DataContext = createContext(null);

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
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "MSG-001",
      sender: "Transport Admin",
      receiver: "All Guards",
      text: "Please work properly and verify all arriving bus IDs. Pay special attention to check bus id xyz properly.",
      time: "08:15 AM",
      date: "Feb 14, 2026",
    }
  ]);

  const addBus = (bus) => setBuses((prev) => [...prev, bus]);
  const removeBus = (busNumber) => setBuses((prev) => prev.filter((b) => b.busNumber !== busNumber));
  const updateBus = (busNumber, updates) => setBuses((prev) => prev.map((b) => b.busNumber === busNumber ? { ...b, ...updates } : b));

  const addGuard = (guard) => setGuards((prev) => [...prev, guard]);
  const removeGuard = (id) => setGuards((prev) => prev.filter((g) => g.id !== id));

  const addAlert = (alert) => setAlerts((prev) => [alert, ...prev]);
  const removeAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

  const addLog = (log) => setLogs((prev) => [log, ...prev]);
  const removeLog = (id) => setLogs((prev) => prev.filter((l) => l.id !== id));

  const addMessage = (msg) => setMessages((prev) => [msg, ...prev]);

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
    searchQuery,
    setSearchQuery,
    messages,
    addMessage,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
