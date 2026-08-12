import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight, Crosshair } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AnimatedContent from "@/components/bits/AnimatedContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { LIVE_EVENTS } from "@/lib/site-data";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Squad Registration — Blackout Circuit Warzone Tournaments" },
      {
        name: "description",
        content:
          "Register your Warzone squad: pick an event, submit roster Activision IDs, region and stream details, then confirm the ruleset to lock your slot.",
      },
      { property: "og:title", content: "Squad Registration — Blackout Circuit" },
      {
        property: "og:description",
        content: "Detailed Warzone tournament registration form for competitive squads.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

const REGIONS = ["EU", "NA", "APAC", "LATAM"];
const PLATFORMS = ["PC", "PlayStation", "Xbox", "Mixed"];

const rosterMember = z.object({
  gamertag: z.string().trim().min(2, "Gamertag required").max(40),
  activisionId: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9._-]{3,30}#\d{4,10}$/, "Use format Name#1234"),
});

const schema = z.object({
  event: z.string().min(1, "Pick an event"),
  teamName: z.string().trim().min(3, "Team name must be at least 3 characters").max(40),
  tag: z.string().trim().min(2, "Tag required").max(6),
  region: z.string().min(1, "Select a region"),
  platform: z.string().min(1, "Select a platform"),
  captainEmail: z.string().trim().email("Valid email required").max(255),
  discord: z.string().trim().min(2, "Discord handle required").max(60),
  roster: z.array(rosterMember).min(2, "At least two players"),
  stream: z.string().trim().url("Must be a valid URL").max(200).optional().or(z.literal("")),
  notes: z.string().trim().max(600).optional().or(z.literal("")),
  rules: z.literal(true, { message: "You must accept the ruleset" }),
  pov: z.literal(true, { message: "POV recording is mandatory" }),
});

const STEPS = ["Event", "Squad", "Roster", "Confirm"];

function RegisterPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    event: LIVE_EVENTS[0].id,
    teamName: "",
    tag: "",
    region: "",
    platform: "",
    captainEmail: "",
    discord: "",
    roster: [
      { gamertag: "", activisionId: "" },
      { gamertag: "", activisionId: "" },
      { gamertag: "", activisionId: "" },
      { gamertag: "", activisionId: "" },
    ],
    stream: "",
    notes: "",
    rules: false,
    pov: false,
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setMember = (i: number, key: "gamertag" | "activisionId", value: string) =>
    setForm((f) => ({
      ...f,
      roster: f.roster.map((m, idx) => (idx === i ? { ...m, [key]: value } : m)),
    }));

  const submit = () => {
    const payload = {
      ...form,
      roster: form.roster.filter((m) => m.gamertag || m.activisionId),
    };
    const result = schema.safeParse(payload);
    if (!result.success) {
      const flat: Record<string, string> = {};
      for (const issue of result.error.issues) flat[issue.path.join(".")] = issue.message;
      setErrors(flat);
      toast.error("Check the highlighted fields before submitting.");
      return;
    }
    setErrors({});
    setDone(true);
    toast.success("Registration received — check-in link sent to your captain email.");
  };

  const err = (k: string) =>
    errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

  if (done) {
    const event = LIVE_EVENTS.find((e) => e.id === form.event);
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader solid />
        <section className="mx-auto max-w-2xl px-6 py-28 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full border border-primary text-primary">
            <Check className="size-7" />
          </div>
          <h1 className="mt-8 text-5xl leading-none">Slot reserved</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {form.teamName} is queued for {event?.name}. Check-in opens 60 minutes before drop at{" "}
            {event?.starts}.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-8 uppercase tracking-widest">
              <Link to="/leaderboard">View leaderboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 uppercase tracking-widest">
              <Link to="/">Back home</Link>
            </Button>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader solid />

      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.05]" />
        <div className="relative mx-auto max-w-5xl px-6 py-14">
          <p className="label-mono">Season 04 · Squad application</p>
          <h1 className="mt-3 text-[clamp(2.5rem,7vw,5rem)] leading-[0.85]">
            Detailed <span className="text-primary">registration</span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] transition-colors ${
                  i === step
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <span className="font-display text-base leading-none">0{i + 1}</span>
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <AnimatedContent key={step} className="rounded-lg border border-border bg-surface/50 p-6 md:p-10">
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl leading-none">Pick your event</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {LIVE_EVENTS.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => set("event", e.id)}
                    className={`rounded-lg border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                      form.event === e.id
                        ? "border-primary bg-background shadow-[var(--shadow-glow)]"
                        : "border-border bg-background/60"
                    }`}
                  >
                    <span className="clip-tag inline-block bg-primary px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                      {e.state}
                    </span>
                    <h3 className="mt-4 text-2xl leading-none">{e.name}</h3>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {e.mode}
                    </p>
                    <p className="mt-4 font-display text-3xl leading-none text-primary">{e.prize}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{e.starts}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {e.entrants}/{e.capacity} slots filled
                    </p>
                  </button>
                ))}
              </div>
              {err("event")}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl leading-none">Squad details</h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="teamName">Team name</Label>
                  <Input
                    id="teamName"
                    maxLength={40}
                    value={form.teamName}
                    onChange={(e) => set("teamName", e.target.value)}
                    placeholder="Null Protocol"
                  />
                  {err("teamName")}
                </div>
                <div>
                  <Label htmlFor="tag">Team tag</Label>
                  <Input
                    id="tag"
                    maxLength={6}
                    value={form.tag}
                    onChange={(e) => set("tag", e.target.value.toUpperCase())}
                    placeholder="NULL"
                  />
                  {err("tag")}
                </div>
                <div>
                  <Label>Region</Label>
                  <Select value={form.region} onValueChange={(v) => set("region", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {err("region")}
                </div>
                <div>
                  <Label>Platform</Label>
                  <Select value={form.platform} onValueChange={(v) => set("platform", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLATFORMS.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {err("platform")}
                </div>
                <div>
                  <Label htmlFor="captainEmail">Captain email</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    maxLength={255}
                    value={form.captainEmail}
                    onChange={(e) => set("captainEmail", e.target.value)}
                    placeholder="captain@squad.gg"
                  />
                  {err("captainEmail")}
                </div>
                <div>
                  <Label htmlFor="discord">Discord handle</Label>
                  <Input
                    id="discord"
                    maxLength={60}
                    value={form.discord}
                    onChange={(e) => set("discord", e.target.value)}
                    placeholder="captain#0001"
                  />
                  {err("discord")}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl leading-none">Roster & streams</h2>
              <p className="text-sm text-muted-foreground">
                Activision IDs must match the accounts that drop in. Minimum two players.
              </p>
              <div className="space-y-4">
                {form.roster.map((m, i) => (
                  <div key={i} className="grid gap-4 rounded-lg border border-border bg-background/50 p-4 md:grid-cols-[3rem_1fr_1fr]">
                    <p className="font-display text-3xl leading-none text-steel">0{i + 1}</p>
                    <div>
                      <Label htmlFor={`gt-${i}`}>Gamertag</Label>
                      <Input
                        id={`gt-${i}`}
                        maxLength={40}
                        value={m.gamertag}
                        onChange={(e) => setMember(i, "gamertag", e.target.value)}
                        placeholder="SPECTR"
                      />
                      {err(`roster.${i}.gamertag`)}
                    </div>
                    <div>
                      <Label htmlFor={`aid-${i}`}>Activision ID</Label>
                      <Input
                        id={`aid-${i}`}
                        maxLength={40}
                        value={m.activisionId}
                        onChange={(e) => setMember(i, "activisionId", e.target.value)}
                        placeholder="Spectr#1284"
                      />
                      {err(`roster.${i}.activisionId`)}
                    </div>
                  </div>
                ))}
              </div>
              {err("roster")}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="stream">Stream URL (optional)</Label>
                  <Input
                    id="stream"
                    maxLength={200}
                    value={form.stream}
                    onChange={(e) => set("stream", e.target.value)}
                    placeholder="https://twitch.tv/yoursquad"
                  />
                  {err("stream")}
                </div>
                <div>
                  <Label htmlFor="notes">Notes for admins (optional)</Label>
                  <Textarea
                    id="notes"
                    maxLength={600}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Substitutes, scheduling conflicts, prior bans…"
                  />
                  {err("notes")}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl leading-none">Confirm & lock slot</h2>
              <dl className="grid gap-4 rounded-lg border border-border bg-background/50 p-6 text-sm md:grid-cols-2">
                {[
                  ["Event", LIVE_EVENTS.find((e) => e.id === form.event)?.name ?? "—"],
                  ["Team", form.teamName || "—"],
                  ["Tag", form.tag || "—"],
                  ["Region", form.region || "—"],
                  ["Platform", form.platform || "—"],
                  ["Captain", form.captainEmail || "—"],
                  ["Discord", form.discord || "—"],
                  [
                    "Players",
                    String(form.roster.filter((m) => m.gamertag && m.activisionId).length),
                  ],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <dt className="label-mono">{k}</dt>
                    <dd className="text-right text-muted-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="space-y-4">
                <label className="flex items-start gap-3 text-sm">
                  <Checkbox
                    checked={form.rules}
                    onCheckedChange={(v) => set("rules", v === true)}
                    aria-label="Accept ruleset"
                  />
                  <span className="text-muted-foreground">
                    I accept the Blackout Circuit ruleset, Ricochet anti-cheat verification and
                    admin decisions as final.
                  </span>
                </label>
                {err("rules")}
                <label className="flex items-start gap-3 text-sm">
                  <Checkbox
                    checked={form.pov}
                    onCheckedChange={(v) => set("pov", v === true)}
                    aria-label="Accept POV recording"
                  />
                  <span className="text-muted-foreground">
                    Every player will record full-match POV and keep it for 14 days.
                  </span>
                </label>
                {err("pov")}
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
            <Button
              variant="outline"
              className="rounded-full uppercase tracking-widest"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ChevronLeft className="size-4" /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button
                className="rounded-full px-8 uppercase tracking-widest"
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              >
                Next <ChevronRight className="size-4" />
              </Button>
            ) : (
              <Button className="pulse-dot rounded-full px-8 uppercase tracking-widest" onClick={submit}>
                <Crosshair className="size-4" /> Submit application
              </Button>
            )}
          </div>
        </AnimatedContent>
      </section>

      <SiteFooter />
    </div>
  );
}
