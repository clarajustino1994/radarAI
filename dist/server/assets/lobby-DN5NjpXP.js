import { S as reactExports, J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { a as MobileShell, P as PrimaryButton } from "./MobileShell-c16SjN77.js";
import { P as PARTICIPANTS } from "./router-CL_PJO0p.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Lobby() {
  const [nudged, setNudged] = reactExports.useState([]);
  const doneCount = PARTICIPANTS.filter((p) => p.status === "Done").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { back: "/invite", title: "Lobby · Waiting room", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight leading-tight mb-2", children: "Lobby" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
        doneCount,
        "/",
        PARTICIPANTS.length,
        " done · avg 20s to fill"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-surface ring-1 ring-border rounded-3xl p-2 mb-6", children: PARTICIPANTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-4 p-3 ${i > 0 ? "border-t border-border" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `size-10 rounded-full ${p.color} grid place-items-center text-xs font-bold text-white`, children: p.name[0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `size-1.5 rounded-full ${p.status === "Done" ? "bg-primary" : p.status === "Filling" ? "bg-accent animate-pulse" : "bg-muted-foreground/40"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: p.status }),
            p.status === "Done" && p.time > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-primary ml-1", children: [
              p.time,
              "s"
            ] })
          ] })
        ] }),
        p.status !== "Done" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setNudged((n) => n.includes(p.id) ? n : [...n, p.id]), className: "text-[11px] font-medium px-3 py-1.5 rounded-full bg-muted text-foreground active:scale-95 transition-transform", children: nudged.includes(p.id) ? "Sent ✓" : "Nudge" })
      ] }, p.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/10 ring-1 ring-accent/30 rounded-2xl p-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-accent mb-1", children: "Weather" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-snug", children: "22°C and sunny in El Born — outdoor options will be prioritized." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-3 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-primary animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-primary animate-pulse [animation-delay:120ms]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-primary animate-pulse [animation-delay:240ms]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground ml-2", children: "Waiting for friends…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { as: "link", to: "/prefs", children: "Fill my preferences" })
    ] })
  ] });
}
export {
  Lobby as component
};
