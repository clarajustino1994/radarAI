import { Link } from "@tanstack/react-router";
import type { Activity } from "@/lib/sample-data";
import { usePlan } from "@/lib/plan-store";

const budgetLabel = (b: number) => (b === 0 ? "Free" : "€".repeat(b));

export function ActivityCard({ a, rank }: { a: Activity; rank: number }) {
  const { plan, vote } = usePlan();
  const v = plan.votes[a.id] ?? { up: 0, down: 0 };
  return (
    <article className="bg-surface rounded-[2rem] ring-1 ring-border overflow-hidden shadow-soft">
      <Link to="/activity/$id" params={{ id: a.id }} className="block">
        <div className="relative w-full aspect-[5/3] bg-gradient-to-br from-primary/15 via-accent/15 to-primary/5 grid place-items-center">
          <span className="text-5xl">{a.emoji}</span>
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest bg-foreground text-background px-2 py-0.5 rounded-full">
              #{rank}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest bg-background/85 text-foreground px-2 py-0.5 rounded-full">
              {a.outdoor ? "Outdoor" : "Indoor"}
            </span>
          </div>
          <div className="absolute top-3 right-3 bg-background/85 text-foreground px-2 py-0.5 rounded-full text-[10px] font-mono">
            {a.groupFit}% fit
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-base tracking-tight">{a.name}</h3>
            <p className="text-xs text-muted-foreground">
              {a.category} · {a.distanceKm} km · {a.travelMin} min
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-medium">{budgetLabel(a.budget)}</p>
            <p className={`text-[10px] font-mono ${a.open ? "text-primary" : "text-muted-foreground"}`}>
              {a.open ? "OPEN" : "CLOSED"}
            </p>
          </div>
        </div>

        <div className="bg-muted rounded-2xl p-3 border-l-2 border-accent">
          <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-0.5">Why recommended</p>
          <p className="text-xs leading-relaxed text-foreground/80">{a.why}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => vote(a.id, "up")}
            className={`flex-1 py-2.5 rounded-2xl ring-1 text-sm font-medium transition-all active:scale-[0.97] ${
              v.mine === "up"
                ? "bg-primary text-primary-foreground ring-primary"
                : "bg-background ring-border text-foreground"
            }`}
          >
            <span className="inline-block animate-pop" key={`u-${v.up}`}>👍</span>
            <span className="ml-1.5 font-mono text-xs">{v.up}</span>
          </button>
          <button
            onClick={() => vote(a.id, "down")}
            className={`flex-1 py-2.5 rounded-2xl ring-1 text-sm font-medium transition-all active:scale-[0.97] ${
              v.mine === "down"
                ? "bg-foreground text-background ring-foreground"
                : "bg-background ring-border text-foreground"
            }`}
          >
            <span className="inline-block animate-pop" key={`d-${v.down}`}>👎</span>
            <span className="ml-1.5 font-mono text-xs">{v.down}</span>
          </button>
        </div>
      </div>
    </article>
  );
}