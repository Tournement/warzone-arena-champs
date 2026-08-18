export const BRAND = "𝑺 𝑸 𝑼 𝑨 𝑫 𝒛𝒐𝒏𝒆";
export const BRAND_SUFFIX = "LK";
export const BRAND_FULL = "SQUAD ZONE APAC ARENA";
export const TAGLINE = "Compete. Dominate. Get Paid.";

export const NAV = [
  { label: "Home", to: "/" as const },
  { label: "Tournaments", to: "/" as const, hash: "tournaments" },
  { label: "Scoreboard", to: "/scoreboard" as const },
  { label: "Leaderboard", to: "/leaderboard" as const },
  { label: "About", to: "/about" as const },
  { label: "Register", to: "/register" as const },
];

export const SL_FLAG = "🇱🇰";

export const FORMAT = "Squad · Resurgence · 6 matches · 2 days";

export const PRIZE_TOTAL = "120,000 LKR";
export const PRIZE_SPLIT = [
  { place: "1st place", amount: "80,000 LKR" },
  { place: "2nd place", amount: "40,000 LKR" },
];

export const SQUAD_SLOTS = 13;

export const LIVE_EVENTS = [
  {
    id: "resurgence-custom-lobby",
    name: "Resurgence Custom Lobby Tournament",
    mode: "Squad · Resurgence",
    prize: PRIZE_TOTAL,
    entrants: 7,
    capacity: SQUAD_SLOTS,
    starts: "4 Dec · 20:00 UTC",
    dayTwo: "5 Dec · 20:00 UTC",
    state: "Registering",
  },
];

export const GAMES = [
  {
    name: "Warzone",
    tag: "Tactical · Brutal · Competitive",
    text: "Squad-based Resurgence with verified rosters and enforced anti-cheat on every drop.",
    status: "live" as const,
  },
  {
    name: "Blood Strike",
    tag: "High speed · Fast paced",
    text: "Short-fuse skirmishes for teams who want a bracket done in a single night.",
    status: "soon" as const,
  },
];

export const UPCOMING = [
  {
    name: "Resurgence Custom Lobby Tournament",
    date: "4–5 Dec",
    prize: PRIZE_TOTAL,
    fill: 54,
    state: "Registering",
  },
  { name: "New Year Knockout", date: "31 Dec", prize: "75,000 LKR", fill: 22, state: "Soon" },
  { name: "January Open", date: "10 Jan", prize: "50,000 LKR", fill: 12, state: "Soon" },
];

export type LeaderRow = {
  pos: number;
  team: string;
  player: string;
  region: string;
  wins: number;
  kd: string;
  pts: number;
  earnings: string;
  trend: "up" | "down" | "flat";
};

export const LEADERBOARD: LeaderRow[] = [
  { pos: 1, team: "NULL PROTOCOL", player: "SPECTR", region: "EU", wins: 34, kd: "4.12", pts: 1482, earnings: "20,100 LKR", trend: "up" },
  { pos: 2, team: "ASHFALL", player: "CIPHER", region: "NA", wins: 29, kd: "3.88", pts: 1377, earnings: "16,500 LKR", trend: "up" },
  { pos: 3, team: "KILO SEVEN", player: "PHANTM", region: "EU", wins: 26, kd: "3.61", pts: 1299, earnings: "13,750 LKR", trend: "down" },
  { pos: 4, team: "DEADZONE GC", player: "NEXUS", region: "APAC", wins: 22, kd: "3.20", pts: 1140, earnings: "10,400 LKR", trend: "flat" },
  { pos: 5, team: "GRAVEYARD SHIFT", player: "VICTOR9", region: "NA", wins: 20, kd: "3.04", pts: 1088, earnings: "9,300 LKR", trend: "up" },
  { pos: 6, team: "COLD HARBOR", player: "RAVEN", region: "EU", wins: 18, kd: "2.94", pts: 1012, earnings: "7,900 LKR", trend: "down" },
  { pos: 7, team: "SIERRA NINE", player: "MAKO", region: "LATAM", wins: 17, kd: "2.81", pts: 964, earnings: "6,800 LKR", trend: "up" },
  { pos: 8, team: "BLACK MERIDIAN", player: "ONYX", region: "APAC", wins: 15, kd: "2.70", pts: 903, earnings: "5,800 LKR", trend: "flat" },
  { pos: 9, team: "HOLLOW POINT", player: "DUSK", region: "NA", wins: 13, kd: "2.55", pts: 851, earnings: "5,150 LKR", trend: "down" },
  { pos: 10, team: "IRON VEIL", player: "SABLE", region: "EU", wins: 12, kd: "2.41", pts: 794, earnings: "4,250 LKR", trend: "up" },
];
