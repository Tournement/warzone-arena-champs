import { createFileRoute } from "@tanstack/react-router";
import ghost from "@/assets/ghost.jpg.asset.json";
import operator from "@/assets/operator.png.asset.json";
import { Button } from "@/components/ui/button";
import { Crosshair, Trophy, Users, Zap, ChevronRight, Instagram, Youtube, Twitch } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import AnimatedContent from "@/components/bits/AnimatedContent";
import SplitText from "@/components/bits/SplitText";
import CountUp from "@/components/bits/CountUp";
import SpotlightCard from "@/components/bits/SpotlightCard";
import Marquee from "@/components/bits/Marquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blackout Circuit — COD Warzone Tournaments & Cash Prizes" },
      {
        name: "description",
        content:
          "Enter weekly Call of Duty: Warzone tournaments. $40K monthly prize pool, live brackets, verified squads and anti-cheat enforced lobbies.",
      },
      { property: "og:title", content: "Blackout Circuit — COD Warzone Tournaments" },
      {
        property: "og:description",
        content: "Weekly Warzone tournaments with cash prize pools and live brackets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["Home", "Tournaments", "Brackets", "Teams", "Community"];

const TICKER = [
  "REGISTRATION OPEN",
  "SEASON 04",
  "$40K PRIZE POOL",
  "RICOCHET VERIFIED",
  "64 SQUADS",
];

const TOURNAMENTS = [
  {
    name: "Verdansk Verdict",
    mode: "Quads · Battle Royale",
    prize: "$12,000",
    date: "Fri 14 Aug · 20:00 UTC",
    slots: "38/64 squads",
    status: "Registering",
  },
  {
    name: "Resurgence Rampage",
    mode: "Trios · Resurgence",
    prize: "$6,500",
    date: "Sat 15 Aug · 18:00 UTC",
    slots: "51/64 squads",
    status: "Registering",
  },
  {
    name: "Blackout Invitational",
    mode: "Duos · Kill Race",
    prize: "$20,000",
    date: "Sun 23 Aug · 21:00 UTC",
    slots: "Invite only",
    status: "Qualifiers",
  },
];

const RULES = [
  { icon: Crosshair, title: "Anti-cheat enforced", text: "Ricochet verification and mandatory POV recording for every finalist." },
  { icon: Trophy, title: "Payouts in 48h", text: "Prize splits hit squad wallets within two days of the grand final." },
  { icon: Users, title: "Verified squads", text: "Activision ID linked rosters. No smurfs, no ringers, no exceptions." },
  { icon: Zap, title: "Live brackets", text: "Point tracking updates in real time across every lobby and round." },
];

const STANDINGS = [
  { pos: "01", team: "NULL PROTOCOL", pts: 1482, kd: "4.12" },
  { pos: "02", team: "ASHFALL", pts: 1377, kd: "3.88" },
  { pos: "03", team: "KILO SEVEN", pts: 1299, kd: "3.61" },
  { pos: "04", team: "DEADZONE GC", pts: 1140, kd: "3.20" },
  { pos: "05", team: "GRAVEYARD SHIFT", pts: 1088, kd: "3.04" },
];

function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        className="absolute inset-x-0 top-0 z-20"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="#" className="group flex items-center gap-2">
            <Crosshair className="size-5 text-primary transition-transform duration-500 group-hover:rotate-90" />
            <span className="font-display text-2xl leading-none tracking-widest">Blackout</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item, i) => (
              <a
                key={item}
                href="#"
                className={`story-link text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:text-primary ${
                  i === 0 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {[Instagram, Youtube, Twitch].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social profile"
                className="grid size-9 place-items-center rounded-full border border-border/70 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </motion.header>

      {/* HERO */}
      <section ref={heroRef} className="relative isolate overflow-hidden">
        <motion.img
          src={ghost.url}
          alt="Simon Ghost Riley operator in tactical skull mask"
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 size-full object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 grid-lines opacity-25" />
        <div className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.05]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 scan-sweep opacity-40" />
        <div className="absolute inset-0 fade-bottom" />

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative mx-auto max-w-7xl px-6 pb-16 pt-40 md:pb-24 md:pt-56"
        >
          <h1 className="max-w-4xl text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.82]">
            <SplitText text="Warzone" delay={0.15} />
            <br />
            <SplitText text="Tournaments" className="text-primary" delay={0.5} />
          </h1>

          <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <AnimatedContent delay={0.9} className="max-w-md">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Blackout Circuit runs weekly Call of Duty: Warzone competition — drop-in
                qualifiers, seeded brackets and cash on the line every single weekend.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  className="pulse-dot rounded-full px-8 font-semibold uppercase tracking-widest transition-transform duration-300 hover:scale-105"
                >
                  Register squad
                </Button>
                <a
                  href="#tournaments"
                  className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  View schedule
                  <span className="grid size-9 place-items-center rounded-full border border-border/70 transition-all duration-300 group-hover:translate-x-1 group-hover:border-primary group-hover:text-primary">
                    <ChevronRight className="size-4" />
                  </span>
                </a>
              </div>
            </AnimatedContent>

            <div className="flex flex-wrap gap-4">
              {[
                { node: <CountUp to={40} prefix="$" suffix="K" />, label: "Monthly pool", accent: true },
                { node: <CountUp to={10} suffix="K+" />, label: "Ranked players" },
                { node: <CountUp to={64} />, label: "Squads per event" },
              ].map((s, i) => (
                <AnimatedContent key={s.label} direction="up" delay={1 + i * 0.12}>
                  <SpotlightCard className="min-w-[10rem] rounded-lg border border-border/60 bg-surface/60 p-5 backdrop-blur transition-colors hover:border-primary/60">
                    <p
                      className={`font-display text-4xl leading-none ${s.accent ? "text-primary" : ""}`}
                    >
                      {s.node}
                    </p>
                    <p className="label-mono mt-2">{s.label}</p>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* TICKER */}
      <div className="border-y border-border bg-surface/40 py-5">
        <Marquee items={TICKER} speed={30} />
      </div>

      {/* TOURNAMENTS */}
      <section id="tournaments" className="mx-auto max-w-7xl px-6 py-24">
        <AnimatedContent className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="label-mono">Upcoming events</p>
            <h2 className="mt-3 text-5xl leading-none md:text-6xl">The schedule</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Entry closes 24 hours before drop. Rosters lock at check-in.
          </p>
        </AnimatedContent>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TOURNAMENTS.map((t, i) => (
            <AnimatedContent key={t.name} delay={i * 0.14} className="h-full">
              <SpotlightCard className="group flex h-full flex-col justify-between rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60">
                <div>
                  <span className="clip-tag inline-block bg-primary px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                    {t.status}
                  </span>
                  <h3 className="mt-5 text-3xl leading-none transition-colors group-hover:text-primary">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t.mode}
                  </p>
                </div>
                <dl className="mt-8 space-y-3 border-t border-border pt-5 text-sm">
                  <div className="flex items-baseline justify-between">
                    <dt className="label-mono">Prize</dt>
                    <dd className="font-display text-3xl leading-none text-primary">{t.prize}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="label-mono">Drop</dt>
                    <dd className="text-muted-foreground">{t.date}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="label-mono">Slots</dt>
                    <dd className="text-muted-foreground">{t.slots}</dd>
                  </div>
                </dl>
                <Button
                  variant="outline"
                  className="mt-6 w-full rounded-full border-border font-semibold uppercase tracking-widest transition-colors hover:border-primary hover:text-primary"
                >
                  Enter lobby
                </Button>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </section>

      {/* FORMAT / OPERATOR SPLIT */}
      <section className="relative border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <AnimatedContent direction="right">
            <div className="group relative overflow-hidden rounded-lg border border-border">
              <img
                src={operator.url}
                alt="Call of Duty operator briefing before a Warzone match"
                className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.06]" />
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-5 backdrop-blur">
                <p className="label-mono">Season 04 · Circuit brief</p>
                <p className="mt-2 font-display text-2xl leading-none">Hold the line, take the pot.</p>
              </div>
            </div>
          </AnimatedContent>

          <div>
            <AnimatedContent direction="left">
              <p className="label-mono">Ruleset</p>
              <h2 className="mt-3 text-5xl leading-none md:text-6xl">
                Built for <span className="text-primary">serious</span> squads
              </h2>
            </AnimatedContent>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {RULES.map((r, i) => (
                <AnimatedContent key={r.title} delay={0.15 + i * 0.12}>
                  <div className="group">
                    <r.icon className="size-6 text-primary transition-transform duration-300 group-hover:scale-125" />
                    <h3 className="mt-4 text-xl leading-none">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STANDINGS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <AnimatedContent className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="label-mono">Circuit points · Season 04</p>
            <h2 className="mt-3 text-5xl leading-none md:text-6xl">Standings</h2>
          </div>
          <a
            href="#"
            className="story-link text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Full leaderboard
          </a>
        </AnimatedContent>

        <div className="mt-8 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left">
            <thead className="bg-surface">
              <tr>
                <th className="label-mono px-6 py-4">#</th>
                <th className="label-mono px-6 py-4">Squad</th>
                <th className="label-mono px-6 py-4 text-right">K/D</th>
                <th className="label-mono px-6 py-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {STANDINGS.map((s, i) => (
                <motion.tr
                  key={s.team}
                  className="border-t border-border transition-colors hover:bg-surface/60"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <td className="px-6 py-4 font-display text-2xl leading-none text-steel">{s.pos}</td>
                  <td className="px-6 py-4 text-sm font-semibold tracking-wide">{s.team}</td>
                  <td className="px-6 py-4 text-right text-sm text-muted-foreground">{s.kd}</td>
                  <td className="px-6 py-4 text-right font-display text-2xl leading-none text-primary">
                    <CountUp to={s.pts} separator="," duration={1.4} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden border-t border-border">
        <img
          src={ghost.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover object-center opacity-40"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.06]" />
        <AnimatedContent className="relative mx-auto max-w-3xl px-6 py-28 text-center">
          <h2 className="text-[clamp(2.5rem,7vw,5rem)] leading-[0.85]">
            Next drop in <span className="text-primary">3 days</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-muted-foreground">
            Grab a slot for Verdansk Verdict before check-in closes. Four players, one bracket,
            twelve grand.
          </p>
          <Button
            size="lg"
            className="pulse-dot mt-8 rounded-full px-10 font-semibold uppercase tracking-widest transition-transform duration-300 hover:scale-105"
          >
            Register squad
          </Button>
        </AnimatedContent>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <Crosshair className="size-4 text-primary" />
            <span className="font-display text-lg tracking-widest text-foreground">Blackout Circuit</span>
          </p>
          <p>Unofficial community event series. Not affiliated with Activision.</p>
        </div>
      </footer>
    </div>
  );
}
