import { J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { a as usePlan, u as useNavigate } from "./router-CL_PJO0p.js";
import { a as MobileShell, M as MiniChip, P as PrimaryButton } from "./MobileShell-c16SjN77.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const TAGS = ["Great choice", "Too far", "Too expensive", "Wrong vibe", "Weather ruined it"];
function Feedback() {
  const {
    plan,
    setRating,
    toggleTag,
    reset
  } = usePlan();
  const nav = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { back: "/summary", title: "Feedback · learning", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight mb-1", children: "How was it?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "Helps Radar learn what your group loves." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mb-8", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRating(n), className: `size-12 rounded-2xl grid place-items-center text-2xl transition-all active:scale-90 ${(plan.rating ?? 0) >= n ? "bg-accent text-foreground" : "bg-surface ring-1 ring-border text-muted-foreground"}`, children: "★" }, n)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3", children: "Tag the experience" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-8", children: TAGS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(MiniChip, { label: t, active: plan.feedbackTags?.includes(t), onClick: () => toggleTag(t) }, t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { onClick: () => {
      reset();
      nav({
        to: "/history"
      });
    }, children: "Save & finish" }) })
  ] });
}
export {
  Feedback as component
};
