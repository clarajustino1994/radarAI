import { J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { a as usePlan, A as ACTIVITIES, L as Link } from "./router-CL_PJO0p.js";
import { a as MobileShell, S as SecondaryButton, P as PrimaryButton } from "./MobileShell-c16SjN77.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Summary() {
  const {
    plan
  } = usePlan();
  const a = ACTIVITIES.find((x) => x.id === (plan.confirmedId ?? "bunkers")) ?? ACTIVITIES[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { back: "/go", title: "Plan confirmed", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-14 rounded-full bg-primary/15 grid place-items-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-2xl", children: "✓" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-primary mb-2", children: "Locked in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight mb-1", children: a.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-8", children: [
        plan.prefs.timeWindow ?? "This evening",
        " · ",
        a.address
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface ring-1 ring-border rounded-3xl p-5 text-left mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-2xl bg-primary/10 grid place-items-center text-2xl", children: a.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: a.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
              a.distanceKm,
              " km · ",
              a.travelMin,
              " min"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-foreground/80 border-l-2 border-accent pl-3", children: a.why })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2 justify-center mb-8", children: ["Y", "M", "J", "P"].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `size-9 rounded-full grid place-items-center text-xs font-bold ring-2 ring-background ${["bg-primary text-primary-foreground", "bg-accent text-foreground", "bg-emerald-500 text-white", "bg-sky-500 text-white"][i]}`, children: c }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => alert("Mock: share sheet"), children: "Share" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => alert("Mock: added to calendar"), children: "+ Calendar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { as: "link", to: "/feedback", children: "End session & rate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block text-center text-xs text-muted-foreground pt-2 underline underline-offset-4", children: "Back home" })
    ] })
  ] });
}
export {
  Summary as component
};
