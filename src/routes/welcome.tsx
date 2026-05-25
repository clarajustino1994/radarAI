import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MobileShell, PrimaryButton } from "@/components/MobileShell";

export const Route = createFileRoute("/welcome")({
  component: Welcome,
});

const STEPS = [
  { n: "01", t: "Create plan", s: "Time, place and a few friends." },
  { n: "02", t: "Set preferences", s: "Tap chips. Done in 30 seconds." },
  { n: "03", t: "Vote & confirm", s: "Group picks, you go." },
];

function Welcome() {
  const nav = useNavigate();
  return (
    <MobileShell hideNav>
      <section className="px-6 pt-14 pb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Radar AI · welcome</p>
        <h1 className="text-[40px] leading-[1.02] font-semibold tracking-tight mb-3">
          Decide faster,<br />together.
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          One place to plan with friends — no group-chat back-and-forth.
        </p>

        <ol className="space-y-3 mb-10">
          {STEPS.map((s) => (
            <li key={s.n} className="flex items-start gap-4 p-4 bg-surface ring-1 ring-border rounded-2xl">
              <span className="font-mono text-[11px] text-primary">{s.n}</span>
              <div>
                <p className="font-medium text-sm">{s.t}</p>
                <p className="text-xs text-muted-foreground">{s.s}</p>
              </div>
            </li>
          ))}
        </ol>

        <PrimaryButton onClick={() => { try { localStorage.setItem("radar.onboarded", "1"); } catch {} nav({ to: "/create" }); }}>
          Start a plan
        </PrimaryButton>
        <label className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <input type="checkbox" onChange={(e) => { try { localStorage.setItem("radar.dontShow", e.target.checked ? "1" : ""); } catch {} }} className="size-4 accent-foreground" />
          Don't show again
        </label>
        <Link to="/" className="block mt-4 text-center text-xs text-muted-foreground underline underline-offset-4">
          Skip to home
        </Link>
      </section>
    </MobileShell>
  );
}