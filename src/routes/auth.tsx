import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AnimatedContent from "@/components/bits/AnimatedContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { SL_FLAG } from "@/lib/site-data";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Squad Zone APAC Arena" },
      {
        name: "description",
        content:
          "Sign in to the Squad Zone APAC Arena admin console to manage squads, match results and tournament point tables.",
      },
      { property: "og:title", content: "Admin Sign In — Squad Zone APAC Arena" },
      {
        property: "og:description",
        content: "Tournament admin access for the Squad Zone APAC Arena scoreboard console.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

const credentials = z.object({
  email: z.string().trim().email("Valid email required").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/scoreboard", replace: true });
    });
  }, [navigate]);

  const submit = async () => {
    const parsed = credentials.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]!.message);
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (!data.session) {
          setSent(true);
          toast.success("Confirm your email to finish creating the account.");
          return;
        }
        navigate({ to: "/admin/scoreboard", replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: "/admin/scoreboard", replace: true });
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    try {
      await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader solid />
      <section className="mx-auto max-w-md px-6 py-20">
        <AnimatedContent className="rounded-lg border border-border bg-surface/60 p-8">
          <p className="label-mono">{SL_FLAG} Admin access</p>
          <h1 className="mt-3 text-4xl leading-none">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">
            Scoreboard editing requires an admin role. New accounts are read-only until an admin role
            is granted.
          </p>

          {sent ? (
            <p className="mt-8 rounded-lg border border-primary/50 bg-background/60 p-4 text-sm text-muted-foreground">
              Check your inbox to confirm the email address, then sign in.
            </p>
          ) : (
            <div className="mt-8 space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@squadzone.lk"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  maxLength={72}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <Button
                className="w-full rounded-full uppercase tracking-widest"
                onClick={submit}
                disabled={busy}
              >
                {mode === "signin" ? "Sign in" : "Create account"}
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full uppercase tracking-widest"
                onClick={google}
                disabled={busy}
              >
                Continue with Google
              </Button>
              <button
                className="w-full text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              >
                {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
              </button>
            </div>
          )}
        </AnimatedContent>
      </section>
      <SiteFooter />
    </div>
  );
}
