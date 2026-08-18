import AnimatedContent from "@/components/bits/AnimatedContent";
import { RULES_DATELINE, RULE_SECTIONS } from "@/lib/rules-data";

export default function RulesBoard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "space-y-4" : "space-y-5"}>
      <p className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {RULES_DATELINE}
      </p>
      <div className={compact ? "space-y-4" : "grid gap-5 lg:grid-cols-2"}>
        {RULE_SECTIONS.map((section, i) => (
          <AnimatedContent key={section.title} delay={Math.min(i, 6) * 0.06}>
            <article className="h-full rounded-lg border border-border bg-surface/60 p-6 transition-colors hover:border-primary/60">
              <h3 className="flex items-center gap-3 text-2xl leading-none">
                <span aria-hidden="true" className="text-xl">
                  {section.icon}
                </span>
                <span className="text-foreground">{section.title}</span>
              </h3>
              {section.intro ? (
                <p className="mt-3 text-sm text-muted-foreground">{section.intro}</p>
              ) : null}
              <ul className="mt-4 space-y-3">
                {section.items.map((item, idx) => {
                  const isObj = typeof item !== "string";
                  const text = isObj ? item.text : item;
                  return (
                    <li key={idx} className="text-sm leading-relaxed text-muted-foreground">
                      <span className="mr-2 font-display text-sm text-primary">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-foreground/90">{text}</span>
                      {isObj ? (
                        <>
                          <ul className="mt-2 ml-8 list-disc space-y-1.5 text-xs">
                            {item.sub.map((s) => (
                              <li key={s} className="text-muted-foreground">
                                {s}
                              </li>
                            ))}
                          </ul>
                          {item.note ? (
                            <p className="mt-2 ml-8 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                              {item.note}
                            </p>
                          ) : null}
                        </>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
              {section.callout ? (
                <p className="mt-5 rounded-md border-l-2 border-destructive bg-destructive/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-destructive">
                  {section.callout}
                </p>
              ) : null}
            </article>
          </AnimatedContent>
        ))}
      </div>
    </div>
  );
}
