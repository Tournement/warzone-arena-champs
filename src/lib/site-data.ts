export const NAV = [
  { label: "Home", to: "/" as const },
  { label: "Tournaments", to: "/" as const, hash: "tournaments" },
  { label: "Leaderboard", to: "/leaderboard" as const },
  { label: "Register", to: "/register" as const },
];

export const LIVE_EVENTS = [
  {
    id: "dropzone-duos",
    name: "Dropzone Duos",
    mode: "Duos · Battle Royale",
    prize: "$3,000",
    entrants: 127,
    capacity: 160,
    starts: "Aug 12 · 20:00 UTC",
    state: "Live now",
  },
  {
    id: "clash-night",
    name: "Clash Night",
    mode: "Quads · Kill Race",
    prize: "$2,500",
    entrants: 88,
    capacity: 128,
    starts: "Aug 13 · 19:00 UTC",
    state: "Check-in",
  },
  {
    id: "night-raid-solo",
    name: "Night Raid Solo",
    mode: "Solo · Resurgence",
    prize: "$1,000",
    entrants: 212,
    capacity: 256,
    starts: "Aug 14 · 21:00 UTC",
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
  { name: "Clash Night", date: "Aug 13", prize: "$2,500", fill: 68, state: "Registering" },
  { name: "Night Raid Solo", date: "Aug 14", prize: "$1,000", fill: 82, state: "Registering" },
  { name: "Blood Cup Open", date: "Aug 18", prize: "$5,000", fill: 41, state: "Registering" },
  { name: "Vanguard Quads", date: "Aug 21", prize: "$8,000", fill: 24, state: "Qualifiers" },
  { name: "Iron Circuit", date: "Aug 25", prize: "$12,000", fill: 12, state: "Invite" },
  { name: "Rapid Fire Cup", date: "Aug 29", prize: "$3,500", fill: 5, state: "Soon" },
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
