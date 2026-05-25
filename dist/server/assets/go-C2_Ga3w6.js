import { J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { a as MobileShell, P as PrimaryButton, S as SecondaryButton } from "./MobileShell-c16SjN77.js";
import { a as usePlan, A as ACTIVITIES } from "./router-CL_PJO0p.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function RouteScreen() {
  const {
    plan
  } = usePlan();
  const a = ACTIVITIES.find((x) => x.id === (plan.confirmedId ?? "bunkers")) ?? ACTIVITIES[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { back: "/results", title: "On the way", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden ring-1 ring-border bg-gradient-to-br from-primary/15 to-accent/10 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full opacity-30", "aria-hidden": true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: "grid", width: "28", height: "28", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 28 0 L 0 0 0 28", fill: "none", stroke: "currentColor", strokeWidth: "0.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#grid)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 30 280 C 100 200, 180 220, 280 80", stroke: "oklch(0.55 0.075 155)", strokeWidth: "3", fill: "none", strokeDasharray: "6 6" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 left-4 bg-background/90 backdrop-blur rounded-xl px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "From" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: plan.location })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 right-4 bg-foreground text-background rounded-xl px-3 py-2 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest opacity-60", children: "To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: a.name })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "ETA", v: `${a.travelMin}m` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "Distance", v: `${a.distanceKm} km` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "Transport", v: a.transport.split(" ")[0] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-surface ring-1 ring-border rounded-2xl mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1", children: "Step by step" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "text-sm space-y-1 list-decimal pl-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Walk to ",
            plan.location.split(",")[0],
            " stop"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: a.transport }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "Arrive at ",
            a.name
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { as: "link", to: "/summary", children: "I've arrived" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => alert("Mock: opening Maps…"), children: "Open in Maps" })
    ] })
  ] });
}
function Stat({
  k,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-surface ring-1 ring-border rounded-2xl text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mt-0.5", children: v })
  ] });
}
export {
  RouteScreen as component
};
