import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, PrimaryButton, SecondaryButton } from "@/components/MobileShell";

export const Route = createFileRoute("/invite")({
  component: Invite,
});

const CONTACTS = [
  { id: "marc", name: "Marc Vidal", initials: "MV", color: "bg-accent text-foreground" },
  { id: "júlia", name: "Júlia Roca", initials: "JR", color: "bg-emerald-500 text-white" },
  { id: "pau", name: "Pau Ferrer", initials: "PF", color: "bg-sky-500 text-white" },
  { id: "ana", name: "Ana López", initials: "AL", color: "bg-rose-500 text-white" },
  { id: "ben", name: "Ben Ortiz", initials: "BO", color: "bg-violet-500 text-white" },
];

function Invite() {
  const [picked, setPicked] = useState<string[]>(["marc", "júlia", "pau"]);
  const [copied, setCopied] = useState(false);

  return (
    <MobileShell back="/create" title="Step · Invite">
      <section className="px-6 pt-2">
        <h1 className="text-3xl font-semibold tracking-tight leading-tight mb-2">Invite friends</h1>
        <p className="text-sm text-muted-foreground mb-8">Share a link or pick from contacts.</p>

        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-foreground text-background active:scale-[0.99] transition-transform mb-3"
        >
          <div className="text-left">
            <p className="font-mono text-[10px] uppercase tracking-widest text-background/60">Invite link</p>
            <p className="font-mono text-sm truncate">radar.ai/p/9F2-bcn</p>
          </div>
          <span className="text-xs font-medium">{copied ? "Copied ✓" : "Copy"}</span>
        </button>

        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-8 mb-3">From contacts</p>
        <div className="space-y-2">
          {CONTACTS.map((c) => {
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
        <PrimaryButton as="link" to="/lobby">
          Send {picked.length} invite{picked.length === 1 ? "" : "s"} & continue
        </PrimaryButton>
        <SecondaryButton as="link" to="/lobby">Continue to lobby</SecondaryButton>
      </div>
    </MobileShell>
  );
}
