import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import type { ScoreboardData } from "@/lib/scoring";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getScoreboard = createServerFn({ method: "GET" }).handler(
  async (): Promise<ScoreboardData> => {
    const supabase = publicClient();
    const [squads, players, entries, stats] = await Promise.all([
      supabase.from("squads").select("id, name, tag, created_at").order("created_at"),
      supabase.from("squad_players").select("id, squad_id, name, is_reserve, created_at").order("created_at"),
      supabase.from("match_team_entries").select("match_no, squad_id, placement"),
      supabase
        .from("match_player_stats")
        .select("match_no, player_id, squad_id, kills, redeploys, damage, assists, score"),
    ]);

    if (squads.error || players.error || entries.error || stats.error) {
      return { squads: [], entries: [], stats: [] };
    }

    return {
      squads: (squads.data ?? []).map((s) => ({
        id: s.id,
        name: s.name,
        tag: s.tag,
        players: (players.data ?? [])
          .filter((p) => p.squad_id === s.id)
          .map((p) => ({ id: p.id, name: p.name, is_reserve: p.is_reserve })),
      })),
      entries: entries.data ?? [],
      stats: stats.data ?? [],
    };
  },
);

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden: admin access required");
}

export const getMyAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: data === true };
  });

const squadInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2).max(60),
  tag: z.string().trim().max(8).optional().or(z.literal("")),
});

export const saveSquad = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => squadInput.parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const row = { name: data.name, tag: data.tag || null };
    if (data.id) {
      const { error } = await context.supabase.from("squads").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { id: data.id };
    }
    const { data: inserted, error } = await context.supabase
      .from("squads")
      .insert(row)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: inserted!.id };
  });

export const deleteSquad = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("squads").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const playersInput = z.object({
  squadId: z.string().uuid(),
  players: z
    .array(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().trim().min(1).max(40),
        is_reserve: z.boolean(),
      }),
    )
    .max(10),
});

export const saveSquadPlayers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => playersInput.parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: existing, error: readErr } = await context.supabase
      .from("squad_players")
      .select("id")
      .eq("squad_id", data.squadId);
    if (readErr) throw new Error(readErr.message);

    const keep = new Set(data.players.map((p) => p.id).filter(Boolean) as string[]);
    const toDelete = (existing ?? []).map((p) => p.id).filter((id) => !keep.has(id));
    if (toDelete.length) {
      const { error } = await context.supabase.from("squad_players").delete().in("id", toDelete);
      if (error) throw new Error(error.message);
    }

    for (const p of data.players) {
      if (p.id) {
        const { error } = await context.supabase
          .from("squad_players")
          .update({ name: p.name, is_reserve: p.is_reserve })
          .eq("id", p.id);
        if (error) throw new Error(error.message);
      } else {
        const { error } = await context.supabase
          .from("squad_players")
          .insert({ squad_id: data.squadId, name: p.name, is_reserve: p.is_reserve });
        if (error) throw new Error(error.message);
      }
    }
    return { ok: true };
  });

const matchInput = z.object({
  matchNo: z.number().int().min(1).max(6),
  squadId: z.string().uuid(),
  placement: z.number().int().min(1).max(60).nullable(),
  players: z.array(
    z.object({
      playerId: z.string().uuid(),
      kills: z.number().int().min(0).max(999),
      redeploys: z.number().int().min(0).max(999),
      damage: z.number().int().min(0).max(999999),
      assists: z.number().int().min(0).max(999),
      score: z.number().int().min(0).max(999999),
    }),
  ),
});

export const saveMatchResult = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => matchInput.parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);

    const { error: entryErr } = await context.supabase
      .from("match_team_entries")
      .upsert(
        { match_no: data.matchNo, squad_id: data.squadId, placement: data.placement },
        { onConflict: "match_no,squad_id" },
      );
    if (entryErr) throw new Error(entryErr.message);

    if (data.players.length) {
      const { error: statsErr } = await context.supabase.from("match_player_stats").upsert(
        data.players.map((p) => ({
          match_no: data.matchNo,
          squad_id: data.squadId,
          player_id: p.playerId,
          kills: p.kills,
          redeploys: p.redeploys,
          damage: p.damage,
          assists: p.assists,
          score: p.score,
        })),
        { onConflict: "match_no,player_id" },
      );
      if (statsErr) throw new Error(statsErr.message);
    }
    return { ok: true };
  });
