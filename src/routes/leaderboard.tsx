import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, TrendingDown, TrendingUp, Minus } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AnimatedContent from "@/components/bits/AnimatedContent";
import CountUp from "@/components/bits/CountUp";
import SpotlightCard from "@/components/bits/SpotlightCard";
import { Button } from "@/components/ui/button";
import { LEADERBOARD, SL_FLAG } from "@/lib/site-data";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Season 04 Leaderboard — Blackout Circuit Warzone" },
      {
        name: "description",
        content:
          "Full Warzone circuit standings: squad points, K/D, wins, region and prize earnings for every ranked roster in Season 04.",
      },
      { property: "og:title", content: "Season 04 Leaderboard — Blackout Circuit" },
      {
        property: "og:description",
        content: "Complete Warzone squad standings with points, K/D, wins and earnings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeaderboardPage,
});

const REGIONS = ["ALL", "EU", "NA", "APAC", "LATAM"] as const;

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };

function LeaderboardPage() {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("ALL");
  const rows = useMemo(
    () => (region === "ALL" ? LEADERBOARD : LEADERBOARD.filter((r) => r.region === region)),
    [region],
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader solid />

      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.05]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <AnimatedContent>
            <p className="label-mono">Season 04 · Circuit points</p>
            <h1 className="mt-3 text-[clamp(2.75rem,8vw,6rem)] leading-[0.85]">
              Who&apos;s on <span className="text-primary">top</span>
            </h1>
          </AnimatedContent>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { node: <CountUp to={264} />, label: "Ranked squads" },
              { node: <CountUp to={1482} separator="," />, label: "Top score" },
              { node: <CountUp to={231} prefix="$" suffix="K" />, label: "Season payouts" },
            ].map((s) => (
              <SpotlightCard
                key={s.label}
                className="rounded-lg border border-border bg-surface/60 p-5"
              >
                <p className="font-display text-4xl leading-none text-primary">{s.node}</p>
                <p className="label-mono mt-2">{s.label}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap items-center gap-2">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`rounded-full border px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] transition-colors ${
                region === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="mt-8 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-3xl text-left">
            <thead className="bg-surface">
              <tr>
                <th className="label-mono px-5 py-4">#</th>
                <th className="label-mono px-5 py-4">Squad</th>
                <th className="label-mono px-5 py-4">Captain</th>
                <th className="label-mono px-5 py-4">Region</th>
                <th className="label-mono px-5 py-4 text-right">Wins</th>
                <th className="label-mono px-5 py-4 text-right">K/D</th>
                <th className="label-mono px-5 py-4 text-right">Earnings</th>
                <th className="label-mono px-5 py-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const Trend = trendIcon[r.trend];
                return (
                  <motion.tr
                    key={r.team}
                    className="border-t border-border transition-colors hover:bg-surface/60"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <td className="px-5 py-4 font-display text-2xl leading-none text-steel">
                      {String(r.pos).padStart(2, "0")}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold tracking-wide">
                      <span className="flex items-center gap-2">
                        {r.team}
                        <Trend
                          className={`size-3.5 ${
                            r.trend === "up"
                              ? "text-primary"
                              : r.trend === "down"
                                ? "text-destructive"
                                : "text-steel"
                          }`}
                        />
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{r.player}</td>
                    <td className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {r.region}
                    </td>
                    <td className="px-5 py-4 text-right text-sm text-muted-foreground">{r.wins}</td>
                    <td className="px-5 py-4 text-right text-sm text-muted-foreground">{r.kd}</td>
                    <td className="px-5 py-4 text-right text-sm text-muted-foreground">
                      {r.earnings}
                    </td>
                    <td className="px-5 py-4 text-right font-display text-2xl leading-none text-primary">
                      <CountUp to={r.pts} separator="," duration={1.2} />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <AnimatedContent className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-lg border border-border bg-surface/50 p-8">
          <div>
            <h2 className="text-3xl leading-none">Not on the board yet?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Submit a roster and start earning circuit points this weekend.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-full px-8 font-semibold uppercase tracking-widest">
            <Link to="/register">
              Apply now <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Button>
        </AnimatedContent>
      </section>

      <SiteFooter />
    </div>
  );
}
