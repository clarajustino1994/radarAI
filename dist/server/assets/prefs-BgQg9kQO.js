import { S as reactExports, J as jsxRuntimeExports } from "./server-BMSOoJ6Y.js";
import { u as useNavigate, a as usePlan, t as toast } from "./router-CL_PJO0p.js";
import { a as MobileShell, P as PrimaryButton, C as Chip, b as SegFlex } from "./MobileShell-c16SjN77.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const STEPS = [{
  key: "mood",
  title: "Mood / Energy",
  flexKey: void 0,
  options: [{
    v: "Relaxed",
    s: "😌 Quiet sun & breeze"
  }, {
    v: "High energy",
    s: "⚡ Move & sweat"
  }, {
    v: "Adventurous",
    s: "🌍 Hike & explore"
  }, {
    v: "Social",
    s: "🤝 People & chatter"
  }, {
    v: "Creative",
    s: "🎨 Inspiring spaces"
  }]
}, {
  key: "atmosphere",
  title: "Preferred atmosphere",
  flexKey: void 0,
  options: [{
    v: "Lively",
    s: "Crowds & buzz"
  }, {
    v: "Calm & secluded",
    s: "Few people"
  }, {
    v: "Scenic",
    s: "Big views"
  }, {
    v: "Local & authentic",
    s: "Off the path"
  }, {
    v: "Family-friendly",
    s: "All ages"
  }]
}, {
  key: "budget",
  title: "Budget",
  flexKey: "budget",
  options: [{
    v: "Free",
    s: "🆓 0 €"
  }, {
    v: "€",
    s: "Under 10 €"
  }, {
    v: "€€",
    s: "10–25 €"
  }, {
    v: "€€€",
    s: "25 €+"
  }]
}, {
  key: "timeWindow",
  title: "Availability",
  flexKey: "time",
  options: [{
    v: "Right now",
    s: "Within 1h"
  }, {
    v: "This afternoon",
    s: "Until ~7pm"
  }, {
    v: "This evening",
    s: "7pm onward"
  }, {
    v: "This weekend",
    s: "Sat / Sun"
  }]
}, {
  key: "io",
  title: "Environment",
  flexKey: "io",
  options: [{
    v: "Outdoor",
    s: "🌿 Default today"
  }, {
    v: "Indoor",
    s: "🏠 If weather turns"
  }, {
    v: "No preference",
    s: "🔀 Surprise me"
  }]
}];
function Prefs() {
  const nav = useNavigate();
  const {
    plan,
    setPref,
    setFlex,
    submit
  } = usePlan();
  const [step, setStep] = reactExports.useState(0);
  const total = 5;
  const [secs, setSecs] = reactExports.useState(30);
  const submittedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const id = setInterval(() => setSecs((s) => s > 0 ? s - 1 : 0), 1e3);
    return () => clearInterval(id);
  }, []);
  reactExports.useEffect(() => {
    if (secs === 0 && !submittedRef.current) {
      submittedRef.current = true;
      submit();
      toast.success("Time's up — submitted with your current picks ✓");
      nav({
        to: "/results"
      });
    }
  }, [secs, submit, nav]);
  const handleSubmit = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    submit();
    toast.success("Submitted ✓ Waiting for others…");
    nav({
      to: "/results"
    });
  };
  const next = () => step < total ? setStep(step + 1) : handleSubmit();
  const back = () => step > 0 ? setStep(step - 1) : nav({
    to: "/lobby"
  });
  const progress = Math.min(step + 1, total);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileShell, { title: step < total ? `Step ${progress} of ${total}` : "Review", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: back, className: "size-9 rounded-full bg-surface ring-1 ring-border grid place-items-center active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none", children: "‹" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-1", children: Array.from({
          length: total
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 flex-1 rounded-full transition-colors ${i < progress ? "bg-primary" : "bg-primary/10"}` }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono ring-1 ${secs <= 10 ? "bg-destructive/10 ring-destructive/30 text-destructive" : "bg-surface ring-border text-muted-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⏱" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            secs,
            "s"
          ] })
        ] })
      ] }),
      step <= 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChipStep, { stepIndex: step, setPref, setFlex, prefs: plan.prefs, onAuto: next }),
      step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(Review, { plan })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrimaryButton, { onClick: next, children: step < 4 ? "Continue" : step === 4 ? "Review" : "Submit preferences" }) })
  ] });
}
function ChipStep({
  stepIndex,
  setPref,
  setFlex,
  prefs,
  onAuto
}) {
  const step = STEPS[stepIndex];
  const valueKey = step.key;
  const current = prefs[valueKey];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight mb-1", children: step.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Pick one — tap fast." }),
    step.key === "io" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/10 ring-1 ring-accent/30 rounded-2xl px-4 py-3 mb-4 text-xs leading-snug flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "☀️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "22°C in El Born — we'll prioritise outdoor options, but you can still pick indoor." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: step.options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { label: o.v, sub: o.s, active: current === o.v, onClick: () => {
      setPref(valueKey, o.v);
      setTimeout(onAuto, 200);
    } }, o.v)) }),
    step.flexKey && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Flexibility" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SegFlex, { value: prefs.flex[step.flexKey], onChange: (v) => setFlex(step.flexKey, v) })
    ] })
  ] });
}
function Review({
  plan
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight mb-1", children: "Looks good?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Submit and see what Radar finds." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface ring-1 ring-border rounded-3xl p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Mood", v: plan.prefs.mood }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Atmosphere", v: plan.prefs.atmosphere }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Budget", v: plan.prefs.budget, extra: plan.prefs.flex.budget }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Time", v: plan.prefs.timeWindow, extra: plan.prefs.flex.time }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Environment", v: plan.prefs.io, extra: plan.prefs.flex.io }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Distance", v: plan.prefs.distance ?? plan.initialDistance, extra: plan.prefs.flex.distance })
    ] })
  ] });
}
function Row({
  label,
  v,
  extra
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium flex items-center gap-2", children: [
      v ?? "No preference",
      extra && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono bg-accent/15 text-accent-foreground/70 px-2 py-0.5 rounded-full", children: extra })
    ] })
  ] });
}
export {
  Prefs as component
};
