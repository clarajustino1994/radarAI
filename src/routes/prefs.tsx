import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MobileShell, Chip, PrimaryButton, SegFlex } from "@/components/MobileShell";
import { toast } from "sonner";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/prefs")({
  component: Prefs,
});

const STEPS = [
  { key: "mood", title: "Mood / Energy", flexKey: undefined, options: [
    { v: "Relaxed", s: "😌 Quiet sun & breeze" },
    { v: "High energy", s: "⚡ Move & sweat" },
    { v: "Adventurous", s: "🌍 Hike & explore" },
    { v: "Social", s: "🤝 People & chatter" },
    { v: "Creative", s: "🎨 Inspiring spaces" },
  ] },
  { key: "atmosphere", title: "Preferred atmosphere", flexKey: undefined, options: [
    { v: "Lively", s: "Crowds & buzz" },
    { v: "Calm & secluded", s: "Few people" },
    { v: "Scenic", s: "Big views" },
    { v: "Local & authentic", s: "Off the path" },
    { v: "Family-friendly", s: "All ages" },
  ] },
  { key: "budget", title: "Budget", flexKey: "budget", options: [
    { v: "Free", s: "🆓 0 €" },
    { v: "€", s: "Under 10 €" },
    { v: "€€", s: "10–25 €" },
    { v: "€€€", s: "25 €+" },
  ] },
  { key: "timeWindow", title: "Availability", flexKey: "time", options: [
    { v: "Right now", s: "Within 1h" },
    { v: "This afternoon", s: "Until ~7pm" },
    { v: "This evening", s: "7pm onward" },
    { v: "This weekend", s: "Sat / Sun" },
  ] },
  { key: "io", title: "Environment", flexKey: "io", options: [
    { v: "Outdoor", s: "🌿 Default today" },
    { v: "Indoor", s: "🏠 If weather turns" },
    { v: "No preference", s: "🔀 Surprise me" },
  ] },
] as const;

function Prefs() {
  const nav = useNavigate();
  const { plan, setPref, setFlex, submit } = usePlan();
  const [step, setStep] = useState(0); // 0..4 chips, 5 review
  const total = 5;
  const [secs, setSecs] = useState(30);
  const submittedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (secs === 0 && !submittedRef.current) {
      submittedRef.current = true;
      submit();
      toast.success("Time's up — submitted with your current picks ✓");
      nav({ to: "/results" });
    }
  }, [secs, submit, nav]);

  const handleSubmit = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    submit();
    toast.success("Submitted ✓ Waiting for others…");
    nav({ to: "/results" });
  };

  const next = () => (step < total ? setStep(step + 1) : handleSubmit());
  const back = () => (step > 0 ? setStep(step - 1) : nav({ to: "/lobby" }));

  const progress = Math.min(step + 1, total);

  return (
    <MobileShell title={step < total ? `Step ${progress} of ${total}` : "Review"}>
      <div className="px-5 pt-1">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={back} className="size-9 rounded-full bg-surface ring-1 ring-border grid place-items-center active:scale-95">
            <span className="text-lg leading-none">‹</span>
          </button>
          <div className="flex gap-1.5 flex-1">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < progress ? "bg-primary" : "bg-primary/10"}`} />
            ))}
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono ring-1 ${secs <= 10 ? "bg-destructive/10 ring-destructive/30 text-destructive" : "bg-surface ring-border text-muted-foreground"}`}>
            <span>⏱</span><span>{secs}s</span>
          </div>
        </div>

        {step <= 4 && (
          <ChipStep stepIndex={step} setPref={setPref} setFlex={setFlex} prefs={plan.prefs} onAuto={next} />
        )}

        {step === 5 && <Review plan={plan} />}
      </div>

      <div className="px-5 mt-6">
        <PrimaryButton onClick={next}>
          {step < 4 ? "Continue" : step === 4 ? "Review" : "Submit preferences"}
        </PrimaryButton>
      </div>
    </MobileShell>
  );
}

function ChipStep({
  stepIndex,
  setPref,
  setFlex,
  prefs,
  onAuto,
}: {
  stepIndex: number;
  setPref: ReturnType<typeof usePlan>["setPref"];
  setFlex: ReturnType<typeof usePlan>["setFlex"];
  prefs: ReturnType<typeof usePlan>["plan"]["prefs"];
  onAuto: () => void;
}) {
  const step = STEPS[stepIndex];
  const valueKey = step.key as "mood" | "atmosphere" | "budget" | "io" | "timeWindow";
  const current = prefs[valueKey];
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight mb-1">{step.title}</h1>
      <p className="text-sm text-muted-foreground mb-4">Pick one — tap fast.</p>

      {step.key === "io" && (
        <div className="bg-accent/10 ring-1 ring-accent/30 rounded-2xl px-4 py-3 mb-4 text-xs leading-snug flex items-start gap-2">
          <span>☀️</span>
          <p>22°C in El Born — we'll prioritise outdoor options, but you can still pick indoor.</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {step.options.map((o) => (
          <Chip
            key={o.v}
            label={o.v}
            sub={o.s}
            active={current === o.v}
            onClick={() => {
              setPref(valueKey, o.v);
              setTimeout(onAuto, 200);
            }}
          />
        ))}
      </div>

      {step.flexKey && (
        <div className="mt-5 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Flexibility</p>
          <SegFlex
            value={prefs.flex[step.flexKey as keyof typeof prefs.flex]}
            onChange={(v) => setFlex(step.flexKey as keyof typeof prefs.flex, v)}
          />
        </div>
      )}
    </div>
  );
}

function Review({ plan }: { plan: ReturnType<typeof usePlan>["plan"] }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight mb-1">Looks good?</h1>
      <p className="text-sm text-muted-foreground mb-5">Submit and see what Radar finds.</p>
      <div className="bg-surface ring-1 ring-border rounded-3xl p-5 space-y-3">
        <Row label="Mood" v={plan.prefs.mood} />
        <Row label="Atmosphere" v={plan.prefs.atmosphere} />
        <Row label="Budget" v={plan.prefs.budget} extra={plan.prefs.flex.budget} />
        <Row label="Time" v={plan.prefs.timeWindow} extra={plan.prefs.flex.time} />
        <Row label="Environment" v={plan.prefs.io} extra={plan.prefs.flex.io} />
        <Row label="Distance" v={plan.prefs.distance ?? plan.initialDistance} extra={plan.prefs.flex.distance} />
      </div>
    </div>
  );
}

function Row({ label, v, extra }: { label: string; v?: string; extra?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-sm font-medium flex items-center gap-2">
        {v ?? "No preference"}
        {extra && <span className="text-[10px] font-mono bg-accent/15 text-accent-foreground/70 px-2 py-0.5 rounded-full">{extra}</span>}
      </span>
    </div>
  );
}