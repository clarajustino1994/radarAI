import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { MobileShell, Brandmark, PrimaryButton } from "@/components/MobileShell";
import { HISTORY } from "@/lib/sample-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Radar AI — Decide faster, together" },
      { name: "description", content: "Plan outdoor and indoor outings in Spain with friends. Tap-fast preferences, ranked picks, vote, confirm — all in one app." },
    ],
  }),
  component: Home,
});

const ACTIVE = [
  { id: "a1", name: "Outdoor plan · El Born", people: 4, status: "Voting open · 2 picks tied" },
  { id: "a2", name: "Sunday brunch crew", people: 3, status: "Waiting for Pau" },
];

function Home() {
  const nav = useNavigate();
  useEffect(() => {
    try {
      if (!localStorage.getItem("radar.onboarded") && !localStorage.getItem("radar.dontShow")) {
        nav({ to: "/welcome" });
      }
    } catch {}
  }, [nav]);

  return (
    <MobileShell>
      <section className="px-6 pt-8 pb-6">
        <div className="flex justify-between items-start mb-8">
          <Brandmark />
          <Link to="/welcome" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground active:text-foreground">
            About →
          </Link>
        </div>

        {/* <WeatherBanner /> */}

        <h1 className="text-[40px] font-semibold tracking-tight leading-[1.02] mt-6 mb-8">
          Find your<br />horizon...
        </h1>

        <div className="space-y-3">
          <Link to="/join" className="block text-right font-semibold text-sm active:opacity-70" style={{ color: "oklch(0.74 0.12 50)" }}>
            Join plan →
          </Link>
          <PrimaryButton as="link" to="/create">Start a plan</PrimaryButton>
        </div>
      </section>

      <section className="px-6 mb-6">
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-sm font-semibold tracking-tight">Active plans</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Tap one to rejoin</span>
        </div>
        <div className="space-y-2">
          {ACTIVE.map((a) => (
            <Link key={a.id} to="/lobby" className="flex items-center gap-3 p-4 bg-surface ring-1 ring-border rounded-2xl active:scale-[0.99] transition-transform">
              <div className="size-11 rounded-2xl bg-primary/10 grid place-items-center text-lg">◉</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{a.name}</p>
                <p className="text-[11px] text-muted-foreground truncate">{a.people} friends · {a.status}</p>
              </div>
              <span className="text-xs text-primary">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6">
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-sm font-semibold tracking-tight">Recent plans</h2>
          <Link to="/history" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">See all</Link>
        </div>
        <div className="space-y-2">
          {HISTORY.slice(0, 2).map((h) => (
            <Link key={h.id} to="/summary" className="flex items-center gap-4 p-4 bg-surface ring-1 ring-border rounded-2xl active:scale-[0.99] transition-transform">
              <div className="size-12 rounded-xl bg-accent/15 grid place-items-center text-xl">🌅</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{h.name}</p>
                <p className="text-[11px] text-muted-foreground">{h.date} · {h.people} friends</p>
              </div>
              <span className="font-mono text-xs text-accent">★ {h.rating}.0</span>
            </Link>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}