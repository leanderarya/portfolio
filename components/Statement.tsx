"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LuLayers, LuCodeXml, LuRocket, LuPenTool } from "react-icons/lu";
import { EASE, Stagger, StaggerItem } from "@/components/motion/primitives";

const pills = [
  { icon: <LuLayers className="text-base text-lime-600" />, label: "System Architecture" },
  { icon: <LuCodeXml className="text-base text-lime-600" />, label: "Clean Code & Type Safety" },
  { icon: <LuRocket className="text-base text-lime-600" />, label: "CI/CD & Cloud" },
  { icon: <LuPenTool className="text-base text-lime-600" />, label: "Pixel-Precise Frontend" },
];

export default function Statement() {
  const rm = useReducedMotion();
  const phraseIn = (delay: number) => ({
    initial: rm ? false : ({ opacity: 0, y: 18 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: { duration: 0.55, ease: EASE, delay },
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-y border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Philosophy</span>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-snug mt-4">
          <motion.span className="inline-block" {...phraseIn(0)}>
            I build by blending
          </motion.span>{" "}
          <span className="relative inline-block font-bold">
            clear architecture,
            <motion.span
              aria-hidden
              className="absolute left-0 -bottom-1 h-1 w-full bg-lime origin-left rounded-full"
              initial={rm ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
            />
          </span>
          <motion.span className="inline-block" {...phraseIn(0.2)}>
            quality-first engineering, and user empathy to{" "}
            <span className="font-editorial italic">craft products</span> that solve real problems.
          </motion.span>
        </h2>

        <Stagger className="flex flex-wrap items-center justify-center gap-2.5 mt-8 sm:mt-10" gap={0.07}>
          {pills.map((p) => (
            <StaggerItem key={p.label} y={14}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E7EB] shadow-sm text-xs font-semibold text-neutral-700">
                {p.icon}
                {p.label}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
