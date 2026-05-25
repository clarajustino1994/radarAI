import { J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { u as useNavigate, L as Link } from "./router-CL_PJO0p.js";
import { a as MobileShell, P as PrimaryButton } from "./MobileShell-c16SjN77.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const STEPS = [{
  n: "01",
  t: "Create plan",
  s: "Time, place and a few friends."
}, {
  n: "02",
  t: "Set preferences",
  s: "Tap chips. Done in 30 seconds."
}, {
  n: "03",
  t: "Vote & confirm",
  s: "Group picks, you go."
}];
function Welcome() {
  const nav = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileShell, { hideNav: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-14 pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3", children: "Radar AI · welcome" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-[40px] leading-[1.02] font-semibold tracking-tight mb-3", children: [
      "Decide faster,",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "together."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-10", children: "One place to plan with friends — no group-chat back-and-forth." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3 mb-10", children: STEPS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-4 p-4 bg-surface ring-1 ring-border rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-primary", children: s.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: s.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.s })
      ] })
    ] }, s.n)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { onClick: () => {
      try {
        localStorage.setItem("radar.onboarded", "1");
      } catch {
      }
      nav({
        to: "/create"
      });
    }, children: "Start a plan" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", onChange: (e) => {
        try {
          localStorage.setItem("radar.dontShow", e.target.checked ? "1" : "");
        } catch {
        }
      }, className: "size-4 accent-foreground" }),
      "Don't show again"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block mt-4 text-center text-xs text-muted-foreground underline underline-offset-4", children: "Skip to home" })
  ] }) });
}
export {
  Welcome as component
};
