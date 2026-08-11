import { motion } from "motion/react";

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: "0.4em", rotateX: -60 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default SplitText;
