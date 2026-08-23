"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const DURATION = 0.55;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const rm = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={rm ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DURATION, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  delay = 0,
  gap = 0.08,
  className,
}: {
  children: ReactNode;
  delay?: number;
  gap?: number;
  className?: string;
}) {
  const rm = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: rm ? 0 : gap,
            delayChildren: rm ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  y = 24,
  x,
  className,
}: {
  children: ReactNode;
  y?: number;
  x?: number;
  className?: string;
}) {
  const rm = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: rm ? {} : { opacity: 0, ...(x !== undefined ? { x } : { y }) },
        show: {
          opacity: 1,
          ...(x !== undefined ? { x: 0 } : { y: 0 }),
          transition: { duration: DURATION, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
