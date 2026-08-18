import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AnimatedContent from "@/components/bits/AnimatedContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getScoreboard } from "@/lib/scoreboard.functions";
import { computeMvpBoard, computeStandings, MATCHES } from "@/lib/scoring";
import { PRIZE_SPLIT, PRIZE_TOTAL, SL_FLAG } from "@/lib/site-data";

const scoreboardQuery = queryOptions({
  queryKey: ["scoreboard"],
  queryFn: () => getScoreboard(),
});

export const Route = createFileRoute("/scoreboard/warzone")({
  head: () => ({
    meta: [
      { title: "Warzone Point Table — Squad Zone APAC Arena" },
      {
        name: "description",
        content:
          "Live Warzone Resurgence point table: squad standings across 6 matches, placement points plus team kills, and the MVP leaderboard for Squad Zone APAC Arena.",
      },
      { property: "og:title", content: "Warzone Point Table — Squad Zone APAC Arena" },
      {
        property: "og:description",
        content: "Squad standings and MVP board for the Resurgence Custom Lobby Tournament.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(scoreboardQuery),
  component: WarzoneScoreboard,
  errorComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader solid />
      <div className="mx-auto max-w-3xl px-6 py-28 text-center">
        <h1 className="text-4xl leading-none">Scoreboard unavailable</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          We couldn't load the point table right now. Try again in a moment.
        </p>
      </div>
    </div>
  ),
  notFoundComponent: () => <p className="p-10">Not found</p>,
});

function WarzoneScoreboard() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader solid />

      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.05]" />
        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <p className="label-mono">
            {SL_FLAG} Warzone · Resurgence · 6 matches · 2 days
          </p>
          <h1 className="mt-3 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.85]">
            Point <span className="text-primary">table</span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-lg border border-primary/60 bg-surface/60 px-5 py-3">
              <p className="label-mono">Prize pool</p>
              <p className="font-display text-2xl leading-none text-primary">{PRIZE_TOTAL}</p>
            </div>
            {PRIZE_SPLIT.map((p) => (
              <div key={p.place} className="rounded-lg border border-border bg-surface/60 px-5 py-3">
                <p className="label-mono">{p.place}</p>
                <p className="font-display text-2xl leading-none">{p.amount}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-xl text-xs text-muted-foreground">
            Team score = placement points (150 → 8 scale) + team kills (1 pt each), summed across all
            6 matches. MVP score = (Kills×4) + (Redeploys×3) + (Damage÷80) + (Assists×1.5) +
            (Score÷150).
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading standings…</p>}>
          <Boards />
        </Suspense>
        <p className="mt-10 text-xs text-muted-foreground">
          Admins:{" "}
          <Link to="/admin/scoreboard" className="story-link text-primary">
            open the scoreboard console
          </Link>
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}

function Boards() {
  const { data } = useSuspenseQuery(scoreboardQuery);
  const standings = computeStandings(data);
  const mvp = computeMvpBoard(data);

  if (data.squads.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-12 text-center">
        <p className="font-display text-3xl leading-none">No squads registered yet</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Standings appear here as soon as admins add squads and match results.
        </p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="standings">
      <TabsList>
        <TabsTrigger value="standings">🏆 Team standings</TabsTrigger>
        <TabsTrigger value="mvp">🎯 MVP board</TabsTrigger>
      </TabsList>

      <TabsContent value="standings">
        <AnimatedContent className="mt-6 overflow-x-auto rounded-lg border border-border">
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
                <tr
                  key={row.squad.id}
                  className={`border-t border-border transition-colors hover:bg-surface/60 ${
                    i < 2 ? "bg-primary/5" : ""
                  }`}
                >
                  <td className="px-4 py-4 font-display text-2xl leading-none text-steel">
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold tracking-wide">
                    {row.squad.name}
                    {row.squad.tag ? (
                      <span className="ml-2 text-xs text-muted-foreground">[{row.squad.tag}]</span>
                    ) : null}
                  </td>
                  {row.perMatch.map((pm) => (
                    <td key={pm.matchId} className="px-4 py-4">
                      <p className="text-sm">{pm.placement ? `#${pm.placement}` : "—"}</p>
                      <p className="text-[0.6875rem] text-muted-foreground">{pm.matchTotal} pts</p>
                    </td>
                  ))}
                  <td className="px-4 py-4 text-right font-display text-2xl leading-none text-primary">
                    {row.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AnimatedContent>
      </TabsContent>

      <TabsContent value="mvp">
        <AnimatedContent className="mt-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-3xl text-left">
            <thead className="bg-surface">
              <tr>
                <th className="label-mono px-4 py-4">#</th>
                <th className="label-mono px-4 py-4">Player</th>
                <th className="label-mono px-4 py-4">Squad</th>
                <th className="label-mono px-4 py-4 text-right">Kills</th>
                <th className="label-mono px-4 py-4 text-right">Redeploys</th>
                <th className="label-mono px-4 py-4 text-right">Damage</th>
                <th className="label-mono px-4 py-4 text-right">Assists</th>
                <th className="label-mono px-4 py-4 text-right">Score</th>
                <th className="label-mono px-4 py-4 text-right text-primary">MVP pts</th>
              </tr>
            </thead>
            <tbody>
              {mvp.map((row, i) => (
                <tr key={row.player.id} className="border-t border-border hover:bg-surface/60">
                  <td className="px-4 py-4 font-display text-xl leading-none text-steel">{i + 1}</td>
                  <td className="px-4 py-4 text-sm font-semibold">
                    {row.player.name}
                    {row.player.is_reserve ? (
                      <span className="ml-2 text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                        reserve
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{row.squad.name}</td>
                  <td className="px-4 py-4 text-right text-sm">{row.totals.kills}</td>
                  <td className="px-4 py-4 text-right text-sm">{row.totals.redeploys}</td>
                  <td className="px-4 py-4 text-right text-sm">{row.totals.damage}</td>
                  <td className="px-4 py-4 text-right text-sm">{row.totals.assists}</td>
                  <td className="px-4 py-4 text-right text-sm">{row.totals.score}</td>
                  <td className="px-4 py-4 text-right font-display text-2xl leading-none text-primary">
                    {row.total.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AnimatedContent>
      </TabsContent>
    </Tabs>
  );
}
