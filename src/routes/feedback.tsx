import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileShell, PrimaryButton, MiniChip } from "@/components/MobileShell";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/feedback")({
  component: Feedback,
});

const TAGS = ["Great choice", "Too far", "Too expensive", "Wrong vibe", "Weather ruined it"];

function Feedback() {
  const { plan, setRating, toggleTag, reset } = usePlan();
  const nav = useNavigate();
  return (
    <MobileShell back="/summary" title="Feedback · learning">
      <section className="px-6 pt-2">
        <h1 className="text-3xl font-semibold tracking-tight mb-1">How was it?</h1>
        <p className="text-sm text-muted-foreground mb-8">Helps Radar learn what your group loves.</p>

        <div className="flex justify-center gap-2 mb-8">
          {[1,2,3,4,5].map((n) => (
            <button
              key={n}
              onClick={() => setRating(n)}
              className={`size-12 rounded-2xl grid place-items-center text-2xl transition-all active:scale-90 ${
                (plan.rating ?? 0) >= n ? "bg-accent text-foreground" : "bg-surface ring-1 ring-border text-muted-foreground"
              }`}
            >★</button>
          ))}
        </div>

        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Tag the experience</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map((t) => (
            <MiniChip key={t} label={t} active={plan.feedbackTags?.includes(t)} onClick={() => toggleTag(t)} />
          ))}
        </div>
      </section>

      <div className="px-6">
        <PrimaryButton onClick={() => { reset(); nav({ to: "/history" }); }}>Save & finish</PrimaryButton>
      </div>
    </MobileShell>
  );
}
