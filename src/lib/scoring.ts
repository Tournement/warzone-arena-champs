// Point calculation — ported unchanged from the tournament dashboard script.
export const MATCH_COUNT = 6;

export const MATCHES = Array.from({ length: MATCH_COUNT }, (_, i) => ({
  id: i + 1,
  label: `Match ${i + 1}`,
  day: i < 3 ? 1 : 2,
}));

export const PLACEMENT_POINTS: Record<number, number> = {
  1: 150,
  2: 120,
  3: 90,
  4: 60,
  5: 45,
  6: 30,
  7: 22,
  8: 15,
};
export const DEFAULT_PLACEMENT_POINTS = 8;

export const STAT_FIELDS = ["kills", "redeploys", "damage", "assists", "score"] as const;
export type StatField = (typeof STAT_FIELDS)[number];

export type Stat = Partial<Record<StatField, number | string | null>>;

export function placementPoints(rank?: number | null): number {
  if (!rank) return 0;
  return PLACEMENT_POINTS[rank] ?? DEFAULT_PLACEMENT_POINTS;
}

export function mvpScore(s?: Stat | null): number {
  const k = Number(s?.kills) || 0;
  const r = Number(s?.redeploys) || 0;
  const d = Number(s?.damage) || 0;
  const a = Number(s?.assists) || 0;
  const sc = Number(s?.score) || 0;
  return k * 4 + r * 3 + d / 80 + a * 1.5 + sc / 150;
}

export type Player = { id: string; name: string; is_reserve: boolean };
export type Squad = { id: string; name: string; tag: string | null; players: Player[] };
export type MatchEntry = { match_no: number; squad_id: string; placement: number | null };
export type PlayerStat = {
  match_no: number;
  player_id: string;
  squad_id: string;
  kills: number;
  redeploys: number;
  damage: number;
  assists: number;
  score: number;
};

export type ScoreboardData = {
  squads: Squad[];
  entries: MatchEntry[];
  stats: PlayerStat[];
};

export function entryFor(data: ScoreboardData, matchNo: number, squadId: string) {
  return data.entries.find((e) => e.match_no === matchNo && e.squad_id === squadId) ?? null;
}

export function statFor(data: ScoreboardData, matchNo: number, playerId: string) {
  return data.stats.find((s) => s.match_no === matchNo && s.player_id === playerId) ?? null;
}

export type StandingRow = {
  squad: Squad;
  total: number;
  perMatch: {
    matchId: number;
    placement: number | null;
    placePts: number;
    teamKills: number;
    matchTotal: number;
  }[];
};

export function computeStandings(data: ScoreboardData): StandingRow[] {
  return data.squads
    .map((squad) => {
      let total = 0;
      const perMatch = MATCHES.map((match) => {
        const entry = entryFor(data, match.id, squad.id);
        const placement = entry?.placement ?? null;
        const placePts = placementPoints(placement);
        const teamKills = squad.players.reduce(
          (sum, p) => sum + (statFor(data, match.id, p.id)?.kills ?? 0),
          0,
        );
        const matchTotal = placePts + teamKills;
        total += matchTotal;
        return { matchId: match.id, placement, placePts, teamKills, matchTotal };
      });
      return { squad, total, perMatch };
    })
    .sort((a, b) => b.total - a.total);
}

export type MvpRow = {
  player: Player;
  squad: Squad;
  total: number;
  totals: Record<StatField, number>;
};

export function computeMvpBoard(data: ScoreboardData): MvpRow[] {
  const rows: MvpRow[] = [];
  for (const squad of data.squads) {
    for (const player of squad.players) {
      let total = 0;
      const totals: Record<StatField, number> = {
        kills: 0,
        redeploys: 0,
        damage: 0,
        assists: 0,
        score: 0,
      };
      for (const match of MATCHES) {
        const st = statFor(data, match.id, player.id);
        if (!st) continue;
        total += mvpScore(st);
        for (const f of STAT_FIELDS) totals[f] += st[f] ?? 0;
      }
      rows.push({ player, squad, total, totals });
    }
  }
  return rows.sort((a, b) => b.total - a.total);
}
