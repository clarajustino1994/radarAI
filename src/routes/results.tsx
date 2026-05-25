import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MobileShell, MiniChip, PrimaryButton, SecondaryButton } from "@/components/MobileShell";
import { ActivityCard } from "@/components/ActivityCard";
import { ChatDrawer } from "@/components/ChatDrawer";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/results")({
  component: Results,
});

type FilterKey = "all" | "outdoor" | "near" | "free";

function Results() {
  const { plan, confirm, rankedActivities } = usePlan();
  const nav = useNavigate();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [secs, setSecs] = useState(60);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { if (secs === 0 && !decided) setDecided(true); }, [secs, decided]);

  const ranked = useMemo(() => rankedActivities(), [rankedActivities]);
  const list = useMemo(() => {
    let l = ranked.slice(0, 8);
    if (filter === "outdoor") l = l.filter((a) => a.outdoor);
    if (filter === "near") l = l.filter((a) => a.distanceKm <= 5);
    if (filter === "free") l = l.filter((a) => a.budget === 0);
    return l;
  }, [ranked, filter]);

  const topFit = list[0]?.groupFit ?? 0;
  const winner = useMemo(() => {
    return list.reduce<typeof list[number] | undefined>((best, a) => {
      const v = plan.votes[a.id];
      if (!v) return best;
      const score = v.up - v.down;
      const bs = best ? (plan.votes[best.id]?.up ?? 0) - (plan.votes[best.id]?.down ?? 0) : -99;
      return score > bs ? a : best;
    }, undefined);
  }, [list, plan.votes]);

  const majoritySubmitted = list.find((a) => {
    const v = plan.votes[a.id];
    return v && v.up >= 3 && v.up > v.down;
  });

  const tags: string[] = [];
  if (plan.prefs.io) tags.push(plan.prefs.io);
  if (plan.prefs.distance ?? plan.initialDistance) tags.push(plan.prefs.distance ?? plan.initialDistance);
  if (plan.prefs.budget) tags.push(plan.prefs.budget);
  if (plan.prefs.timeWindow) tags.push(plan.prefs.timeWindow);

  return (
    <MobileShell>
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <Link to="/prefs" className="size-9 rounded-full bg-surface ring-1 ring-border grid place-items-center active:scale-95">
            <span className="text-lg leading-none">‹</span>
          </Link>
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Group fit</p>
            <p className="text-base font-semibold tracking-tight">{topFit}% · {list.length} picks</p>
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono ring-1 ${secs <= 15 ? "bg-destructive/10 ring-destructive/30 text-destructive" : "bg-surface ring-border text-muted-foreground"}`}>
            <span>⏱</span><span>{secs}s</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex -space-x-2">
            <div className="size-7 rounded-full bg-primary ring-2 ring-background grid place-items-center text-[10px] font-bold text-primary-foreground">Y</div>
            <div className="size-7 rounded-full bg-accent ring-2 ring-background grid place-items-center text-[10px] font-bold text-foreground">M</div>
            <div className="size-7 rounded-full bg-emerald-500 ring-2 ring-background grid place-items-center text-[10px] font-bold text-white">J</div>
            <div className="size-7 rounded-full bg-sky-500 ring-2 ring-background grid place-items-center text-[10px] font-bold text-white">P</div>
          </div>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {tags.map((t) => (
              <span key={t} className="text-[10px] font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">{t}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
          <MiniChip label="All" active={filter === "all"} onClick={() => setFilter("all")} />
          <MiniChip label="Outdoor" active={filter === "outdoor"} onClick={() => setFilter("outdoor")} />
          <MiniChip label="< 5 km" active={filter === "near"} onClick={() => setFilter("near")} />
          <MiniChip label="Free" active={filter === "free"} onClick={() => setFilter("free")} />
        </div>
      </div>

      <section className="px-5 pt-4 pb-44 space-y-4">
        {list.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground mb-4">No picks match this filter.</p>
            <SecondaryButton onClick={() => setFilter("all")}>Reset filter</SecondaryButton>
          </div>
        ) : (
          list.map((a, i) => (
            <div key={a.id} className={decided && winner?.id === a.id ? "ring-2 ring-primary rounded-[2rem] -m-0.5 p-0.5 animate-pop" : ""}>
              <ActivityCard a={a} rank={i + 1} />
            </div>
          ))
        )}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <SecondaryButton as="link" to="/no-match" backgroundColor="bg-[oklch(0.74_0.12_50)]">Overlap?</SecondaryButton>
          <SecondaryButton as="link" to="/conflict" backgroundColor="bg-[oklch(0.74_0.12_50)]">Conflict help</SecondaryButton>
        </div>
      </section>

      {majoritySubmitted && !decided && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-[55] px-5">
          <div className="bg-surface rounded-3xl shadow-lift ring-1 ring-border p-5 animate-slide-up overflow-hidden">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">Majority reached</p>
            <h3 className="text-lg font-semibold tracking-tight">Confirm {majoritySubmitted.name}?</h3>
            <p className="text-xs text-muted-foreground mb-4">{majoritySubmitted.why}</p>
            <PrimaryButton onClick={() => { confirm(majoritySubmitted.id); nav({ to: "/go" }); }}>
              Confirm plan
            </PrimaryButton>
          </div>
        </div>
      )}

      {decided && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-[55] px-5">
            <div className="bg-foreground text-background rounded-3xl shadow-lift p-5 animate-slide-up overflow-hidden">
            <p className="font-mono text-[10px] uppercase tracking-widest text-background/60 mb-1">Voting ended</p>
            <h3 className="text-lg font-semibold tracking-tight mb-1">
              {winner ? `Winner: ${winner.name}` : "No clear winner"}
            </h3>
            <p className="text-xs text-background/70 mb-4">
              {winner ? winner.why : "Try expanding constraints or pick a random."}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { if (winner) { confirm(winner.id); nav({ to: "/go" }); } else nav({ to: "/no-match" }); }}
                className="py-3 rounded-2xl bg-background text-foreground text-sm font-medium active:scale-[0.98]"
              >
                {winner ? "Confirm plan" : "Pick anyway"}
              </button>
              <button
                onClick={() => nav({ to: "/no-match" })}
                className="py-3 rounded-2xl ring-1 ring-background/30 text-sm font-medium active:scale-[0.98]"
              >
                No match
              </button>
            </div>
          </div>
        </div>
      )}

      <ChatDrawer />
    </MobileShell>
  );
}