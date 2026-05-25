import { S as reactExports, J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { a as MobileShell, P as PrimaryButton, S as SecondaryButton } from "./MobileShell-c16SjN77.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-CL_PJO0p.js";
const CONTACTS = [{
  id: "marc",
  name: "Marc Vidal",
  initials: "MV",
  color: "bg-accent text-foreground"
}, {
  id: "júlia",
  name: "Júlia Roca",
  initials: "JR",
  color: "bg-emerald-500 text-white"
}, {
  id: "pau",
  name: "Pau Ferrer",
  initials: "PF",
  color: "bg-sky-500 text-white"
}, {
  id: "ana",
  name: "Ana López",
  initials: "AL",
  color: "bg-rose-500 text-white"
}, {
  id: "ben",
  name: "Ben Ortiz",
  initials: "BO",
  color: "bg-violet-500 text-white"
}];
function Invite() {
  const [picked, setPicked] = reactExports.useState(["marc", "júlia", "pau"]);
  const [copied, setCopied] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { back: "/create", title: "Step · Invite", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight leading-tight mb-2", children: "Invite friends" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "Share a link or pick from contacts." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }, className: "w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-foreground text-background active:scale-[0.99] transition-transform mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-background/60", children: "Invite link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm truncate", children: "radar.ai/p/9F2-bcn" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: copied ? "Copied ✓" : "Copy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-8 mb-3", children: "From contacts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: CONTACTS.map((c) => {
        const active = picked.includes(c.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPicked((p) => p.includes(c.id) ? p.filter((x) => x !== c.id) : [...p, c.id]), className: "w-full flex items-center gap-4 p-3 bg-surface ring-1 ring-border rounded-2xl active:scale-[0.99] transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `size-10 rounded-full ${c.color} grid place-items-center text-xs font-bold`, children: c.initials }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-left text-sm font-medium", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `size-6 rounded-full grid place-items-center text-xs ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: active ? "✓" : "+" })
        ] }, c.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 mt-8 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PrimaryButton, { as: "link", to: "/lobby", children: [
        "Send ",
        picked.length,
        " invite",
        picked.length === 1 ? "" : "s",
        " & continue"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { as: "link", to: "/lobby", children: "Continue to lobby" })
    ] })
  ] });
}
export {
  Invite as component
};
