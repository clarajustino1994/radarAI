import { S as reactExports, J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { u as useNavigate } from "./router-CL_PJO0p.js";
import { a as MobileShell, P as PrimaryButton, S as SecondaryButton } from "./MobileShell-c16SjN77.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Join() {
  const [link, setLink] = reactExports.useState("radar.ai/p/9F2-bcn");
  const [err, setErr] = reactExports.useState("");
  const nav = useNavigate();
  const join = () => {
    if (!link.trim()) return setErr("Paste an invite link to continue.");
    nav({
      to: "/lobby"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileShell, { back: "/", title: "Join plan", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight leading-tight mb-2", children: "Join a plan" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "Paste the invite link your friend sent." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Invite link" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: link, onChange: (e) => {
        setLink(e.target.value);
        setErr("");
      }, placeholder: "radar.ai/p/…", className: "mt-2 w-full bg-surface ring-1 ring-border rounded-2xl px-4 py-4 text-base outline-none focus:ring-primary/40" })
    ] }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mb-2", children: err }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { onClick: join, children: "Join" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => nav({
        to: "/"
      }), children: "Cancel" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 p-4 bg-surface ring-1 ring-border rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1", children: "Tip" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-foreground/80", children: "Don't have a link? Ask a friend to share theirs from the lobby, or start your own plan." })
    ] })
  ] }) });
}
export {
  Join as component
};
