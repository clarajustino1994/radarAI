import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, PrimaryButton, Chip } from "@/components/MobileShell";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/create")({
  component: CreatePlan,
});

function CreatePlan() {
  const { plan, setName, setLocation} = usePlan();
  return (
    <MobileShell back="/" title="Step · Plan">
      <section className="px-6 pt-2">
        <h1 className="text-3xl font-semibold tracking-tight leading-tight mb-2">New plan</h1>
        <p className="text-sm text-muted-foreground mb-6">Name it (or don't). Confirm location and how far you'll travel.</p>

        <label className="block mb-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Plan name</span>
          <input
            value={plan.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Outdoor plan"
            className="mt-2 w-full bg-surface ring-1 ring-border rounded-2xl px-4 py-4 text-base outline-none focus:ring-primary/40"
          />
        </label>

        <label className="block mb-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Location</span>
          <div className="mt-2 relative">
            <input
              value={plan.location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-surface ring-1 ring-border rounded-2xl px-4 py-4 pr-24 text-base outline-none focus:ring-primary/40"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full">● GPS</span>
          </div>
        </label>
      </section>

      <div className="px-6 mt-6">
        <PrimaryButton as="link" to="/invite">Continue</PrimaryButton>
      </div>
    </MobileShell>
  );
}