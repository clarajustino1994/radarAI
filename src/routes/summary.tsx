import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, PrimaryButton, SecondaryButton } from "@/components/MobileShell";
import { ACTIVITIES } from "@/lib/sample-data";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/summary")({
  component: Summary,
});

function Summary() {
  const { plan } = usePlan();
  const a = ACTIVITIES.find((x) => x.id === (plan.confirmedId ?? "bunkers")) ?? ACTIVITIES[0];

  return (
    <MobileShell back="/go" title="Plan confirmed">
      <section className="px-6 pt-2 text-center">
        <div className="size-14 rounded-full bg-primary/15 grid place-items-center mx-auto mb-5">
          <span className="text-primary text-2xl">✓</span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">Locked in</p>
        <h1 className="text-3xl font-semibold tracking-tight mb-1">{a.name}</h1>
        <p className="text-sm text-muted-foreground mb-8">{plan.prefs.timeWindow ?? "This evening"} · {a.address}</p>

        <div className="bg-surface ring-1 ring-border rounded-3xl p-5 text-left mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 rounded-2xl bg-primary/10 grid place-items-center text-2xl">{a.emoji}</div>
            <div>
              <p className="font-medium text-sm">{a.category}</p>
              <p className="text-[11px] text-muted-foreground">{a.distanceKm} km · {a.travelMin} min</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-foreground/80 border-l-2 border-accent pl-3">{a.why}</p>
        </div>

        <div className="flex -space-x-2 justify-center mb-8">
          {["Y","M","J","P"].map((c, i) => (
            <div key={i} className={`size-9 rounded-full grid place-items-center text-xs font-bold ring-2 ring-background ${
              ["bg-primary text-primary-foreground","bg-accent text-foreground","bg-emerald-500 text-white","bg-sky-500 text-white"][i]
            }`}>{c}</div>
          ))}
        </div>
      </section>

      <div className="px-6 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <SecondaryButton onClick={() => alert("Mock: share sheet")}>Share</SecondaryButton>
          <SecondaryButton onClick={() => alert("Mock: added to calendar")}>+ Calendar</SecondaryButton>
        </div>
        <PrimaryButton as="link" to="/feedback">End session & rate</PrimaryButton>
        <Link to="/" className="block text-center text-xs text-muted-foreground pt-2 underline underline-offset-4">
          Back home
        </Link>
      </div>
    </MobileShell>
  );
}
