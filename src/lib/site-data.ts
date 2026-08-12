export const NAV = [
  { label: "Home", to: "/" as const },
  { label: "Tournaments", to: "/" as const, hash: "tournaments" },
  { label: "Leaderboard", to: "/leaderboard" as const },
  { label: "Register", to: "/register" as const },
];

export const SL_FLAG = "🇱🇰";

export const FORMAT = "Squad · Resurgence · 6 matches · 2 days";

export const LIVE_EVENTS = [
  {
    id: "holiday-resurgence-showdown",
    name: "Holiday Resurgence Showdown",
    mode: "Squad · Resurgence",
    prize: "100,000 LKR",
    entrants: 31,
    capacity: 64,
    starts: "24 Dec · 20:00 UTC",
    dayTwo: "25 Dec · 20:00 UTC",
    state: "Registering",
  },
];

export const GAMES = [
  {
    name: "Warzone",
    tag: "Tactical · Brutal · Competitive",
    text: "Squad-based battle royale with verified rosters and enforced anti-cheat on every drop.",
  },
  {
    name: "Blood Strike",
    tag: "High speed · Fast paced",
    text: "Short-fuse skirmishes for teams who want a bracket done in a single night.",
  },
];

export const UPCOMING = [
  { name: "Holiday Resurgence Showdown", date: "24–25 Dec", prize: "100,000 LKR", fill: 48, state: "Registering" },
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
  { pos: 1, team: "NULL PROTOCOL", player: "SPECTR", region: "EU", wins: 34, kd: "4.12", pts: 1482, earnings: "$46,700", trend: "up" },
  { pos: 2, team: "ASHFALL", player: "CIPHER", region: "NA", wins: 29, kd: "3.88", pts: 1377, earnings: "$38,240", trend: "up" },
  { pos: 3, team: "KILO SEVEN", player: "PHANTM", region: "EU", wins: 26, kd: "3.61", pts: 1299, earnings: "$31,900", trend: "down" },
  { pos: 4, team: "DEADZONE GC", player: "NEXUS", region: "APAC", wins: 22, kd: "3.20", pts: 1140, earnings: "$24,050", trend: "flat" },
  { pos: 5, team: "GRAVEYARD SHIFT", player: "VICTOR9", region: "NA", wins: 20, kd: "3.04", pts: 1088, earnings: "$21,600", trend: "up" },
  { pos: 6, team: "COLD HARBOR", player: "RAVEN", region: "EU", wins: 18, kd: "2.94", pts: 1012, earnings: "$18,300", trend: "down" },
  { pos: 7, team: "SIERRA NINE", player: "MAKO", region: "LATAM", wins: 17, kd: "2.81", pts: 964, earnings: "$15,750", trend: "up" },
  { pos: 8, team: "BLACK MERIDIAN", player: "ONYX", region: "APAC", wins: 15, kd: "2.70", pts: 903, earnings: "$13,400", trend: "flat" },
  { pos: 9, team: "HOLLOW POINT", player: "DUSK", region: "NA", wins: 13, kd: "2.55", pts: 851, earnings: "$11,900", trend: "down" },
  { pos: 10, team: "IRON VEIL", player: "SABLE", region: "EU", wins: 12, kd: "2.41", pts: 794, earnings: "$9,800", trend: "up" },
];
