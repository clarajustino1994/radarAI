export type Activity = {
  id: string;
  name: string;
  category: string;
  outdoor: boolean;
  distanceKm: number;
  travelMin: number;
  budget: 0 | 1 | 2 | 3; // free, €, €€, €€€
  open: boolean;
  hours: string;
  address: string;
  transport: string;
  weather?: { temp: number; cond: string };
  why: string;
  groupFit: number; // 0-100
  imagePrompt: string;
  emoji: string;
};

export const ACTIVITIES: Activity[] = [
  {
    id: "bunkers",
    name: "Bunkers del Carmel",
    category: "Viewpoint",
    outdoor: true,
    distanceKm: 4.2,
    travelMin: 18,
    budget: 0,
    open: true,
    hours: "Open 24h",
    address: "Carrer de Marià Labèrnia, El Carmel",
    transport: "Bus 119 + 10 min walk",
    weather: { temp: 22, cond: "Sunny" },
    why: "Best sunset for an adventurous mood, free, fits the group's 15-min travel limit.",
    groupFit: 94,
    imagePrompt: "panoramic golden-hour view of Barcelona from Bunkers del Carmel hilltop",
    emoji: "🌅",
  },
  {
    id: "ciutadella",
    name: "Parc de la Ciutadella",
    category: "Park · Picnic",
    outdoor: true,
    distanceKm: 1.1,
    travelMin: 7,
    budget: 0,
    open: true,
    hours: "10:00 – 22:30",
    address: "Passeig de Picasso, El Born",
    transport: "Metro L1 Arc de Triomf · 5 min walk",
    weather: { temp: 22, cond: "Sunny" },
    why: "Closest match for a relaxed and social vibe, with shade and the fountain.",
    groupFit: 88,
    imagePrompt: "Parc de la Ciutadella green lawn with people picnicking near fountain",
    emoji: "🌳",
  },
  {
    id: "barceloneta",
    name: "Barceloneta Beach",
    category: "Beach",
    outdoor: true,
    distanceKm: 2.8,
    travelMin: 14,
    budget: 1,
    open: true,
    hours: "Always open",
    address: "Passeig Marítim de la Barceloneta",
    transport: "Metro L4 Barceloneta",
    weather: { temp: 23, cond: "Light breeze" },
    why: "High-energy social spot with chiringuitos right on the sand.",
    groupFit: 81,
    imagePrompt: "Barceloneta beach sunny day with W hotel skyline and people walking",
    emoji: "🏖️",
  },
  {
    id: "carretera",
    name: "Carretera de les Aigües",
    category: "Scenic walk",
    outdoor: true,
    distanceKm: 6.5,
    travelMin: 22,
    budget: 0,
    open: true,
    hours: "Daylight",
    address: "Collserola Natural Park",
    transport: "FGC Peu del Funicular",
    weather: { temp: 19, cond: "Cool" },
    why: "Quiet panoramic path — matches the calm & secluded atmosphere choice.",
    groupFit: 76,
    imagePrompt: "scenic dirt path Carretera de les Aigues overlooking Barcelona city",
    emoji: "🥾",
  },
  {
    id: "joliu",
    name: "Espai Joliu",
    category: "Outdoor café",
    outdoor: true,
    distanceKm: 3.4,
    travelMin: 16,
    budget: 2,
    open: true,
    hours: "09:30 – 19:00",
    address: "Carrer de Badajoz 95, Poblenou",
    transport: "Metro L4 Llacuna",
    weather: { temp: 22, cond: "Sunny" },
    why: "Creative & local pick — plant-filled terrace for a slow afternoon.",
    groupFit: 72,
    imagePrompt: "cozy plant-filled outdoor café terrace in Poblenou Barcelona",
    emoji: "☕",
  },
  {
    id: "montjuic",
    name: "Mirador de l'Alcalde",
    category: "Viewpoint",
    outdoor: true,
    distanceKm: 5.1,
    travelMin: 20,
    budget: 0,
    open: true,
    hours: "Open 24h",
    address: "Camí del Mar, Montjuïc",
    transport: "Bus 150",
    weather: { temp: 21, cond: "Clear" },
    why: "Less crowded alternative to Bunkers with port views.",
    groupFit: 70,
    imagePrompt: "Mirador del Alcalde Montjuic Barcelona harbor view with mosaic benches",
    emoji: "🌄",
  },
  {
    id: "tibidabo",
    name: "Plaça del Tibidabo",
    category: "Hilltop · Family",
    outdoor: true,
    distanceKm: 9.4,
    travelMin: 35,
    budget: 1,
    open: true,
    hours: "11:00 – 20:00",
    address: "Plaça del Tibidabo, Sarrià",
    transport: "Tramvia Blau + Funicular",
    weather: { temp: 17, cond: "Breezy" },
    why: "Beyond your usual radius, but a strong scenic compromise option.",
    groupFit: 64,
    imagePrompt: "Tibidabo church and old amusement park rides at golden hour Barcelona",
    emoji: "🎡",
  },
];

export const PARTICIPANTS = [
  { id: "you", name: "You", color: "bg-primary", status: "Done" as const, time: 22 },
  { id: "marc", name: "Marc", color: "bg-accent", status: "Done" as const, time: 18 },
  { id: "júlia", name: "Júlia", color: "bg-emerald-500", status: "Filling" as const, time: 0 },
  { id: "pau", name: "Pau", color: "bg-sky-500", status: "Not started" as const, time: 0 },
];

export const HISTORY = [
  { id: "h1", name: "Bunkers sunset", activity: "Bunkers del Carmel", date: "Yesterday", people: 4, rating: 5 },
  { id: "h2", name: "Saturday picnic", activity: "Parc de la Ciutadella", date: "Last week", people: 6, rating: 4 },
  { id: "h3", name: "Coastal walk", activity: "Barceloneta Beach", date: "Oct 28", people: 3, rating: 4 },
];

export const SAMPLE_CHAT = [
  { id: 1, from: "Marc", text: "Bunkers is a vibe today 🌅", at: "now" },
  { id: 2, from: "Júlia", text: "I'm in but only if we leave by 6", at: "1m" },
  { id: 3, from: "You", text: "Bringing the speaker", at: "2m" },
];