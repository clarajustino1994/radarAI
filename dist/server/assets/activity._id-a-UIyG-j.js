import { J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { R as Route, A as ACTIVITIES, a as usePlan, u as useNavigate, L as Link } from "./router-CL_PJO0p.js";
import { a as MobileShell, P as PrimaryButton, S as SecondaryButton } from "./MobileShell-c16SjN77.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const budgetLabel = (b) => b === 0 ? "Free" : "€".repeat(b);
function ActivityDetail() {
  const {
    id
  } = Route.useParams();
  const a = ACTIVITIES.find((x) => x.id === id) ?? ACTIVITIES[0];
  const {
    confirm
  } = usePlan();
  const nav = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { back: "/results", title: a.category, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary/20 via-accent/15 to-primary/5 grid place-items-center mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-40", style: {
          backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.1), transparent 40%)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-2", children: a.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-foreground/60", children: "Map preview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full opacity-20", "aria-hidden": true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: "g", width: "32", height: "32", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 32 0 L 0 0 0 32", fill: "none", stroke: "currentColor", strokeWidth: "0.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#g)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 right-3 bg-background/90 backdrop-blur rounded-xl px-3 py-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] truncate", children: a.address }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-primary", children: "● Pin" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: a.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1 mb-5", children: [
        a.distanceKm,
        " km · ",
        a.travelMin,
        " min · ",
        budgetLabel(a.budget),
        " · ",
        a.open ? "Open now" : "Closed"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-2xl p-4 border-l-2 border-accent mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-accent mb-1", children: "Why recommended" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: a.why })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Hours", v: a.hours }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Price", v: budgetLabel(a.budget) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Transport", v: a.transport }),
        a.outdoor && a.weather && /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Weather", v: `${a.weather.temp}° · ${a.weather.cond}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface ring-1 ring-border rounded-2xl p-4 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2", children: "Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: a.address })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { onClick: () => {
        confirm(a.id);
        nav({
          to: "/go"
        });
      }, children: "Confirm this plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => alert("Mock: opening Maps…"), children: "Navigate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => alert("Mock: booking link…"), children: "Reserve" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/results", className: "block text-center text-xs text-muted-foreground pt-2 underline underline-offset-4", children: "Back to list" })
    ] })
  ] });
}
function Info({
  label,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface ring-1 ring-border rounded-2xl p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mt-0.5", children: v })
  ] });
}
export {
  ActivityDetail as component
};
