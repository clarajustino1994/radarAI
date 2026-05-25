import { S as reactExports, J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { u as useNavigate, L as Link, H as HISTORY } from "./router-CL_PJO0p.js";
import { a as MobileShell, B as Brandmark, W as WeatherBanner, P as PrimaryButton, S as SecondaryButton } from "./MobileShell-c16SjN77.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const ACTIVE = [{
  id: "a1",
  name: "Outdoor plan · El Born",
  people: 4,
  status: "Voting open · 2 picks tied"
}, {
  id: "a2",
  name: "Sunday brunch crew",
  people: 3,
  status: "Waiting for Pau"
}];
function Home() {
  const nav = useNavigate();
  reactExports.useEffect(() => {
    try {
      if (!localStorage.getItem("radar.onboarded") && !localStorage.getItem("radar.dontShow")) {
        nav({
          to: "/welcome"
        });
      }
    } catch {
    }
  }, [nav]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 pt-8 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brandmark, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/welcome", className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground active:text-foreground", children: "About →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherBanner, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-[40px] font-semibold tracking-tight leading-[1.02] mt-6 mb-8", children: [
        "Find your",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "horizon."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { as: "link", to: "/create", children: "Start a plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { as: "link", to: "/join", children: "Join plan" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold tracking-tight", children: "Active plans" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Tap to rejoin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ACTIVE.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/lobby", className: "flex items-center gap-3 p-4 bg-surface ring-1 ring-border rounded-2xl active:scale-[0.99] transition-transform", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-11 rounded-2xl bg-primary/10 grid place-items-center text-lg", children: "◉" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: a.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground truncate", children: [
            a.people,
            " friends · ",
            a.status
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary", children: "→" })
      ] }, a.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold tracking-tight", children: "Recent plans" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/history", className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "See all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: HISTORY.slice(0, 2).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/summary", className: "flex items-center gap-4 p-4 bg-surface ring-1 ring-border rounded-2xl active:scale-[0.99] transition-transform", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-xl bg-accent/15 grid place-items-center text-xl", children: "🌅" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: h.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
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
    ] })
  ] });
}
export {
  Home as component
};
