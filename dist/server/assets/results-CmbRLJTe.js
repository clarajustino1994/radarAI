import { S as reactExports, J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { a as usePlan, L as Link, u as useNavigate } from "./router-CL_PJO0p.js";
import { a as MobileShell, M as MiniChip, S as SecondaryButton, P as PrimaryButton } from "./MobileShell-c16SjN77.js";
import { A as ActivityCard } from "./ActivityCard-D9YGaHWl.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function ChatDrawer({ defaultOpen = false }) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  const { plan, sendChat, markChatRead } = usePlan();
  const messages = plan.chat;
  const [text, setText] = reactExports.useState("");
  const send = () => {
    if (!text.trim()) return;
    sendChat(text);
    setText("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 transition-transform duration-300 ease-out ${open ? "translate-y-0" : "translate-y-[calc(100%-64px)]"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-foreground text-background rounded-t-[2rem] shadow-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setOpen((o) => !o);
              markChatRead();
            },
            className: "w-full px-5 pt-3 pb-4 flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-1 bg-background/20 rounded-full absolute left-1/2 -translate-x-1/2 top-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-2 relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-7 rounded-full bg-primary ring-2 ring-foreground grid place-items-center text-[10px] font-bold", children: "M" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-7 rounded-full bg-accent ring-2 ring-foreground grid place-items-center text-[10px] font-bold text-foreground", children: "J" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-7 rounded-full bg-sky-500 ring-2 ring-foreground grid place-items-center text-[10px] font-bold", children: "P" }),
                  plan.chatUnread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-2 bg-accent text-foreground text-[9px] font-bold rounded-full px-1.5 py-0.5", children: plan.chatUnread })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Group chat" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-background/50", children: [
                    messages.length,
                    " messages"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-background/60", children: open ? "CLOSE" : "OPEN" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-72 overflow-y-auto no-scrollbar space-y-3 py-2", children: messages.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${m.from === "You" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.from === "You" ? "bg-primary text-primary-foreground" : "bg-background/10 text-background"}`,
              children: [
                m.from !== "You" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] opacity-60 mb-0.5", children: m.from }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-snug", children: m.text })
              ]
            }
          ) }, m.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: text,
                onChange: (e) => setText(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && send(),
                placeholder: "Message…",
                className: "flex-1 bg-background/10 placeholder:text-background/40 rounded-full px-4 py-2.5 text-sm outline-none focus:bg-background/15"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: send,
                className: "px-4 rounded-full bg-background text-foreground text-sm font-medium active:scale-95 transition-transform",
                children: "Send"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/chat", className: "block text-center mt-3 text-[11px] font-mono uppercase tracking-widest text-background/60 underline underline-offset-4", children: "Open full chat →" })
        ] })
      ] })
    }
  );
}
function Results() {
  const {
    plan,
    confirm,
    rankedActivities
  } = usePlan();
  const nav = useNavigate();
  const [filter, setFilter] = reactExports.useState("all");
  const [secs, setSecs] = reactExports.useState(60);
  const [decided, setDecided] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const id = setInterval(() => setSecs((s) => s > 0 ? s - 1 : 0), 1e3);
    return () => clearInterval(id);
  }, []);
  reactExports.useEffect(() => {
    if (secs === 0 && !decided) setDecided(true);
  }, [secs, decided]);
  const ranked = reactExports.useMemo(() => rankedActivities(), [rankedActivities]);
  const list = reactExports.useMemo(() => {
    let l = ranked.slice(0, 8);
    if (filter === "outdoor") l = l.filter((a) => a.outdoor);
    if (filter === "near") l = l.filter((a) => a.distanceKm <= 5);
    if (filter === "free") l = l.filter((a) => a.budget === 0);
    return l;
  }, [ranked, filter]);
  const topFit = list[0]?.groupFit ?? 0;
  const winner = reactExports.useMemo(() => {
    return list.reduce((best, a) => {
      const v = plan.votes[a.id];
      if (!v) return best;
      const score = v.up - v.down;
      const bs = best ? (plan.votes[best.id]?.up ?? 0) - (plan.votes[best.id]?.down ?? 0) : -99;
      return score > bs ? a : best;
    }, void 0);
  }, [list, plan.votes]);
  const majoritySubmitted = list.find((a) => {
    const v = plan.votes[a.id];
    return v && v.up >= 3 && v.up > v.down;
  });
  const tags = [];
  if (plan.prefs.io) tags.push(plan.prefs.io);
  if (plan.prefs.distance ?? plan.initialDistance) tags.push(plan.prefs.distance ?? plan.initialDistance);
  if (plan.prefs.budget) tags.push(plan.prefs.budget);
  if (plan.prefs.timeWindow) tags.push(plan.prefs.timeWindow);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-30 bg-background/90 backdrop-blur-md px-5 pt-4 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/prefs", className: "size-9 rounded-full bg-surface ring-1 ring-border grid place-items-center active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none", children: "‹" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Group fit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-semibold tracking-tight", children: [
            topFit,
            "% · ",
            list.length,
            " picks"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono ring-1 ${secs <= 15 ? "bg-destructive/10 ring-destructive/30 text-destructive" : "bg-surface ring-border text-muted-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⏱" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            secs,
            "s"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-7 rounded-full bg-primary ring-2 ring-background grid place-items-center text-[10px] font-bold text-primary-foreground", children: "Y" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-7 rounded-full bg-accent ring-2 ring-background grid place-items-center text-[10px] font-bold text-foreground", children: "M" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-7 rounded-full bg-emerald-500 ring-2 ring-background grid place-items-center text-[10px] font-bold text-white", children: "J" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-7 rounded-full bg-sky-500 ring-2 ring-background grid place-items-center text-[10px] font-bold text-white", children: "P" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 flex-1", children: tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium px-2 py-1 rounded-full bg-primary/10 text-primary", children: t }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniChip, { label: "All", active: filter === "all", onClick: () => setFilter("all") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniChip, { label: "Outdoor", active: filter === "outdoor", onClick: () => setFilter("outdoor") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniChip, { label: "< 5 km", active: filter === "near", onClick: () => setFilter("near") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MiniChip, { label: "Free", active: filter === "free", onClick: () => setFilter("free") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 pt-4 pb-44 space-y-4", children: [
      list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "No picks match this filter." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { onClick: () => setFilter("all"), children: "Reset filter" })
      ] }) : list.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: decided && winner?.id === a.id ? "ring-2 ring-primary rounded-[2rem] -m-0.5 p-0.5 animate-pop" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityCard, { a, rank: i + 1 }) }, a.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { as: "link", to: "/no-match", children: "No overlap?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecondaryButton, { as: "link", to: "/conflict", children: "Conflict help" })
      ] })
    ] }),
    majoritySubmitted && !decided && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-[55] px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface rounded-3xl shadow-lift ring-1 ring-border p-5 animate-slide-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-primary mb-1", children: "Majority reached" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold tracking-tight", children: [
        "Confirm ",
        majoritySubmitted.name,
        "?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: majoritySubmitted.why }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { onClick: () => {
        confirm(majoritySubmitted.id);
        nav({
          to: "/go"
        });
      }, children: "Confirm plan" })
    ] }) }),
    decided && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-[55] px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-foreground text-background rounded-3xl shadow-lift p-5 animate-slide-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-background/60 mb-1", children: "Voting ended" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold tracking-tight mb-1", children: winner ? `Winner: ${winner.name}` : "No clear winner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-background/70 mb-4", children: winner ? winner.why : "Try expanding constraints or pick a random." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          if (winner) {
            confirm(winner.id);
            nav({
              to: "/go"
            });
          } else nav({
            to: "/no-match"
          });
        }, className: "py-3 rounded-2xl bg-background text-foreground text-sm font-medium active:scale-[0.98]", children: winner ? "Confirm plan" : "Pick anyway" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => nav({
          to: "/no-match"
        }), className: "py-3 rounded-2xl ring-1 ring-background/30 text-sm font-medium active:scale-[0.98]", children: "No match" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChatDrawer, {})
  ] });
}
export {
  Results as component
};
