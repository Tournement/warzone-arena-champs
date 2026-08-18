import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import {
  deleteSquad,
  getMyAdminStatus,
  getScoreboard,
  saveMatchResult,
  saveSquad,
  saveSquadPlayers,
} from "@/lib/scoreboard.functions";
import {
  computeMvpBoard,
  computeStandings,
  entryFor,
  MATCHES,
  mvpScore,
  statFor,
  type ScoreboardData,
} from "@/lib/scoring";

export const Route = createFileRoute("/_authenticated/admin/scoreboard")({
  head: () => ({
    meta: [
      { title: "Scoreboard Console — Squad Zone APAC Arena Admin" },
      {
        name: "description",
        content:
          "Admin console for Squad Zone APAC Arena: manage squads and rosters, enter match placements and player stats, and publish the live point table.",
      },
      { property: "og:title", content: "Scoreboard Console — Squad Zone APAC Arena" },
      {
        property: "og:description",
        content: "Tournament admin tools for squads, match entry, standings and the MVP board.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminScoreboard,
});

type Draft = Record<
  string,
  { kills: string; redeploys: string; damage: string; assists: string; score: string }
>;

const num = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 0;
};

function AdminScoreboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const adminStatus = useServerFn(getMyAdminStatus);
  const fetchBoard = useServerFn(getScoreboard);

  const adminQuery = useQuery({ queryKey: ["is-admin"], queryFn: () => adminStatus() });
  const boardQuery = useQuery({ queryKey: ["scoreboard"], queryFn: () => fetchBoard() });

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (adminQuery.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!adminQuery.data?.isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader solid />
        <div className="mx-auto max-w-lg px-6 py-28 text-center">
          <h1 className="text-4xl leading-none">Admin access required</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Your account is signed in but doesn't have the tournament admin role yet. Ask an existing
            admin to grant it, then reload this page.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild variant="outline" className="rounded-full uppercase tracking-widest">
              <Link to="/scoreboard/warzone">View public table</Link>
            </Button>
            <Button className="rounded-full uppercase tracking-widest" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader solid />
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-6 py-10">
          <div>
            <p className="label-mono">Warzone · Resurgence · 6 matches</p>
            <h1 className="mt-3 text-4xl leading-none md:text-5xl">
              Scoreboard <span className="text-primary">console</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="rounded-full uppercase tracking-widest">
              <Link to="/scoreboard/warzone">Public table</Link>
            </Button>
            <Button variant="outline" className="rounded-full uppercase tracking-widest" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {boardQuery.data ? (
          <Console data={boardQuery.data} />
        ) : (
          <Loader2 className="size-6 animate-spin text-primary" />
        )}
      </section>
      <SiteFooter />
    </div>
  );
}

function Console({ data }: { data: ScoreboardData }) {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["scoreboard"] });

  const saveSquadFn = useServerFn(saveSquad);
  const deleteSquadFn = useServerFn(deleteSquad);
  const savePlayersFn = useServerFn(saveSquadPlayers);
  const saveMatchFn = useServerFn(saveMatchResult);

  const [newSquad, setNewSquad] = useState({ name: "", tag: "" });
  const [activeSquad, setActiveSquad] = useState<string>(data.squads[0]?.id ?? "");
  const [activeMatch, setActiveMatch] = useState(1);
  const [placement, setPlacement] = useState("");
  const [draft, setDraft] = useState<Draft>({});
  const [rosterDraft, setRosterDraft] = useState<
    { id?: string; name: string; is_reserve: boolean }[]
  >([]);

  const squad = useMemo(
    () => data.squads.find((s) => s.id === activeSquad) ?? data.squads[0] ?? null,
    [data.squads, activeSquad],
  );

  useEffect(() => {
    if (!squad) {
      setRosterDraft([]);
      setDraft({});
      setPlacement("");
      return;
    }
    setRosterDraft(squad.players.map((p) => ({ id: p.id, name: p.name, is_reserve: p.is_reserve })));
    const entry = entryFor(data, activeMatch, squad.id);
    setPlacement(entry?.placement ? String(entry.placement) : "");
    const next: Draft = {};
    for (const p of squad.players) {
      const st = statFor(data, activeMatch, p.id);
      next[p.id] = {
        kills: st ? String(st.kills) : "",
        redeploys: st ? String(st.redeploys) : "",
        damage: st ? String(st.damage) : "",
        assists: st ? String(st.assists) : "",
        score: st ? String(st.score) : "",
      };
    }
    setDraft(next);
  }, [squad?.id, activeMatch, data]);

  const createSquad = useMutation({
    mutationFn: () => saveSquadFn({ data: { name: newSquad.name, tag: newSquad.tag } }),
    onSuccess: (res) => {
      setNewSquad({ name: "", tag: "" });
      setActiveSquad(res.id);
      toast.success("Squad added");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeSquad = useMutation({
    mutationFn: (id: string) => deleteSquadFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Squad removed");
      setActiveSquad("");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const savePlayers = useMutation({
    mutationFn: () =>
      savePlayersFn({
        data: {
          squadId: squad!.id,
          players: rosterDraft.filter((p) => p.name.trim().length > 0),
        },
      }),
    onSuccess: () => {
      toast.success("Roster saved");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveMatch = useMutation({
    mutationFn: () =>
      saveMatchFn({
        data: {
          matchNo: activeMatch,
          squadId: squad!.id,
          placement: placement ? num(placement) || null : null,
          players: squad!.players.map((p) => ({
            playerId: p.id,
            kills: num(draft[p.id]?.kills ?? ""),
            redeploys: num(draft[p.id]?.redeploys ?? ""),
            damage: num(draft[p.id]?.damage ?? ""),
            assists: num(draft[p.id]?.assists ?? ""),
            score: num(draft[p.id]?.score ?? ""),
          })),
        },
      }),
    onSuccess: () => {
      toast.success(`Match ${activeMatch} saved for ${squad!.name}`);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const standings = computeStandings(data);
  const mvp = computeMvpBoard(data);

  return (
    <Tabs defaultValue="roster">
      <TabsList className="flex-wrap">
        <TabsTrigger value="roster">🛡️ Roster</TabsTrigger>
        <TabsTrigger value="matches">⚔️ Match entry</TabsTrigger>
        <TabsTrigger value="standings">🏆 Standings</TabsTrigger>
        <TabsTrigger value="mvp">🎯 MVP board</TabsTrigger>
      </TabsList>

      {/* ROSTER */}
      <TabsContent value="roster" className="mt-6 space-y-6">
        <div className="rounded-lg border border-border bg-surface p-6">
          <p className="label-mono">Add squad</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_10rem_auto]">
            <div>
              <Label htmlFor="sq-name">Squad name</Label>
              <Input
                id="sq-name"
                maxLength={60}
                value={newSquad.name}
                onChange={(e) => setNewSquad({ ...newSquad, name: e.target.value })}
                placeholder="Null Protocol"
              />
            </div>
            <div>
              <Label htmlFor="sq-tag">Tag</Label>
              <Input
                id="sq-tag"
                maxLength={8}
                value={newSquad.tag}
                onChange={(e) => setNewSquad({ ...newSquad, tag: e.target.value.toUpperCase() })}
                placeholder="NULL"
              />
            </div>
            <Button
              className="self-end rounded-full uppercase tracking-widest"
              disabled={newSquad.name.trim().length < 2 || createSquad.isPending}
              onClick={() => createSquad.mutate()}
            >
              <Plus className="size-4" /> Add
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <div className="space-y-2">
            {data.squads.length === 0 ? (
              <p className="text-sm text-muted-foreground">No squads yet.</p>
            ) : null}
            {data.squads.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSquad(s.id)}
                className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${
                  squad?.id === s.id
                    ? "border-primary bg-surface"
                    : "border-border hover:border-primary/60"
                }`}
              >
                <span className="text-sm font-semibold">{s.name}</span>
                <span className="text-xs text-muted-foreground">{s.players.length} players</span>
              </button>
            ))}
          </div>

          {squad ? (
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl leading-none">{squad.name}</h2>
                <Button
                  variant="outline"
                  className="rounded-full text-destructive uppercase tracking-widest"
                  onClick={() => removeSquad.mutate(squad.id)}
                  disabled={removeSquad.isPending}
                >
                  <Trash2 className="size-4" /> Delete squad
                </Button>
              </div>
              <div className="mt-6 space-y-3">
                {rosterDraft.map((p, i) => (
                  <div key={i} className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
                    <Input
                      value={p.name}
                      maxLength={40}
                      placeholder={`Player ${i + 1}`}
                      onChange={(e) =>
                        setRosterDraft((r) =>
                          r.map((x, idx) => (idx === i ? { ...x, name: e.target.value } : x)),
                        )
                      }
                    />
                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={p.is_reserve}
                        onChange={(e) =>
                          setRosterDraft((r) =>
                            r.map((x, idx) =>
                              idx === i ? { ...x, is_reserve: e.target.checked } : x,
                            ),
                          )
                        }
                      />
                      Reserve
                    </label>
                    <Button
                      variant="ghost"
                      onClick={() => setRosterDraft((r) => r.filter((_, idx) => idx !== i))}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="rounded-full uppercase tracking-widest"
                  onClick={() =>
                    setRosterDraft((r) => [...r, { name: "", is_reserve: r.length >= 4 }])
                  }
                >
                  <Plus className="size-4" /> Add player
                </Button>
                <Button
                  className="rounded-full uppercase tracking-widest"
                  onClick={() => savePlayers.mutate()}
                  disabled={savePlayers.isPending}
                >
                  <Save className="size-4" /> Save roster
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </TabsContent>

      {/* MATCH ENTRY */}
      <TabsContent value="matches" className="mt-6 space-y-6">
        <div className="sticky top-16 z-10 rounded-lg border border-border bg-background/95 p-4 backdrop-blur">
          <div className="flex flex-wrap gap-2">
            {MATCHES.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMatch(m.id)}
                className={`rounded-full border px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] transition-colors ${
                  activeMatch === m.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                M{m.id} · Day {m.day}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.squads.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSquad(s.id)}
                className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                  squad?.id === s.id
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground hover:text-primary"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {squad && squad.players.length > 0 ? (
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl leading-none">
                {squad.name} — Match {activeMatch}
              </h2>
              <div className="w-40">
                <Label htmlFor="placement">Placement</Label>
                <Input
                  id="placement"
                  inputMode="numeric"
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value.replace(/\D/g, ""))}
                  placeholder="1"
                />
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-2xl text-left">
                <thead>
                  <tr>
                    <th className="label-mono py-3">Player</th>
                    <th className="label-mono py-3">Kills</th>
                    <th className="label-mono py-3">Redeploys</th>
                    <th className="label-mono py-3">Damage</th>
                    <th className="label-mono py-3">Assists</th>
                    <th className="label-mono py-3">Score</th>
                    <th className="label-mono py-3 text-right text-primary">MVP</th>
                  </tr>
                </thead>
                <tbody>
                  {squad.players.map((p) => {
                    const row = draft[p.id] ?? {
                      kills: "",
                      redeploys: "",
                      damage: "",
                      assists: "",
                      score: "",
                    };
                    return (
                      <tr key={p.id} className="border-t border-border">
                        <td className="py-3 pr-4 text-sm font-semibold">
                          {p.name}
                          {p.is_reserve ? (
                            <span className="ml-2 text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                              res
                            </span>
                          ) : null}
                        </td>
                        {(["kills", "redeploys", "damage", "assists", "score"] as const).map((f) => (
                          <td key={f} className="py-2 pr-3">
                            <Input
                              inputMode="numeric"
                              className="w-24"
                              value={row[f]}
                              onChange={(e) =>
                                setDraft((d) => ({
                                  ...d,
                                  [p.id]: { ...row, [f]: e.target.value.replace(/\D/g, "") },
                                }))
                              }
                            />
                          </td>
                        ))}
                        <td className="py-3 text-right font-display text-xl leading-none text-primary">
                          {mvpScore({
                            kills: num(row.kills),
                            redeploys: num(row.redeploys),
                            damage: num(row.damage),
                            assists: num(row.assists),
                            score: num(row.score),
                          }).toFixed(1)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Button
              className="mt-6 rounded-full uppercase tracking-widest"
              onClick={() => saveMatch.mutate()}
              disabled={saveMatch.isPending}
            >
              <Save className="size-4" /> Save match {activeMatch}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Add a squad with at least one player in the Roster tab first.
          </p>
        )}
      </TabsContent>

      {/* STANDINGS */}
      <TabsContent value="standings" className="mt-6">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-3xl text-left">
            <thead className="bg-surface">
              <tr>
                <th className="label-mono px-4 py-4">Rank</th>
                <th className="label-mono px-4 py-4">Squad</th>
                {MATCHES.map((m) => (
                  <th key={m.id} className="label-mono px-4 py-4">
                    M{m.id}
                  </th>
                ))}
                <th className="label-mono px-4 py-4 text-right text-primary">Total</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, i) => (
                <tr key={row.squad.id} className="border-t border-border">
                  <td className="px-4 py-4 font-display text-xl leading-none text-steel">{i + 1}</td>
                  <td className="px-4 py-4 text-sm font-semibold">{row.squad.name}</td>
                  {row.perMatch.map((pm) => (
                    <td key={pm.matchId} className="px-4 py-4 text-sm">
                      {pm.placement ? `#${pm.placement}` : "—"}
                      <span className="block text-[0.6875rem] text-muted-foreground">
                        {pm.matchTotal} pts
                      </span>
                    </td>
                  ))}
                  <td className="px-4 py-4 text-right font-display text-2xl leading-none text-primary">
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>

      {/* MVP */}
      <TabsContent value="mvp" className="mt-6">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-2xl text-left">
            <thead className="bg-surface">
              <tr>
                <th className="label-mono px-4 py-4">#</th>
                <th className="label-mono px-4 py-4">Player</th>
                <th className="label-mono px-4 py-4">Squad</th>
                <th className="label-mono px-4 py-4 text-right">Kills</th>
                <th className="label-mono px-4 py-4 text-right">Dmg</th>
                <th className="label-mono px-4 py-4 text-right text-primary">MVP pts</th>
              </tr>
            </thead>
            <tbody>
              {mvp.map((row, i) => (
                <tr key={row.player.id} className="border-t border-border">
                  <td className="px-4 py-4 font-display text-xl leading-none text-steel">{i + 1}</td>
                  <td className="px-4 py-4 text-sm font-semibold">{row.player.name}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{row.squad.name}</td>
                  <td className="px-4 py-4 text-right text-sm">{row.totals.kills}</td>
                  <td className="px-4 py-4 text-right text-sm">{row.totals.damage}</td>
                  <td className="px-4 py-4 text-right font-display text-xl leading-none text-primary">
                    {row.total.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
    </Tabs>
  );
}
