import { J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { a as MobileShell, S as SecondaryButton } from "./MobileShell-c16SjN77.js";
import { A as ActivityCard } from "./ActivityCard-D9YGaHWl.js";
import { A as ACTIVITIES } from "./router-CL_PJO0p.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Compromise() {
  const picks = [ACTIVITIES[1], ACTIVITIES[0], ACTIVITIES[4]];
  const reasons = ["Bends distance — still free and outdoor.", "Bends budget — perfect mood + atmosphere fit.", "Bends time — opens late but worth it."];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileShell, { back: "/conflict", title: "Best compromises", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 pt-2 pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight mb-1", children: "3 picks, one rule bent each" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Tap to see details, vote, or confirm." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: picks.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 font-mono text-[10px] uppercase tracking-widest text-accent", children: reasons[i] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityCard, { a, rank: i + 1 })
    ] }, a.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { as: "link", to: "/chat", children: "Discuss in chat" }) })
  ] }) });
}
export {
  Compromise as component
};
