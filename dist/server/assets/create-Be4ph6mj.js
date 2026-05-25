import { J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { a as MobileShell, C as Chip, P as PrimaryButton } from "./MobileShell-c16SjN77.js";
import { a as usePlan } from "./router-CL_PJO0p.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const DIST = [{
  v: "<1 km",
  s: "10–15 min walk 🚶"
}, {
  v: "1–5 km",
  s: "Bike or metro 🚲🚇"
}, {
  v: "5–15 km",
  s: "Metro / bus 🚇🚌"
}, {
  v: "15–30 km",
  s: "Car or train 🚗🚆"
}];
function CreatePlan() {
  const {
    plan,
    setName,
    setLocation,
    setInitialDistance
  } = usePlan();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { back: "/", title: "Step · Plan", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight leading-tight mb-2", children: "New plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Name it (or don't). Confirm location and how far you'll travel." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Plan name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: plan.name, onChange: (e) => setName(e.target.value), placeholder: "Outdoor plan", className: "mt-2 w-full bg-surface ring-1 ring-border rounded-2xl px-4 py-4 text-base outline-none focus:ring-primary/40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: plan.location, onChange: (e) => setLocation(e.target.value), className: "w-full bg-surface ring-1 ring-border rounded-2xl px-4 py-4 pr-24 text-base outline-none focus:ring-primary/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full", children: "● GPS" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2", children: "How far are you willing to go?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 mb-3", children: DIST.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { label: d.v, sub: d.s, active: plan.initialDistance === d.v, onClick: () => setInitialDistance(d.v) }, d.v)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mb-2", children: "You can adjust this in preferences." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { as: "link", to: "/invite", children: "Continue" }) })
  ] });
}
export {
  CreatePlan as component
};
