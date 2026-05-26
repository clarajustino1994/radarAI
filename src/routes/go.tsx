import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, PrimaryButton, SecondaryButton } from "@/components/MobileShell";
import { ACTIVITIES } from "@/lib/sample-data";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/go")({
  component: RouteScreen,
});

function RouteScreen() {
  const { plan } = usePlan();
  const a = ACTIVITIES.find((x) => x.id === (plan.confirmedId ?? "bunkers")) ?? ACTIVITIES[0];
  return (
    <MobileShell back="/results" title="On the way">
      <section className="px-5 pt-2">
        <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden ring-1 ring-border bg-gradient-to-br from-primary/15 to-accent/10 mb-4">
          <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden>
            <defs>
              <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M 30 280 C 100 200, 180 220, 280 80" stroke="oklch(0.55 0.075 155)" strokeWidth="3" fill="none" strokeDasharray="6 6" />
          </svg>
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur rounded-xl px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">From</p>
            <p className="text-xs font-medium">{plan.location}</p>
          </div>
          <div className="absolute bottom-4 right-4 bg-foreground text-background rounded-xl px-3 py-2 text-right">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">To</p>
            <p className="text-xs font-medium">{a.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <Stat k="ETA" v={`${a.travelMin}m`} />
          <Stat k="Distance" v={`${a.distanceKm} km`} />
          <Stat k="Transport" v={a.transport.split(" ")[0]} />
        </div>

        <div className="p-4 bg-surface ring-1 ring-border rounded-2xl mb-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Step by step</p>
          <ol className="text-sm space-y-1 list-decimal pl-4">
            <li>Walk to {plan.location.split(",")[0]} stop</li>
            <li>{a.transport}</li>
            <li>Arrive at {a.name}</li>
          </ol>
        </div>
      </section>

      <div className="px-5 space-y-2">
        <PrimaryButton as="link" to="/summary">I've arrived</PrimaryButton>
      </div>
    </MobileShell>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="p-3 bg-surface ring-1 ring-border rounded-2xl text-center">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k}</p>
      <p className="text-sm font-semibold mt-0.5">{v}</p>
    </div>
  );
}