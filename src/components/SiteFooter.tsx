import { Crosshair } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2">
          <Crosshair className="size-4 text-primary" />
          <span className="font-display text-lg tracking-widest text-foreground">
            Blackout Circuit
          </span>
        </p>
        <p>Unofficial community event series. Not affiliated with Activision.</p>
      </div>
    </footer>
  );
}
