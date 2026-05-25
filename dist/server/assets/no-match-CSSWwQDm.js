import { J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { a as usePlan, u as useNavigate } from "./router-CL_PJO0p.js";
import { a as MobileShell, P as PrimaryButton, S as SecondaryButton } from "./MobileShell-c16SjN77.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function NoMatch() {
  const {
    setPref,
    setFlex
  } = usePlan();
  const nav = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { back: "/results", title: "No overlap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 rounded-full bg-muted grid place-items-center mx-auto my-6 text-2xl", children: "◷" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight mb-2", children: "No overlap right now" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mx-auto mb-8", children: "Two friends can't make it before 7pm, and most picks are closing. Try widening the window." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { onClick: () => {
        setPref("timeWindow", "This evening");
        nav({
          to: "/results"
        });
      }, children: "Expand to this evening" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => {
        setFlex("distance", "Open");
        nav({
          to: "/results"
        });
      }, children: "Relax distance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => {
        setFlex("budget", "Open");
        nav({
          to: "/results"
        });
      }, children: "Relax budget" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => nav({
        to: "/activity/$id",
        params: {
          id: "ciutadella"
        }
      }), children: "Choose random" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { as: "link", to: "/chat", children: "Open chat" })
    ] })
  ] });
}
export {
  NoMatch as component
};
