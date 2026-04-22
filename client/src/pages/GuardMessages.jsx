import { MessageSquare, AlertCircle } from "lucide-react";
import { useData } from "../context/DataContext";
import { guardProfile } from "../data/sbmsData";

export default function GuardMessages() {
  const { messages } = useData();

  const myMessages = messages.filter(msg => 
    msg.receiver === "All Guards" || msg.receiver === guardProfile.name
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400">Inbox</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Important memos and directives from the transport admin team.</p>
      </div>

      <div className="glass-card p-6 sm:p-8 border border-white/20 dark:border-white/10 min-h-[500px]">
        <div className="space-y-6">
          {myMessages.map(msg => (
            <div key={msg.id} className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-5 border border-white/40 dark:border-white/5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{msg.sender}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{msg.receiver === "All Guards" ? "Broadcast to all" : "Direct Message"}</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 text-right">
                  <p>{msg.time}</p>
                  <p className="text-xs">{msg.date}</p>
                </div>
              </div>
              <div className="pl-13 mt-2 border-l-2 border-indigo-200 dark:border-indigo-800 ml-5 py-2">
                <p className="text-slate-700 dark:text-slate-300 font-medium pl-4 whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {myMessages.length === 0 && (
            <div className="p-12 text-center glass-panel">
              <AlertCircle className="h-12 w-12 mx-auto text-slate-400 mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-slate-700 dark:text-slate-300">You're all caught up</h3>
              <p className="mt-2 text-muted-foreground">No new messages from administration.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
