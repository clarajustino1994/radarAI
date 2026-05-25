import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, SecondaryButton } from "@/components/MobileShell";
import { ActivityCard } from "@/components/ActivityCard";
import { ACTIVITIES } from "@/lib/sample-data";

export const Route = createFileRoute("/compromise")({
  component: Compromise,
});

function Compromise() {
  const picks = [ACTIVITIES[1], ACTIVITIES[0], ACTIVITIES[4]];
  const reasons = [
    "Bends distance — still free and outdoor.",
    "Bends budget — perfect mood + atmosphere fit.",
    "Bends time — opens late but worth it.",
  ];
  return (
    <MobileShell back="/conflict" title="Best compromises">
      <section className="px-5 pt-2 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight mb-1">3 picks, one rule bent each</h1>
        <p className="text-sm text-muted-foreground mb-6">Tap to see details, vote, or confirm.</p>
        <div className="space-y-4">
          {picks.map((a, i) => (
            <div key={a.id}>
              <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent">{reasons[i]}</div>
              <ActivityCard a={a} rank={i + 1} />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <SecondaryButton as="link" to="/chat">Discuss in chat</SecondaryButton>
        </div>
      </section>
    </MobileShell>
  );
}