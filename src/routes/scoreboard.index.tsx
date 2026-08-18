import { createFileRoute, Link } from "@tanstack/react-router";
import ghost from "@/assets/ghost.jpg.asset.json";
import bloodStrike from "@/assets/blood-strike.jpg.asset.json";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AnimatedContent from "@/components/bits/AnimatedContent";
import { ChevronRight, Lock } from "lucide-react";
import { SL_FLAG } from "@/lib/site-data";

export const Route = createFileRoute("/scoreboard/")({
  head: () => ({
    meta: [
      { title: "Scoreboard — Squad Zone APAC Arena Tournament Points" },
      {
        name: "description",
        content:
          "Pick a game to view live Squad Zone APAC Arena tournament points: Warzone Resurgence team standings and the MVP board. Blood Strike coming soon.",
      },
      { property: "og:title", content: "Scoreboard — Squad Zone APAC Arena" },
      {
        property: "og:description",
        content: "Live tournament point tables and MVP boards for Squad Zone APAC Arena events.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScoreboardPicker,
});

function ScoreboardPicker() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader solid />

      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.05]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="label-mono">{SL_FLAG} Scoreboard</p>
          <h1 className="mt-3 text-[clamp(2.5rem,7vw,5rem)] leading-[0.85]">
            Select <span className="text-primary">your game</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm text-muted-foreground">
            Choose a title to open its live point table. Points are calculated from placement and
            per-player match stats entered by tournament admins.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-2">
        <AnimatedContent>
          <Link
            to="/scoreboard/warzone"
            className="group relative block overflow-hidden rounded-lg border border-border transition-colors hover:border-primary/70"
          >
            <img
              src={ghost.url}
              alt="Call of Duty Warzone operator artwork"
              className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/60" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="clip-tag inline-block bg-primary px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                Live
              </span>
              <h2 className="mt-3 text-4xl leading-none">Warzone</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Resurgence · 6 matches · team standings + MVP board
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Open scoreboard <ChevronRight className="size-4" />
              </span>
            </div>
          </Link>
        </AnimatedContent>

        <AnimatedContent delay={0.12}>
          <div className="relative overflow-hidden rounded-lg border border-border opacity-80">
            <img
              src={bloodStrike.url}
              alt="Blood Strike hooded operative key art"
              className="aspect-4/3 w-full object-cover grayscale-[0.2]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/65" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="clip-tag inline-block bg-muted px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Coming soon
              </span>
              <h2 className="mt-3 text-4xl leading-none">Blood Strike</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Point tables open once the first Blood Strike bracket is scheduled.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Lock className="size-4" /> Locked
              </span>
            </div>
          </div>
        </AnimatedContent>
      </section>

      <SiteFooter />
    </div>
  );
}
