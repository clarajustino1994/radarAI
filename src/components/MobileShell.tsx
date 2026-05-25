import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { usePlan } from "@/lib/plan-store";

export function MobileShell({
  children,
  back,
  title,
  rightSlot,
  hideNav,
}: {
  children: ReactNode;
  back?: string;
  title?: string;
  rightSlot?: ReactNode;
  hideNav?: boolean;
}) {
  const loc = useLocation();
  const isHome = loc.pathname === "/";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[440px] min-h-screen bg-background relative pb-20">
        {(back || title || rightSlot) && (
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 px-5 pt-5 pb-3 bg-background/85 backdrop-blur-md">
            <div className="flex items-center gap-2">
              {back && !isHome && (
                <Link
                  to={back}
                  className="size-9 rounded-full bg-surface ring-1 ring-border flex items-center justify-center active:scale-95 transition-transform"
                  aria-label="Back"
                >
                  <span className="text-lg leading-none">‹</span>
                </Link>
              )}
              {title && <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{title}</p>}
            </div>
            {rightSlot}
          </header>
        )}
        <main className="animate-slide-up pb-32">{children}</main>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}

export function BottomNav() {
  const loc = useLocation();
  const { plan } = usePlan();
  const tabs: { to: string; label: string; icon: string; badge?: number }[] = [
    { to: "/", label: "Plan", icon: "◎" },
    { to: "/chat", label: "Chat", icon: "✦", badge: plan.chatUnread },
    { to: "/history", label: "History", icon: "❍" },
  ];
  const isActive = (to: string) => {
    if (to === "/") return ["/", "/create", "/invite", "/lobby", "/prefs", "/results", "/summary", "/feedback", "/go", "/no-match", "/conflict", "/compromise", "/welcome", "/join"].includes(loc.pathname) || loc.pathname.startsWith("/activity");
    return loc.pathname === to || loc.pathname.startsWith(to + "/");
  };
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40 px-4 pb-4 pt-2 bg-gradient-to-t from-background via-background/95 to-transparent">
      <div className="bg-foreground text-background rounded-full px-2 py-2 flex items-center justify-around shadow-lift">
        {tabs.map((t) => {
          const active = isActive(t.to);
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`relative flex-1 flex flex-col items-center gap-0.5 py-2 rounded-full transition-all ${
                active ? "bg-background text-foreground" : "text-background/70"
              }`}
            >
              <span className="text-base leading-none">{t.icon}</span>
              <span className="text-[10px] font-medium tracking-wide">{t.label}</span>
              {!!t.badge && t.badge > 0 && (
                <span className="absolute top-1 right-1/4 bg-accent text-foreground text-[9px] font-bold rounded-full px-1.5 py-0.5 min-w-4 text-center">
                  {t.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function WeatherBanner({ compact }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "px-3 py-2" : "px-4 py-3"} bg-accent/10 ring-1 ring-accent/30 rounded-2xl`}>
      <span className="text-xl">☀️</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-tight">22°C in El Born</p>
        <p className="text-[11px] text-muted-foreground leading-tight">Outdoor stays prioritised</p>
      </div>
    </div>
  );
}

export function SegFlex({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const opts = ["Strict", "Flexible", "Open"];
  return (
    <div className="inline-flex bg-accent/15 ring-1 ring-accent/30 rounded-full p-0.5 text-[11px]">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-3 py-1 rounded-full font-medium transition-all ${
            value === o ? "bg-accent text-foreground shadow-soft" : "text-accent-foreground/70"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function Brandmark() {
  return (
    <div className="flex items-center gap-2">
      <div className="size-8 rounded-full bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
        <div className="size-2 rounded-full bg-primary" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Radar AI // BCN</p>
    </div>
  );
}

export function StickyBottom({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40 px-5 pb-6 pt-8 bg-gradient-to-t from-background via-background to-transparent">
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  as,
  to,
  disabled,
  color = "bg-foreground",
}: {
  children: ReactNode;
  onClick?: () => void;
  as?: "link";
  to?: string;
  disabled?: boolean;
  color?: string;
}) {
  const cls =
    `w-full py-4 ${color} text-white rounded-3xl font-medium text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-40 disabled:pointer-events-none`;
  if (as === "link" && to)
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  as,
  to,
}: {
  children: ReactNode;
  onClick?: () => void;
  as?: "link";
  to?: string;
}) {
  const cls =
    "w-full py-4 bg-surface ring-1 ring-border text-foreground rounded-3xl font-medium text-base active:scale-[0.98] transition-transform";
  if (as === "link" && to)
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Chip({
  label,
  sub,
  active,
  onClick,
}: {
  label: string;
  sub?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-4 rounded-2xl text-left transition-all active:scale-[0.97] ${
        active
          ? "bg-primary text-primary-foreground shadow-soft"
          : "bg-surface ring-1 ring-border text-foreground hover:ring-primary/30"
      }`}
    >
      <p className="font-medium text-sm">{label}</p>
      {sub && <p className={`text-[11px] leading-tight mt-0.5 ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{sub}</p>}
    </button>
  );
}

export function MiniChip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
        active ? "bg-foreground text-background" : "bg-surface ring-1 ring-border text-foreground"
      }`}
    >
      {label}
    </button>
  );
}