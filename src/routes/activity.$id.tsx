import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileShell, PrimaryButton, SecondaryButton } from "@/components/MobileShell";
import { ACTIVITIES } from "@/lib/sample-data";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/activity/$id")({
  component: ActivityDetail,
});

const budgetLabel = (b: number) => (b === 0 ? "Free" : "€".repeat(b));

function ActivityDetail() {
  const { id } = Route.useParams();
  const a = ACTIVITIES.find((x) => x.id === id) ?? ACTIVITIES[0];
  const { confirm } = usePlan();
  const nav = useNavigate();

  return (
    <MobileShell back="/results" title={a.category}>
      <section className="px-5 pt-2">
        <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary/20 via-accent/15 to-primary/5 grid place-items-center mb-5">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.1), transparent 40%)",
          }} />
          <div className="relative text-center">
            <div className="text-6xl mb-2">{a.emoji}</div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">Map preview</p>
          </div>
          {/* faux map gridlines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden>
            <defs>
              <pattern id="g" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>
          <div className="absolute bottom-3 left-3 right-3 bg-background/90 backdrop-blur rounded-xl px-3 py-2 flex items-center justify-between">
            <p className="text-[11px] truncate">{a.address}</p>
            <span className="font-mono text-[10px] text-primary">● Pin</span>
          </div>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">{a.name}</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-5">
          {a.distanceKm} km · {a.travelMin} min · {budgetLabel(a.budget)} · {a.open ? "Open now" : "Closed"}
        </p>

        <div className="bg-muted rounded-2xl p-4 border-l-2 border-accent mb-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-1">Why recommended</p>
          <p className="text-sm leading-relaxed">{a.why}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <Info label="Hours" v={a.hours} />
          <Info label="Price" v={budgetLabel(a.budget)} />
          <Info label="Transport" v={a.transport} />
          {a.outdoor && a.weather && <Info label="Weather" v={`${a.weather.temp}° · ${a.weather.cond}`} />}
        </div>

        <div className="bg-surface ring-1 ring-border rounded-2xl p-4 mb-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Address</p>
          <p className="text-sm">{a.address}</p>
        </div>
      </section>

      <div className="px-5 space-y-2">
        <PrimaryButton onClick={() => { confirm(a.id); nav({ to: "/go" }); }}>Confirm this plan</PrimaryButton>
        <div className="grid grid-cols-2 gap-2">
          <SecondaryButton onClick={() => alert("Mock: opening Maps…")}>Navigate</SecondaryButton>
          <SecondaryButton onClick={() => alert("Mock: booking link…")}>Reserve</SecondaryButton>
        </div>
        <Link to="/results" className="block text-center text-xs text-muted-foreground pt-2 underline underline-offset-4">
          Back to list
        </Link>
      </div>
    </MobileShell>
  );
}

function Info({ label, v }: { label: string; v: string }) {
  return (
    <div className="bg-surface ring-1 ring-border rounded-2xl p-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-sm font-medium mt-0.5">{v}</p>
    </div>
  );
}
