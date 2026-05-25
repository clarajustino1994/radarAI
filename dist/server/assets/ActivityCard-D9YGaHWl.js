import { J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { a as usePlan, L as Link } from "./router-CL_PJO0p.js";
const budgetLabel = (b) => b === 0 ? "Free" : "€".repeat(b);
function ActivityCard({ a, rank }) {
  const { plan, vote } = usePlan();
  const v = plan.votes[a.id] ?? { up: 0, down: 0 };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-surface rounded-[2rem] ring-1 ring-border overflow-hidden shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/activity/$id", params: { id: a.id }, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-[5/3] bg-gradient-to-br from-primary/15 via-accent/15 to-primary/5 grid place-items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: a.emoji }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] uppercase tracking-widest bg-foreground text-background px-2 py-0.5 rounded-full", children: [
          "#",
          rank
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest bg-background/85 text-foreground px-2 py-0.5 rounded-full", children: a.outdoor ? "Outdoor" : "Indoor" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 bg-background/85 text-foreground px-2 py-0.5 rounded-full text-[10px] font-mono", children: [
        a.groupFit,
        "% fit"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-base tracking-tight", children: a.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            a.category,
            " · ",
            a.distanceKm,
            " km · ",
            a.travelMin,
            " min"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: budgetLabel(a.budget) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[10px] font-mono ${a.open ? "text-primary" : "text-muted-foreground"}`, children: a.open ? "OPEN" : "CLOSED" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-2xl p-3 border-l-2 border-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-widest text-accent mb-0.5", children: "Why recommended" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-foreground/80", children: a.why })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => vote(a.id, "up"),
            className: `flex-1 py-2.5 rounded-2xl ring-1 text-sm font-medium transition-all active:scale-[0.97] ${v.mine === "up" ? "bg-primary text-primary-foreground ring-primary" : "bg-background ring-border text-foreground"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block animate-pop", children: "👍" }, `u-${v.up}`),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 font-mono text-xs", children: v.up })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => vote(a.id, "down"),
            className: `flex-1 py-2.5 rounded-2xl ring-1 text-sm font-medium transition-all active:scale-[0.97] ${v.mine === "down" ? "bg-foreground text-background ring-foreground" : "bg-background ring-border text-foreground"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block animate-pop", children: "👎" }, `d-${v.down}`),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 font-mono text-xs", children: v.down })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  ActivityCard as A
};
