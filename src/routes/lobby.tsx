import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, PrimaryButton, SecondaryButton } from "@/components/MobileShell";
import { PARTICIPANTS } from "@/lib/sample-data";

export const Route = createFileRoute("/lobby")({
  component: Lobby,
});

function Lobby() {
  const [nudged, setNudged] = useState<string[]>([]);
  const doneCount = PARTICIPANTS.filter((p) => p.status === "Done").length;

  return (
    <MobileShell back="/invite" title="Lobby · Waiting room">
      <section className="px-6 pt-2">
        <h1 className="text-3xl font-semibold tracking-tight leading-tight mb-2">Lobby</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {doneCount}/{PARTICIPANTS.length} done · avg 20s to fill
        </p>

        <div className="bg-surface ring-1 ring-border rounded-3xl p-2 mb-6">
          {PARTICIPANTS.map((p, i) => (
            <div key={p.id} className={`flex items-center gap-4 p-3 ${i > 0 ? "border-t border-border" : ""}`}>
              <div className={`size-10 rounded-full ${p.color} grid place-items-center text-xs font-bold text-white`}>
                {p.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{p.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`size-1.5 rounded-full ${
                      p.status === "Done" ? "bg-primary" : p.status === "Filling" ? "bg-accent animate-pulse" : "bg-muted-foreground/40"
                    }`}
                  />
                  <span className="text-[11px] text-muted-foreground">{p.status}</span>
                  {p.status === "Done" && p.time > 0 && (
                    <span className="font-mono text-[10px] text-primary ml-1">{p.time}s</span>
                  )}
                </div>
              </div>
              {p.status !== "Done" && (
                <button
                  onClick={() => setNudged((n) => (n.includes(p.id) ? n : [...n, p.id]))}
                  className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-muted text-foreground active:scale-95 transition-transform"
                >
                  {nudged.includes(p.id) ? "Sent ✓" : "Nudge"}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-accent/10 ring-1 ring-accent/30 rounded-2xl p-4 mb-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-1">Weather</p>
          <p className="text-sm leading-snug">
            22°C and sunny in El Born — outdoor options will be prioritized.
          </p>
        </div>
      </section>

      <div className="px-6 space-y-2">
        <div className="flex items-center justify-center gap-2 py-3 mb-1">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="size-2 rounded-full bg-primary animate-pulse [animation-delay:120ms]" />
          <span className="size-2 rounded-full bg-primary animate-pulse [animation-delay:240ms]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-2">Waiting for friends…</span>
        </div>
        <PrimaryButton as="link" to="/prefs">Fill my preferences</PrimaryButton>
      </div>
    </MobileShell>
  );
}
