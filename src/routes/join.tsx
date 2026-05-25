import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, PrimaryButton, SecondaryButton } from "@/components/MobileShell";

export const Route = createFileRoute("/join")({
  component: Join,
});

function Join() {
  const [link, setLink] = useState("radar.ai/p/9F2-bcn");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const join = () => {
    if (!link.trim()) return setErr("Paste an invite link to continue.");
    nav({ to: "/lobby" });
  };
  return (
    <MobileShell back="/" title="Join plan">
      <section className="px-6 pt-2">
        <h1 className="text-3xl font-semibold tracking-tight leading-tight mb-2">Join a plan</h1>
        <p className="text-sm text-muted-foreground mb-8">Paste the invite link your friend sent.</p>

        <label className="block mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Invite link</span>
          <input
            value={link}
            onChange={(e) => { setLink(e.target.value); setErr(""); }}
            placeholder="radar.ai/p/…"
            className="mt-2 w-full bg-surface ring-1 ring-border rounded-2xl px-4 py-4 text-base outline-none focus:ring-primary/40"
          />
        </label>
        {err && <p className="text-xs text-destructive mb-2">{err}</p>}

        <div className="mt-6 space-y-2">
          <PrimaryButton onClick={join}>Join</PrimaryButton>
          <SecondaryButton onClick={() => nav({ to: "/" })}>Cancel</SecondaryButton>
        </div>

        <div className="mt-10 p-4 bg-surface ring-1 ring-border rounded-2xl">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Tip</p>
          <p className="text-xs leading-relaxed text-foreground/80">
            Don't have a link? Ask a friend to share theirs from the lobby, or start your own plan.
          </p>
        </div>
      </section>
    </MobileShell>
  );
}