import { a4 as useRouter, J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { L as Link, a as usePlan } from "./router-CL_PJO0p.js";
function useLocation(opts) {
  const router = useRouter();
  {
    const location = router.stores.location.get();
    return location;
  }
}
function MobileShell({
  children,
  back,
  title,
  rightSlot,
  hideNav
}) {
  const loc = useLocation();
  const isHome = loc.pathname === "/";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[440px] min-h-screen bg-background relative pb-20", children: [
    (back || title || rightSlot) && /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex items-center justify-between gap-3 px-5 pt-5 pb-3 bg-background/85 backdrop-blur-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        back && !isHome && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: back,
            className: "size-9 rounded-full bg-surface ring-1 ring-border flex items-center justify-center active:scale-95 transition-transform",
            "aria-label": "Back",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none", children: "‹" })
          }
        ),
        title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground", children: title })
      ] }),
      rightSlot
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "animate-slide-up pb-32", children }),
    !hideNav && /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] }) });
}
function BottomNav() {
  const loc = useLocation();
  const { plan } = usePlan();
  const tabs = [
    { to: "/", label: "Plan", icon: "◎" },
    { to: "/chat", label: "Chat", icon: "✦", badge: plan.chatUnread },
    { to: "/history", label: "History", icon: "❍" }
  ];
  const isActive = (to) => {
    if (to === "/") return ["/", "/create", "/invite", "/lobby", "/prefs", "/results", "/summary", "/feedback", "/go", "/no-match", "/conflict", "/compromise", "/welcome", "/join"].includes(loc.pathname) || loc.pathname.startsWith("/activity");
    return loc.pathname === to || loc.pathname.startsWith(to + "/");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40 px-4 pb-4 pt-2 bg-gradient-to-t from-background via-background/95 to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-foreground text-background rounded-full px-2 py-2 flex items-center justify-around shadow-lift", children: tabs.map((t) => {
    const active = isActive(t.to);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: t.to,
        className: `relative flex-1 flex flex-col items-center gap-0.5 py-2 rounded-full transition-all ${active ? "bg-background text-foreground" : "text-background/70"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: t.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium tracking-wide", children: t.label }),
          !!t.badge && t.badge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1 right-1/4 bg-accent text-foreground text-[9px] font-bold rounded-full px-1.5 py-0.5 min-w-4 text-center", children: t.badge })
        ]
      },
      t.to
    );
  }) }) });
}
function WeatherBanner({ compact }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 ${compact ? "px-3 py-2" : "px-4 py-3"} bg-accent/10 ring-1 ring-accent/30 rounded-2xl`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "☀️" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium leading-tight", children: "22°C in El Born" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-tight", children: "Outdoor stays prioritised" })
    ] })
  ] });
}
function SegFlex({ value, onChange }) {
  const opts = ["Strict", "Flexible", "Open"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex bg-accent/15 ring-1 ring-accent/30 rounded-full p-0.5 text-[11px]", children: opts.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: () => onChange(o),
      className: `px-3 py-1 rounded-full font-medium transition-all ${value === o ? "bg-accent text-foreground shadow-soft" : "text-accent-foreground/70"}`,
      children: o
    },
    o
  )) });
}
function Brandmark() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-8 rounded-full bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-2 rounded-full bg-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Radar AI // BCN" })
  ] });
}
function PrimaryButton({
  children,
  onClick,
  as,
  to,
  disabled
}) {
  const cls = "w-full py-4 bg-foreground text-background rounded-3xl font-medium text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-40 disabled:pointer-events-none";
  if (as === "link" && to)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: cls, children });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, disabled, className: cls, children });
}
function SecondaryButton({
  children,
  onClick,
  as,
  to
}) {
  const cls = "w-full py-4 bg-surface ring-1 ring-border text-foreground rounded-3xl font-medium text-base active:scale-[0.98] transition-transform";
  if (as === "link" && to)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: cls, children });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick, className: cls, children });
}
function Chip({
  label,
  sub,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick,
      className: `px-4 py-4 rounded-2xl text-left transition-all active:scale-[0.97] ${active ? "bg-primary text-primary-foreground shadow-soft" : "bg-surface ring-1 ring-border text-foreground hover:ring-primary/30"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: label }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[11px] leading-tight mt-0.5 ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`, children: sub })
      ]
    }
  );
}
function MiniChip({ label, active, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick,
      className: `px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${active ? "bg-foreground text-background" : "bg-surface ring-1 ring-border text-foreground"}`,
      children: label
    }
  );
}
export {
  Brandmark as B,
  Chip as C,
  MiniChip as M,
  PrimaryButton as P,
  SecondaryButton as S,
  WeatherBanner as W,
  MobileShell as a,
  SegFlex as b
};
