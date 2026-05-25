import { createContext, useContext, useState, type ReactNode } from "react";
import { ACTIVITIES, type Activity } from "@/lib/sample-data";

export type Prefs = {
  mood?: string;
  atmosphere?: string;
  budget?: string;
  distance?: string;
  timeWindow?: string;
  io?: string;
  flex: { mood: string; atmosphere: string; budget: string; distance: string; io: string; time: string };
};

export type Votes = Record<string, { up: number; down: number; mine?: "up" | "down" }>;

export type ChatMsg = { id: number; from: string; text: string; at: string };

type Plan = {
  name: string;
  location: string;
  initialDistance: string;
  prefs: Prefs;
  votes: Votes;
  confirmedId?: string;
  rating?: number;
  feedbackTags?: string[];
  submitted?: boolean;
  chat: ChatMsg[];
  chatUnread: number;
};

type Ctx = {
  plan: Plan;
  setName: (s: string) => void;
  setLocation: (s: string) => void;
  setInitialDistance: (s: string) => void;
  setPref: <K extends keyof Prefs>(k: K, v: Prefs[K]) => void;
  setFlex: (k: keyof Prefs["flex"], v: string) => void;
  vote: (id: string, dir: "up" | "down") => void;
  confirm: (id: string) => void;
  setRating: (n: number) => void;
  toggleTag: (t: string) => void;
  submit: () => void;
  sendChat: (text: string) => void;
  markChatRead: () => void;
  rankedActivities: () => Activity[];
  reset: () => void;
};

const initial: Plan = {
  name: "",
  location: "El Born, Barcelona",
  initialDistance: "1–5 km",
  prefs: { flex: { mood: "Flexible", atmosphere: "Flexible", budget: "Flexible", distance: "Flexible", io: "Flexible", time: "Flexible" } },
  votes: {
    bunkers: { up: 3, down: 0 },
    ciutadella: { up: 2, down: 1 },
    barceloneta: { up: 1, down: 0 },
    carretera: { up: 1, down: 1 },
    joliu: { up: 0, down: 0 },
    montjuic: { up: 0, down: 0 },
    tibidabo: { up: 0, down: 2 },
  },
  feedbackTags: [],
  chat: [
    { id: 1, from: "Marc", text: "Bunkers is a vibe today 🌅", at: "now" },
    { id: 2, from: "Júlia", text: "I'm in but only if we leave by 6", at: "1m" },
    { id: 3, from: "You", text: "Bringing the speaker", at: "2m" },
  ],
  chatUnread: 2,
};

const PlanCtx = createContext<Ctx | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>(initial);

  const setName = (s: string) => setPlan((p) => ({ ...p, name: s }));
  const setLocation = (s: string) => setPlan((p) => ({ ...p, location: s }));
  const setInitialDistance = (s: string) =>
    setPlan((p) => ({ ...p, initialDistance: s, prefs: { ...p.prefs, distance: s } }));
  const setPref = <K extends keyof Prefs>(k: K, v: Prefs[K]) =>
    setPlan((p) => ({ ...p, prefs: { ...p.prefs, [k]: v } }));
  const setFlex = (k: keyof Prefs["flex"], v: string) =>
    setPlan((p) => ({ ...p, prefs: { ...p.prefs, flex: { ...p.prefs.flex, [k]: v } } }));

  const vote = (id: string, dir: "up" | "down") =>
    setPlan((p) => {
      const cur = p.votes[id] ?? { up: 0, down: 0 };
      let { up, down, mine } = cur;
      if (mine === dir) {
        if (dir === "up") up = Math.max(0, up - 1);
        else down = Math.max(0, down - 1);
        mine = undefined;
      } else {
        if (mine === "up") up = Math.max(0, up - 1);
        if (mine === "down") down = Math.max(0, down - 1);
        if (dir === "up") up += 1;
        else down += 1;
        mine = dir;
      }
      return { ...p, votes: { ...p.votes, [id]: { up, down, mine } } };
    });

  const confirm = (id: string) => setPlan((p) => ({ ...p, confirmedId: id }));
  const setRating = (n: number) => setPlan((p) => ({ ...p, rating: n }));
  const toggleTag = (t: string) =>
    setPlan((p) => {
      const tags = p.feedbackTags ?? [];
      return { ...p, feedbackTags: tags.includes(t) ? tags.filter((x) => x !== t) : [...tags, t] };
    });
  const submit = () => setPlan((p) => ({ ...p, submitted: true }));
  const sendChat = (text: string) =>
    setPlan((p) => ({ ...p, chat: [...p.chat, { id: p.chat.length + 1, from: "You", text, at: "now" }] }));
  const markChatRead = () => setPlan((p) => ({ ...p, chatUnread: 0 }));

  const rankedActivities = (): Activity[] => {
    const { prefs } = plan;
    const distMax: Record<string, number> = { "<1 km": 1, "1–5 km": 5, "5–15 km": 15, "15–30 km": 30 };
    const max = distMax[prefs.distance ?? prefs.distance ?? ""] ?? 30;
    const budgetMap: Record<string, number> = { "Free": 0, "€": 1, "€€": 2, "€€€": 3 };
    const budgetMax = budgetMap[prefs.budget ?? ""] ?? 3;
    const scored = ACTIVITIES.map((a) => {
      let score = 60;
      // distance
      if (a.distanceKm <= max) score += 12;
      else if (prefs.flex.distance !== "Strict") score += 4;
      else score -= 10;
      // budget
      if (a.budget <= budgetMax) score += 10;
      else if (prefs.flex.budget !== "Strict") score += 2;
      else score -= 8;
      // io
      if (prefs.io === "Outdoor" && a.outdoor) score += 8;
      if (prefs.io === "Indoor" && !a.outdoor) score += 8;
      if (prefs.io === "No preference") score += 4;
      // mood/atmosphere heuristic
      const moodBoost: Record<string, string[]> = {
        Adventurous: ["bunkers", "carretera", "tibidabo"],
        Relaxed: ["ciutadella", "joliu"],
        "High energy": ["barceloneta", "bunkers"],
        Social: ["barceloneta", "ciutadella"],
        Creative: ["joliu", "montjuic"],
      };
      if (prefs.mood && moodBoost[prefs.mood]?.includes(a.id)) score += 10;
      const atmBoost: Record<string, string[]> = {
        Lively: ["barceloneta", "ciutadella"],
        "Calm & secluded": ["carretera", "montjuic", "joliu"],
        Scenic: ["bunkers", "carretera", "montjuic", "tibidabo"],
        "Local & authentic": ["joliu", "barceloneta"],
        "Family-friendly": ["ciutadella", "tibidabo"],
      };
      if (prefs.atmosphere && atmBoost[prefs.atmosphere]?.includes(a.id)) score += 8;
      return { ...a, groupFit: Math.max(35, Math.min(98, score)) };
    });
    return scored.sort((x, y) => y.groupFit - x.groupFit);
  };
  const reset = () => setPlan(initial);

  return (
    <PlanCtx.Provider value={{ plan, setName, setLocation, setInitialDistance, setPref, setFlex, vote, confirm, setRating, toggleTag, submit, sendChat, markChatRead, rankedActivities, reset }}>
      {children}
    </PlanCtx.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanCtx);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}