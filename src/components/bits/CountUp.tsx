import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export function CountUp({
  to,
  duration = 1.6,
  prefix = "",
  suffix = "",
  separator = "",
  decimals = 0,
  className,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const formatted = value.toFixed(decimals);
  const withSeparator = separator
    ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : formatted;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {withSeparator}
      {suffix}
    </span>
  );
}

export default CountUp;
