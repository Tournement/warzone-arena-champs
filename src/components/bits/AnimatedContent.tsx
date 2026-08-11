import { motion } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function AnimatedContent({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 1,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}) {
  const o = offsets[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: o.x * distance, y: o.y * distance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedContent;
