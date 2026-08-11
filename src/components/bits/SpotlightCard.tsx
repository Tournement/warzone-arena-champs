import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 0 });
  const [active, setActive] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn("relative isolate overflow-hidden", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(300px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

export default SpotlightCard;
