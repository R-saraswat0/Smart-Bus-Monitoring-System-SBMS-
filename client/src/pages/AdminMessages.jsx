import { MessageSquare, Send, Users } from "lucide-react";
import { useState } from "react";
import { useData } from "../context/DataContext";

export default function AdminMessages() {
  const { messages, addMessage, guards } = useData();
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState("All Guards");

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: `MSG-${Date.now()}`,
      sender: "Transport Admin",
      receiver,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    addMessage(msg);
    setNewMessage("");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">Message Broadcast</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Send direct communications and instructions to the guard team.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="glass-card p-6 border border-white/20 dark:border-white/10 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-sky-100 dark:bg-sky-900/50 rounded-2xl">
              <Send className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Compose</h3>
          </div>

          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">To:</label>
              <select
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                className="glass-input w-full appearance-none"
              >
                <option value="All Guards">All Guards (Broadcast)</option>
                {guards.map(g => (
                  <option key={g.id} value={g.name}>{g.name} ({g.gate})</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message:</label>
              <textarea
                required
                rows={5}
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="glass-input w-full resize-none"
              />
            </div>
            <button type="submit" className="glass-button w-full flex items-center justify-center gap-2 py-3">
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        </div>

        <div className="glass-card p-6 border border-white/20 dark:border-white/10 flex flex-col h-[600px]">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-2xl">
              <MessageSquare className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sent Messages History</h3>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/50">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">To: {msg.receiver}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">{msg.id}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium text-right">
                    <div>{msg.time}</div>
                    <div>{msg.date}</div>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{msg.text}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center py-10 text-slate-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>No messages sent yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
