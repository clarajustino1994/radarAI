import { createContext, useContext, useState, type ReactNode } from "react";
import { ACTIVITIES, type Activity } from "@/lib/sample-data";

export type Prefs = {
  mood?: string;
  atmosphere?: string;
  budget?: string;
  distance?: string;
  timeWindow?: string;
  io?: string;
  flex: {
    mood: string;
    atmosphere: string;
    budget: string;
    distance: string;
    io: string;
    time: string;
  };
};

export type Votes = Record<
  string,
  { up: number; down: number; mine?: "up" | "down" }
>;

export type ChatMsg = {
  id: number;
  from: string;
  text: string;
  at: string;
  type?: "invite";
  invitePlanId?: string;
  invitePlanName?: string;
  inviteLocation?: string;
};

export type ChatThread = {
  id: string;
  name: string;
  members: string;
  initials: string[];
  messages: ChatMsg[];
  unread: number;
};

export type DmChat = {
  id: string;
  fromName: string;
  fromInitials: string;
  fromColor: string;
  messages: ChatMsg[];
  unread: number;
};

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
  extraChats: ChatThread[];
  dmChats: DmChat[];
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
  sendExtraChat: (threadId: string, text: string) => void;
  sendDmInvite: (contactId: string, contactName: string, contactInitials: string, contactColor: string) => void;
  sendDmMessage: (contactId: string, text: string) => void;
};

const initial: Plan = {
  name: "",
  location: "El Born, Barcelona",
  initialDistance: "1–5 km",
  prefs: {
    flex: {
      mood: "Flexible",
      atmosphere: "Flexible",
      budget: "Flexible",
      distance: "Flexible",
      io: "Flexible",
      time: "Flexible",
    },
  },
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
    {
      id: 2,
      from: "Júlia",
      text: "I'm in but only if we leave by 6",
      at: "1m",
    },
    { id: 3, from: "You", text: "Bringing the speaker", at: "2m" },
  ],
  chatUnread: 2,

  extraChats: [
    {
      id: "brunch",
      name: "Sunday brunch crew",
      members: "You, Pau, Neus, Anna",
      initials: ["Y", "P", "N", "A"],
      unread: 1,
      messages: [
        {
          id: 1,
          from: "Pau",
          text: "Still waiting on your prefs 👀",
          at: "5m",
        },
        { id: 2, from: "Neus", text: "Same, hurry up!", at: "3m" },
      ],
    },
    {
      id: "bunkers",
      name: "Bunkers sunset",
      members: "You, Marc, Júlia, Pere",
      initials: ["Y", "M", "J", "P"],
      unread: 0,
      messages: [
        {
          id: 1,
          from: "Marc",
          text: "That sunset was unreal 🌅",
          at: "Yesterday",
        },
        {
          id: 2,
          from: "Júlia",
          text: "Best plan we've done so far",
          at: "Yesterday",
        },
        { id: 3, from: "You", text: "Same time next week?", at: "Yesterday" },
      ],
    },
    {
      id: "picnic",
      name: "Saturday picnic",
      members: "You, Marc, Júlia, Pere, Anna, Roc",
      initials: ["Y", "M", "J", "P"],
      unread: 0,
      messages: [
        {
          id: 1,
          from: "Anna",
          text: "I'll bring the cheese 🧀",
          at: "Last week",
        },
        { id: 2, from: "Roc", text: "And I'll bring wine 🍷", at: "Last week" },
        {
          id: 3,
          from: "You",
          text: "Legend. See you all there",
          at: "Last week",
        },
      ],
    },
    {
      id: "coastal",
      name: "Coastal walk",
      members: "You, Laia, Tomàs",
      initials: ["Y", "L", "T"],
      unread: 0,
      messages: [
        {
          id: 1,
          from: "Laia",
          text: "My legs are still sore 😂",
          at: "Oct 28",
        },
        { id: 2, from: "Tomàs", text: "Worth it though", at: "Oct 28" },
        {
          id: 3,
          from: "You",
          text: "100%. Let's do Montjuïc next",
          at: "Oct 28",
        },
      ],
    },
  ],
  dmChats: [
    {
      id: "marc",
      fromName: "Marc Vidal",
      fromInitials: "MV",
      fromColor: "bg-accent text-foreground",
      unread: 1,
      messages: [
        {
          id: 9001,
          from: "Marc",
          text: "Want to do something outside today?",
          at: "10:12",
        },
        {
          id: 9002,
          from: "Marc",
          text: "Hey! I'm planning something in El Born — join my plan 👇",
          at: "10:13",
          type: "invite",
          invitePlanId: "current",
          invitePlanName: "Outdoor plan · El Born",
          inviteLocation: "El Born, Barcelona",
        },
      ],
    },
  ],
};

const PlanCtx = createContext<Ctx | null>(null);


export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>(initial);

  const setName = (s: string) => setPlan((p) => ({ ...p, name: s }));
  const setLocation = (s: string) => setPlan((p) => ({ ...p, location: s }));
  const setInitialDistance = (s: string) =>
    setPlan((p) => ({
      ...p,
      initialDistance: s,
      prefs: { ...p.prefs, distance: s },
    }));
  const setPref = <K extends keyof Prefs>(k: K, v: Prefs[K]) =>
    setPlan((p) => ({ ...p, prefs: { ...p.prefs, [k]: v } }));
  const setFlex = (k: keyof Prefs["flex"], v: string) =>
    setPlan((p) => ({
      ...p,
      prefs: { ...p.prefs, flex: { ...p.prefs.flex, [k]: v } },
    }));

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
      return {
        ...p,
        feedbackTags: tags.includes(t)
          ? tags.filter((x) => x !== t)
          : [...tags, t],
      };
    });
  const submit = () => setPlan((p) => ({ ...p, submitted: true }));
  const sendChat = (text: string) =>
    setPlan((p) => ({
      ...p,
      chat: [
        ...p.chat,
        { id: p.chat.length + 1, from: "You", text, at: "now" },
      ],
    }));
  const sendExtraChat = (threadId: string, text: string) =>
    setPlan((p) => ({
      ...p,
      extraChats: p.extraChats.map((t) =>
        t.id === threadId
          ? {
              ...t,
              messages: [
                ...t.messages,
                { id: t.messages.length + 1, from: "You", text, at: "now" },
              ],
            }
          : t
      ),
    }));
  const markChatRead = () => setPlan((p) => ({ ...p, chatUnread: 0 }));

  const rankedActivities = (): Activity[] => {
    const { prefs } = plan;
    const distMax: Record<string, number> = {
      "<1 km": 1,
      "1–5 km": 5,
      "5–15 km": 15,
      "15–30 km": 30,
    };
    const max = distMax[prefs.distance ?? prefs.distance ?? ""] ?? 30;
    const budgetMap: Record<string, number> = {
      Free: 0,
      "€": 1,
      "€€": 2,
      "€€€": 3,
    };
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
      if (prefs.atmosphere && atmBoost[prefs.atmosphere]?.includes(a.id))
        score += 8;
      return { ...a, groupFit: Math.max(35, Math.min(98, score)) };
    });
    return scored.sort((x, y) => y.groupFit - x.groupFit);
  };
  const reset = () => setPlan(initial);

  // In plan-store, add sendDmMessage to Ctx and implement it:
const sendDmMessage = (contactId: string, text: string) =>
setPlan((p) => ({
  ...p,
  dmChats: p.dmChats.map((d) =>
    d.id === contactId
      ? { ...d, messages: [...d.messages, { id: Date.now(), from: "You", text, at: "now" }] }
      : d
  ),
}));

  const sendDmInvite = (
    contactId: string,
    contactName: string,
    contactInitials: string,
    contactColor: string
  ) =>
    setPlan((p) => {
      const existing = p.dmChats.find((d) => d.id === contactId);
      const inviteMsg: ChatMsg = {
        id: Date.now(),
        from: "You",
        text: `Hey! I'm planning something in ${p.location} — join my plan 👇`,
        at: "now",
        type: "invite",
        invitePlanId: "current",
        invitePlanName: p.name || "Outdoor plan · El Born",
        inviteLocation: p.location,
      };
      if (existing) {
        return {
          ...p,
          dmChats: p.dmChats.map((d) =>
            d.id === contactId
              ? { ...d, messages: [...d.messages, inviteMsg] }
              : d
          ),
        };
      }
      return {
        ...p,
        dmChats: [
          ...p.dmChats,
          {
            id: contactId,
            fromName: contactName,
            fromInitials: contactInitials,
            fromColor: contactColor,
            messages: [inviteMsg],
            unread: 0,
          },
        ],
      };
    });

  return (
    <PlanCtx.Provider
      value={{
        plan,
        setName,
        setLocation,
        setInitialDistance,
        setPref,
        setFlex,
        vote,
        confirm,
        setRating,
        toggleTag,
        submit,
        sendChat,
        markChatRead,
        rankedActivities,
        reset,
        sendExtraChat,
        sendDmInvite,
        sendDmMessage,
      }}
    >
      {children}
    </PlanCtx.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanCtx);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}
