import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { HISTORY } from "@/lib/sample-data";

export const Route = createFileRoute("/history")({
  component: History,
});

function History() {
  return (
    <MobileShell back="/" title="History">
      <section className="px-6 pt-2">
        <h1 className="text-3xl font-semibold tracking-tight mb-1">Past plans</h1>
        <p className="text-sm text-muted-foreground mb-6">Tap any to revisit the summary.</p>

        <div className="space-y-2">
          {HISTORY.map((h) => (
            <Link
              key={h.id}
              to="/summary"
              className="flex items-center gap-4 p-4 bg-surface ring-1 ring-border rounded-2xl active:scale-[0.99] transition-transform"
            >
              <div className="size-12 rounded-xl bg-primary/10 grid place-items-center text-xl">🌅</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{h.name}</p>
                <p className="text-[11px] text-muted-foreground">{h.activity} · {h.date} · {h.people} friends</p>
              </div>
              <span className="font-mono text-xs text-accent">★ {h.rating}.0</span>
            </Link>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
