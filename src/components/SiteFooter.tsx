import { Link } from "@tanstack/react-router";
import { Crosshair, Instagram, Twitch, Youtube } from "lucide-react";
import { BRAND, BRAND_FULL, BRAND_SUFFIX, SL_FLAG, TAGLINE } from "@/lib/site-data";

const TILES = [
  { label: "About Us", to: "/about" as const, hash: undefined, text: "Who runs the arena" },
  { label: "Our Vision", to: "/about" as const, hash: "vision", text: "Where we're taking it" },
  { label: "Scoreboard", to: "/scoreboard" as const, hash: undefined, text: "Live point tables" },
  { label: "Register", to: "/register" as const, hash: undefined, text: "Claim a squad slot" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-3 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((tile) => (
          <Link
            key={tile.label}
            to={tile.to}
            {...(tile.hash ? { hash: tile.hash } : {})}
            className="group rounded-lg border border-border bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary"
          >
            <p className="font-display text-xl leading-none tracking-widest transition-colors group-hover:text-primary">
              {tile.label}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{tile.text}</p>
          </Link>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <Crosshair className="size-4 text-primary" />
            <span className="text-base font-semibold italic tracking-wide text-foreground">
              {BRAND}
            </span>
            <span className="font-display text-base tracking-widest text-primary">
              {BRAND_SUFFIX}
            </span>
            <span aria-label="Sri Lanka">{SL_FLAG}</span>
          </p>
          <div className="flex items-center gap-3">
            {[Instagram, Youtube, Twitch].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social profile"
                className="grid size-8 place-items-center rounded-full border border-border/70 transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="uppercase tracking-[0.2em]">
            {BRAND_FULL}
            <span className="ml-1 align-super text-[0.625rem] text-primary">®</span> — {TAGLINE}
          </p>
          <p>
            © {new Date().getFullYear()} {BRAND_FULL}
            <span className="align-super text-[0.625rem] text-primary">®</span> · All rights
            reserved. Unofficial community event series, not affiliated with Activision.
          </p>
        </div>
      </div>
    </footer>
  );
}
