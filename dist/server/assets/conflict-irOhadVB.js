import { J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { u as useNavigate } from "./router-CL_PJO0p.js";
import { a as MobileShell, P as PrimaryButton, S as SecondaryButton } from "./MobileShell-c16SjN77.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Conflict() {
  const nav = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { back: "/results", title: "No perfect match", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 rounded-full bg-muted grid place-items-center mx-auto my-6 text-2xl", children: "⌖" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight text-center mb-2", children: "Constraints are too tight" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center max-w-xs mx-auto mb-6", children: "Júlia wants free + indoor + nearby, but Marc wants scenic + outdoor + 15km away. These don't fully overlap." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "p-3 bg-surface ring-1 ring-border rounded-2xl text-xs flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Budget" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Free vs €€" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "p-3 bg-surface ring-1 ring-border rounded-2xl text-xs flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Environment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Indoor vs Outdoor" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "p-3 bg-surface ring-1 ring-border rounded-2xl text-xs flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Distance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "<1km vs 15km" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { as: "link", to: "/compromise", children: "Show compromises" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => nav({
        to: "/activity/$id",
        params: {
          id: "ciutadella"
        }
      }), children: "Choose random" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { as: "link", to: "/prefs", children: "Retry preferences" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { as: "link", to: "/chat", children: "Open chat" })
    ] })
  ] });
}
export {
  Conflict as component
};
