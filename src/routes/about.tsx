import { createFileRoute } from "@tanstack/react-router";
import { Scale, Trophy, Users, ShieldCheck } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AnimatedContent from "@/components/bits/AnimatedContent";
import SpotlightCard from "@/components/bits/SpotlightCard";
import operator from "@/assets/operator.png.asset.json";
import { BRAND_FULL, SL_FLAG, TAGLINE } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Squad Zone APAC Arena Esports Committee" },
      {
        name: "description",
        content:
          "Squad Zone APAC Arena is a Sri Lankan competitive esports tournament committee running organized, high-stakes Warzone Resurgence events with real cash prize pools.",
      },
      { property: "og:title", content: "About Squad Zone APAC Arena" },
      {
        property: "og:description",
        content:
          "How Squad Zone APAC Arena started, why we run tournaments, and what we stand for: fair competition, real stakes, community first.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: Scale,
    title: "Fair Competition",
    text: "Every player should have the same opportunity to win. We use strict anti cheat measures, mandatory screen recording or livestream requirements and transparent scoring systems to keep matches as fair as possible.",
  },
  {
    icon: Trophy,
    title: "Real Stakes",
    text: "Winning should actually mean something. Our tournaments feature genuine cash prize pools with the goal of rewarding the teams and players who put in the work. We also aim to keep prize distribution quick and straightforward once the required verification is completed.",
  },
  {
    icon: Users,
    title: "Community First",
    text: "Squad Zone is being built around its players. Whether you're a competitive player, a casual squad looking for something different or someone who simply enjoys watching tournaments, you're part of the community we're trying to build.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Standards",
    text: "Our events are built around structured rulebooks, dedicated tournament admins, clear scoring systems, conduct guidelines and proper procedures for handling disputes. As we grow, we want the production and organization of our events to grow with us.",
  },
];

function Section({
  id,
  label,
  title,
  children,
}: {
  id?: string;
  label?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatedContent className="scroll-mt-24" >
      <section id={id} className="scroll-mt-28 border-t border-border pt-12">
        {label ? <p className="label-mono">{label}</p> : null}
        <h2 className="mt-3 text-4xl leading-none md:text-5xl">{title}</h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </section>
    </AnimatedContent>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader solid />

      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={operator.url}
          alt="Call of Duty operator before a Warzone match"
          className="absolute inset-0 size-full object-cover object-[60%_20%] opacity-35"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.05]" />
        <div className="relative mx-auto max-w-4xl px-6 py-24">
          <p className="label-mono">
            {SL_FLAG} {BRAND_FULL}
          </p>
          <h1 className="mt-4 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.85]">
            About <span className="text-primary">us</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Squad Zone APAC Arena is a competitive esports tournament committee bringing organized,
            high stakes gaming events to Sri Lanka and eventually the wider APAC region.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-14 px-6 py-20">
        <AnimatedContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We started with a pretty simple idea. There are thousands of talented players here who
            take gaming seriously, but there aren't always enough proper opportunities to actually
            compete, prove themselves and win something meaningful. We wanted to build something
            that felt more like a real tournament and less like another random custom lobby.
          </p>
        </AnimatedContent>

        <Section label="Origins" title="Where It Started">
          <p>The idea behind Squad Zone actually goes back further than you might think.</p>
          <p>
            A few of us had talked about running a tournament just before COVID hit. We had the basic
            idea, talked about formats, teams and even how we could handle the matches, but then
            everything changed. The tournament never happened and the project was basically put on
            hold.
          </p>
          <p>
            For a while, it was just one of those ideas that came up every now and then. Someone
            would mention it in a conversation, we'd talk about how cool it would be to actually run
            a proper tournament, and then life would get in the way.
          </p>
          <p className="text-foreground">Then in 2025, the idea came back properly.</p>
          <p>
            What started as a few conversations turned into late night planning sessions, arguments
            over rules, discussions about prize pools, team formats and how we could actually make
            the experience fair for everyone. We spent a lot of time figuring out what we didn't want
            Squad Zone to become just as much as what we wanted it to be.
          </p>
          <p>
            We didn't want another tournament where the rules are unclear, players don't know how
            points are calculated and disputes are handled randomly. We wanted something organized
            from the beginning.
          </p>
          <p>That's how Squad Zone APAC Arena started taking shape.</p>
        </Section>

        <Section id="vision" label="Our vision" title="Why We Do This">
          <p>The goal has always been pretty straightforward.</p>
          <p className="font-display text-2xl leading-none text-primary">
            Give competitive gamers a proper platform where they can actually prove themselves.
          </p>
          <p>
            We wanted players to know that when they join a Squad Zone event, they're walking into a
            properly organized competition. There are rules, there are admins, there are anti cheat
            measures, there is a scoring system and most importantly, there is something worth
            fighting for.
          </p>
          <p>
            Our first focus is Warzone Resurgence because that's where the idea really started taking
            shape. The fast pace, squad based gameplay and constant pressure make it perfect for
            competitive tournaments.
          </p>
          <p className="text-foreground">But Warzone is only the beginning.</p>
          <p>
            As the community grows, we want Squad Zone to expand into other competitive titles and
            eventually build a proper tournament circuit where teams can return event after event,
            build reputations and compete against some of the best players around.
          </p>
        </Section>

        <Section label="Roots" title="Built From The Community">
          <p>
            Squad Zone wasn't created by a large esports company with a massive production team
            behind it.
          </p>
          <p>
            It started with gamers who wanted to build something they themselves would actually want
            to participate in.
          </p>
          <p>
            We've had plenty of discussions where one person thinks a rule is completely unfair,
            someone else wants to change the scoring system, and another person is already thinking
            about how we're going to deal with a team trying to exploit a loophole. That's honestly
            part of building something from scratch.
          </p>
          <p>
            A lot of the little things we focus on come from experiences we've had in gaming
            ourselves. We've seen tournaments where teams wait days for prize money, matches get
            delayed with barely any communication, or disputes turn into arguments because there was
            no proper system in place.
          </p>
          <p className="text-foreground">We want to do things differently.</p>
        </Section>

        <AnimatedContent>
          <section className="border-t border-border pt-12">
            <p className="label-mono">Principles</p>
            <h2 className="mt-3 text-4xl leading-none md:text-5xl">What We Stand For</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {VALUES.map((v) => (
                <SpotlightCard
                  key={v.title}
                  className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/60"
                >
                  <v.icon className="size-6 text-primary" />
                  <h3 className="mt-4 text-2xl leading-none">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </SpotlightCard>
              ))}
            </div>
          </section>
        </AnimatedContent>

        <Section label="Roadmap" title="What's Next">
          <p>The first few tournaments are only the beginning.</p>
          <p>
            Our long term goal is to turn Squad Zone APAC Arena into a recognizable competitive
            gaming platform in Sri Lanka, with regular tournaments, bigger prize pools, more games
            and eventually teams competing throughout the region.
          </p>
          <p className="text-foreground">We know we're starting small. That's intentional.</p>
          <p>
            Every major esports organization started somewhere, and we'd rather build Squad Zone
            properly one tournament at a time than rush into something we're not ready for.
          </p>
          <p>
            So whether you're here to compete, support your squad, watch the action or simply see
            what we're building, you're welcome.
          </p>
          <p className="text-foreground">This is only the beginning.</p>
        </Section>

        <AnimatedContent className="border-t border-border pt-12 text-center">
          <p className="font-display text-3xl leading-none text-primary md:text-4xl">
            — {TAGLINE.replace(/\.$/, "")} —
          </p>
        </AnimatedContent>
      </div>

      <SiteFooter />
    </div>
  );
}
