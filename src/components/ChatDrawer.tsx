import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { usePlan } from "@/lib/plan-store";

export function ChatDrawer({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const { plan, sendChat, markChatRead } = usePlan();
  const messages = plan.chat;
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    sendChat(text);
    setText("");
  };

  return (
    <div
      className={`fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 transition-transform duration-300 ease-out ${
        open ? "translate-y-0" : "translate-y-[calc(100%-64px)]"
      }`}
    >
      <div className="bg-foreground text-background rounded-t-[2rem] shadow-lift">
        <button
          onClick={() => { setOpen((o) => !o); markChatRead(); }}
          className="w-full px-5 pt-3 pb-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 bg-background/20 rounded-full absolute left-1/2 -translate-x-1/2 top-2" />
            <div className="flex -space-x-2 relative">
              <div className="size-7 rounded-full bg-primary ring-2 ring-foreground grid place-items-center text-[10px] font-bold">M</div>
              <div className="size-7 rounded-full bg-accent ring-2 ring-foreground grid place-items-center text-[10px] font-bold text-foreground">J</div>
              <div className="size-7 rounded-full bg-sky-500 ring-2 ring-foreground grid place-items-center text-[10px] font-bold">P</div>
              {plan.chatUnread > 0 && (
                <span className="absolute -top-1 -right-2 bg-accent text-foreground text-[9px] font-bold rounded-full px-1.5 py-0.5">
                  {plan.chatUnread}
                </span>
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">Group chat</p>
              <p className="text-[11px] text-background/50">{messages.length} messages</p>
            </div>
          </div>
          <span className="text-xs font-mono text-background/60">{open ? "CLOSE" : "OPEN"}</span>
        </button>

        {open && (
          <div className="px-5 pb-5 animate-fade-in">
            <div className="max-h-72 overflow-y-auto no-scrollbar space-y-3 py-2">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "You" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                      m.from === "You" ? "bg-primary text-primary-foreground" : "bg-background/10 text-background"
                    }`}
                  >
                    {m.from !== "You" && <p className="text-[10px] opacity-60 mb-0.5">{m.from}</p>}
                    <p className="leading-snug">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Message…"
                className="flex-1 bg-background/10 placeholder:text-background/40 rounded-full px-4 py-2.5 text-sm outline-none focus:bg-background/15"
              />
              <button
                onClick={send}
                className="px-4 rounded-full bg-background text-foreground text-sm font-medium active:scale-95 transition-transform"
              >
                Send
              </button>
            </div>
            <Link to="/chat" className="block text-center mt-3 text-[11px] font-mono uppercase tracking-widest text-background/60 underline underline-offset-4">
              Open full chat →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}