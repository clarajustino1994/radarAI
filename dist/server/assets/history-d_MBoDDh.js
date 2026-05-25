import { J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { H as HISTORY, L as Link } from "./router-CL_PJO0p.js";
import { a as MobileShell } from "./MobileShell-c16SjN77.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function History() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileShell, { back: "/", title: "History", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight mb-1", children: "Past plans" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Tap any to revisit the summary." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: HISTORY.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/summary", className: "flex items-center gap-4 p-4 bg-surface ring-1 ring-border rounded-2xl active:scale-[0.99] transition-transform", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-xl bg-primary/10 grid place-items-center text-xl", children: "🌅" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: h.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
          h.activity,
          " · ",
          h.date,
          " · ",
          h.people,
          " friends"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-accent", children: [
        "★ ",
        h.rating,
        ".0"
      ] })
    ] }, h.id)) })
  ] }) });
}
export {
  History as component
};
