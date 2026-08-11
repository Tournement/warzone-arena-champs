export function Marquee({
  items,
  speed = 28,
  reverse = false,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="marquee-mask relative flex overflow-hidden">
      <div
        className="flex shrink-0 items-center gap-10 pr-10"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap font-display text-3xl tracking-widest text-steel md:text-4xl"
          >
            {item}
            <span className="size-1.5 rotate-45 bg-primary" />
          </span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="flex shrink-0 items-center gap-10 pr-10"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap font-display text-3xl tracking-widest text-steel md:text-4xl"
          >
            {item}
            <span className="size-1.5 rotate-45 bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
