import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileShell, PrimaryButton, SecondaryButton } from "@/components/MobileShell";

export const Route = createFileRoute("/conflict")({
  component: Conflict,
});

function Conflict() {
  const nav = useNavigate();
  return (
    <MobileShell back="/results" title="No perfect match">
      <section className="px-6 pt-2">
        <div className="size-16 rounded-full bg-muted grid place-items-center mx-auto my-6 text-2xl">⌖</div>
        <h1 className="text-2xl font-semibold tracking-tight text-center mb-2">Constraints are too tight</h1>
        <p className="text-sm text-muted-foreground text-center max-w-xs mx-auto mb-6">
          Júlia wants free + indoor + nearby, but Marc wants scenic + outdoor + 15km away. These don't fully overlap.
        </p>

        <ul className="space-y-2 mb-8">
          <li className="p-3 bg-surface ring-1 ring-border rounded-2xl text-xs flex justify-between">
            <span>Budget</span><span className="text-muted-foreground">Free vs €€</span>
          </li>
          <li className="p-3 bg-surface ring-1 ring-border rounded-2xl text-xs flex justify-between">
            <span>Environment</span><span className="text-muted-foreground">Indoor vs Outdoor</span>
          </li>
          <li className="p-3 bg-surface ring-1 ring-border rounded-2xl text-xs flex justify-between">
            <span>Distance</span><span className="text-muted-foreground">&lt;1km vs 15km</span>
          </li>
        </ul>
      </section>

      <div className="px-6 space-y-2">
        <PrimaryButton as="link" to="/compromise">Show compromises</PrimaryButton>
        <SecondaryButton onClick={() => nav({ to: "/activity/$id", params: { id: "ciutadella" } })}>Choose random</SecondaryButton>
        <SecondaryButton as="link" to="/prefs">Retry preferences</SecondaryButton>
        <SecondaryButton as="link" to="/chat">Open chat</SecondaryButton>
      </div>
    </MobileShell>
  );
}