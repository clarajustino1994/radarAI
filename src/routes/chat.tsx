import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
});

function ChatPage() {
  const { plan, sendChat, markChatRead } = usePlan();
  const [text, setText] = useState("");

  useEffect(() => { markChatRead(); }, [markChatRead]);

  const send = () => {
    if (!text.trim()) return;
    sendChat(text.trim());
    setText("");
  };

  return (
    <MobileShell back="/results" title="Group · Outdoor plan">
      <section className="px-5 pt-2">
        <div className="flex items-center gap-3 mb-4 p-3 bg-surface ring-1 ring-border rounded-2xl">
          <div className="flex -space-x-2">
            <div className="size-9 rounded-full bg-primary ring-2 ring-background grid place-items-center text-[11px] font-bold text-primary-foreground">Y</div>
            <div className="size-9 rounded-full bg-accent ring-2 ring-background grid place-items-center text-[11px] font-bold text-foreground">M</div>
            <div className="size-9 rounded-full bg-emerald-500 ring-2 ring-background grid place-items-center text-[11px] font-bold text-white">J</div>
            <div className="size-9 rounded-full bg-sky-500 ring-2 ring-background grid place-items-center text-[11px] font-bold text-white">P</div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">4 friends</p>
            <p className="text-[11px] text-muted-foreground">Planning · Bunkers shortlist</p>
          </div>
        </div>

        <div className="space-y-3 mb-24">
          {plan.chat.map((m) => (
            <div key={m.id} className={`flex ${m.from === "You" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm ${
                m.from === "You" ? "bg-foreground text-background" : "bg-surface ring-1 ring-border"
              }`}>
                {m.from !== "You" && <p className="text-[10px] opacity-60 mb-0.5">{m.from}</p>}
                <p className="leading-snug">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-4 pb-2 pt-3 bg-gradient-to-t from-background via-background to-transparent">
        <div className="flex gap-2 bg-surface ring-1 ring-border rounded-full p-1.5">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message the group…"
            className="flex-1 bg-transparent px-3 text-sm outline-none"
          />
          <button onClick={send} className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium active:scale-95">
            Send
          </button>
        </div>
      </div>
    </MobileShell>
  );
}