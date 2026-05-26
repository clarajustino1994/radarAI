import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/chat/$id")({
  validateSearch: (search: Record<string, unknown>) => ({
    returnTo: typeof search.returnTo === "string" ? search.returnTo : undefined,
  }),
  component: ChatPage,
});

function ChatPage() {
  const { id } = Route.useParams();
  const { plan, sendChat, markChatRead, sendExtraChat, sendDmMessage } =
    usePlan();
  const [text, setText] = useState("");

  const isMain = id === "current";
  const isDm = id.startsWith("dm-");
  const dmContactId = isDm ? id.replace("dm-", "") : null;
  const dmThread = isDm ? plan.dmChats.find((d) => d.id === dmContactId) : null;

  const search = Route.useSearch() as { returnTo?: string };
  const backTo = search.returnTo ?? "/chats";

  const thread = isMain
    ? {
        name: plan.name || "Outdoor plan · El Born",
        messages: plan.chat,
        initials: ["Y", "M", "J", "P"],
      }
    : isDm && dmThread
      ? {
          name: dmThread.fromName,
          messages: dmThread.messages,
          initials: [dmThread.fromInitials],
        }
      : plan.extraChats.find((t) => t.id === id);

  useEffect(() => {
    if (isMain) markChatRead();
  }, [isMain, markChatRead]);

  if (!thread)
    return (
      <MobileShell back={backTo} title="Chat">
        <p className="px-5 pt-4 text-sm text-muted-foreground">
          Chat not found.
        </p>
      </MobileShell>
    );

  const send = () => {
    const msg = text.trim();
    if (!msg) return;

    if (isMain) sendChat(msg);
    else if (isDm && dmContactId) sendDmMessage(dmContactId, msg);
    else sendExtraChat(id, msg);

    setText("");
  };

  return (
    <MobileShell back={backTo} title={thread.name}>
      <section className="px-5 pt-2">
        <div className="flex items-center gap-3 mb-4 p-3 bg-surface ring-1 ring-border rounded-2xl">
          <div className="flex -space-x-2">
            {[
              "bg-primary text-primary-foreground",
              "bg-accent text-foreground",
              "bg-emerald-500 text-white",
              "bg-sky-500 text-white",
            ]
              .slice(0, thread.initials.length)
              .map((cls, i) => (
                <div
                  key={i}
                  className={`size-9 rounded-full ring-2 ring-background grid place-items-center text-[11px] font-bold ${cls}`}
                >
                  {thread.initials[i]}
                </div>
              ))}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{thread.name}</p>
          </div>
        </div>

        <div className="space-y-3 mb-24">
          {thread.messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm ${
                  m.from === "You"
                    ? "bg-foreground text-background"
                    : "bg-surface ring-1 ring-border"
                }`}
              >
                {m.from !== "You" && (
                  <p className="text-[10px] opacity-60 mb-0.5">{m.from}</p>
                )}
                <p className="leading-snug">{m.text}</p>
                {m.type === "invite" && <InviteCard msg={m} />}
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
          <button
            onClick={send}
            className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium active:scale-95"
          >
            Send
          </button>
        </div>
      </div>
    </MobileShell>
  );
}

function InviteCard({ msg }: { msg: ChatMsg }) {
  const nav = useNavigate();
  return (
    <div className="mt-2 rounded-2xl bg-amber-50 ring-1 ring-amber-200 p-4 text-left">
      <p className="text-[10px] font-mono uppercase tracking-widest text-amber-600 mb-1">
        Plan invite
      </p>
      <p className="text-sm font-semibold mb-0.5">{msg.invitePlanName}</p>
      <p className="text-xs text-muted-foreground mb-3">
        📍 {msg.inviteLocation}
      </p>
      <button
        onClick={() => nav({ to: "/lobby" })}
        className="w-full py-2 rounded-xl bg-amber-400 text-amber-950 text-sm font-semibold active:scale-95 transition-transform"
      >
        Join plan →
      </button>
    </div>
  );
}
