import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, PrimaryButton } from "@/components/MobileShell";

export const Route = createFileRoute("/invite")({
  component: Invite,
});

const CONTACTS = [
  { id: "marc", name: "Marc Vidal", initials: "MV", color: "bg-accent text-foreground" },
  { id: "júlia", name: "Júlia Roca", initials: "JR", color: "bg-emerald-500 text-white" },
  { id: "ana", name: "Ana López", initials: "AL", color: "bg-rose-500 text-white" },
  { id: "ben", name: "Ben Ortiz", initials: "BO", color: "bg-violet-500 text-white" },
];

function Invite() {
  const [picked, setPicked] = useState<string[]>(["marc", "júlia", "pau"]);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = CONTACTS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <MobileShell
      back="/create"
      title="Step · Invite"
      rightSlot={
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface ring-1 ring-border active:scale-95 transition-transform text-xs"
          title="Copy invite link"
        >
          <span className="font-mono text-[11px]">radar.ai/p/9F2-bcn</span>
          <span className="text-sm">{copied ? "✓" : "↗"}</span>
        </button>
      }
    >
      <section className="px-6 pt-2">
        <h1 className="text-3xl font-semibold tracking-tight leading-tight mb-2">Invite friends</h1>
        <p className="text-sm text-muted-foreground mb-8">Share a link or pick from contacts.</p>

        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-8 mb-3">From contacts</p>

        <div className="flex items-center gap-2 px-3 py-2 bg-surface ring-1 ring-border rounded-2xl mb-4">
          <span className="text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          {filtered.map((c) => {
            const active = picked.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => setPicked((p) => (p.includes(c.id) ? p.filter((x) => x !== c.id) : [...p, c.id]))}
                className="w-full flex items-center gap-4 p-3 bg-surface ring-1 ring-border rounded-2xl active:scale-[0.99] transition-transform"
              >
                <div className={`size-10 rounded-full ${c.color} grid place-items-center text-xs font-bold`}>{c.initials}</div>
                <p className="flex-1 text-left text-sm font-medium">{c.name}</p>
                <span
                  className={`size-6 rounded-full grid place-items-center text-xs ${
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {active ? "✓" : "+"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="px-6 mt-8 space-y-2">
        <PrimaryButton as="link" to="/lobby" color="bg-[oklch(0.74_0.12_50)]">
          Send {picked.length} invite{picked.length === 1 ? "" : "s"} & continue
        </PrimaryButton>
        <PrimaryButton as="link" to="/lobby">
          Continue to lobby
        </PrimaryButton>
      </div>
    </MobileShell>
  );
}
