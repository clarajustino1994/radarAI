import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileShell, PrimaryButton, SecondaryButton } from "@/components/MobileShell";
import { usePlan } from "@/lib/plan-store";

export const Route = createFileRoute("/no-match")({
  component: NoMatch,
});

function NoMatch() {
  const { setPref, setFlex } = usePlan();
  const nav = useNavigate();
  return (
    <MobileShell back="/results" title="No overlap">
      <section className="px-6 pt-2 text-center">
        <div className="size-16 rounded-full bg-muted grid place-items-center mx-auto my-6 text-2xl">◷</div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">No overlap right now</h1>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-8">
          Two friends can't make it before 7pm, and most picks are closing. Try widening the window.
        </p>
      </section>

      <div className="px-6 space-y-2">
        <PrimaryButton onClick={() => { setPref("timeWindow", "This evening"); nav({ to: "/results" }); }}>
          Expand to this evening
        </PrimaryButton>
        <SecondaryButton onClick={() => { setFlex("distance", "Open"); nav({ to: "/results" }); }}>
          Relax distance
        </SecondaryButton>
        <SecondaryButton onClick={() => { setFlex("budget", "Open"); nav({ to: "/results" }); }}>
          Relax budget
        </SecondaryButton>
        <SecondaryButton onClick={() => nav({ to: "/activity/$id", params: { id: "ciutadella" } })}>
          Choose random
        </SecondaryButton>
        <SecondaryButton as="link" to="/chat">Open chat</SecondaryButton>
      </div>
    </MobileShell>
  );
}