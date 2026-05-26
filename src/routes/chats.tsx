import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/chats")({
  component: ChatsPage,
});

function ChatsPage() {
  const { plan, /* existing */ } = usePlan();
  const dmChats = plan.dmChats;
  const nav = useNavigate();
  const [search, setSearch] = useState("");

  const lastMsg = plan.chat.at(-1);

  const dmList = plan.dmChats.map((d) => ({
    id: `dm-${d.id}`,
    name: d.fromName,
    members: "",
    lastMessage: d.messages.at(-1)?.text ?? "",
    lastFrom: d.messages.at(-1)?.from ?? "",
    time: d.messages.at(-1)?.at ?? "",
    unread: d.unread,
    initials: [d.fromInitials],
    colorOverride: d.fromColor,
    isDm: true,
    hasInvite: d.messages.some((m) => m.type === "invite"),
  }));

  const allChats = [
    ...dmList,
    {
      id: "current",
      name: plan.name || "Outdoor plan · El Born",
      members: "You, Marc, Júlia, Pere",
      lastMessage: lastMsg?.text ?? "No messages yet",
      lastFrom: lastMsg?.from ?? "",
      time: lastMsg?.at ?? "",
      unread: plan.chatUnread,
      initials: ["Y", "M", "J", "P"],
      isDm: false,
      hasInvite: false,
      colorOverride: undefined,
    },
    ...plan.extraChats.map((t) => ({
      id: t.id,
      name: t.name,
      members: t.members,
      lastMessage: t.messages.at(-1)?.text ?? "No messages yet",
      lastFrom: t.messages.at(-1)?.from ?? "",
      time: t.messages.at(-1)?.at ?? "",
      unread: t.unread,
      initials: t.initials,
      isDm: false,
      hasInvite: false,
      colorOverride: undefined,
    })),
  ];

  const filtered = allChats.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.members.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MobileShell back="/" title="Messages">
      <section className="px-5 pt-2">
        <div className="relative mb-4">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chats…"
            className="w-full bg-surface ring-1 ring-border rounded-full pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-primary/40"
          />
        </div>

        <div className="space-y-1">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-10">
              No chats found
            </p>
          )}
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => nav({ to: "/chat/$id", params: { id: c.id } })}
              className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-surface active:scale-[0.98] transition-all text-left"
            >
              <div className="flex -space-x-2 shrink-0">
                {[
                  "bg-primary text-primary-foreground",
                  "bg-accent text-foreground",
                  "bg-emerald-500 text-white",
                  "bg-sky-500 text-white",
                ]
                  .slice(0, c.initials.length)
                  .map((cls, i) => (
                    <div
                      key={i}
                      className={`size-10 rounded-full ring-2 ring-background grid place-items-center text-[11px] font-bold ${cls}`}
                    >
                      {c.initials[i]}
                    </div>
                  ))}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-semibold truncate">{c.name}</p>
                  <span className="text-[11px] text-muted-foreground shrink-0 ml-2">
                    {c.time}
                  </span>
                </div>
                <p className="text-[13px] text-muted-foreground truncate">
                  {c.lastFrom && c.lastFrom !== "You" ? `${c.lastFrom}: ` : ""}
                  {c.lastMessage}
                </p>
              </div>

            {c.hasInvite ? (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 shrink-0 whitespace-nowrap">
                invited you
              </span>
            ) : c.unread > 0 ? (
                <div className="size-5 rounded-full bg-primary grid place-items-center shrink-0">
                    <span className="text-[10px] font-bold text-primary-foreground">{c.unread}</span>
                </div>
            ) : null}
            </button>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
