import { Link } from "@tanstack/react-router";
import { Crosshair, Instagram, Youtube, Twitch } from "lucide-react";
import { motion } from "motion/react";
import { NAV, SL_FLAG } from "@/lib/site-data";

export default function SiteHeader({ solid = false }: { solid?: boolean }) {
  return (
    <motion.header
      className={
        solid
          ? "sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur"
          : "absolute inset-x-0 top-0 z-20"
      }
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="group flex items-center gap-2">
          <Crosshair className="size-5 text-primary transition-transform duration-500 group-hover:rotate-90" />
          <span className="font-display text-2xl leading-none tracking-widest">Blackout</span>
          <span className="ml-1 text-lg" aria-label="Sri Lanka">
            {SL_FLAG}
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              {...(item.hash ? { hash: item.hash } : {})}
              className="story-link text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {[Instagram, Youtube, Twitch].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="Social profile"
              className="hidden size-9 place-items-center rounded-full border border-border/70 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary sm:grid"
            >
              <Icon className="size-4" />
            </a>
          ))}
          <Link
            to="/register"
            className="rounded-full bg-primary px-5 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-transform duration-300 hover:scale-105"
          >
            Apply
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
