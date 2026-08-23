"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaDiagramProject, FaCode, FaRocket } from "react-icons/fa6";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";

const steps = [
  {
    n: "01",
    title: "Discover & Architect",
    desc: "Analyzing technical requirements, database models, and user journeys to construct a robust system blueprint.",
    tag: "System Design & Schema",
    icon: <FaDiagramProject />,
  },
  {
    n: "02",
    title: "Build & Optimize",
    desc: "Writing modular, type-safe code with React / Next.js and Laravel, ensuring high performance, SEO, and responsive accessibility.",
    tag: "Clean Code & Best Practices",
    icon: <FaCode />,
  },
  {
    n: "03",
    title: "Deploy & Scale",
    desc: "Configuring deployment pipelines and containerizing services to ship reliable applications to production.",
    tag: "CI/CD & Cloud",
    icon: <FaRocket />,
  },
];

export default function Process() {
  const rm = useReducedMotion();

  return (
    <section id="process" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
          / Engineering Process
        </span>
        <h2 className="text-3xl sm:text-5xl font-editorial text-neutral-900 mt-2">Here&apos;s how I work</h2>
        <p className="text-sm text-neutral-600 mt-3">
          Combining engineering rigor, clean code architecture, and high aesthetic standards from inception to deployment.
        </p>
      </Reveal>

      <div className="relative md:mt-8">

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" gap={0.1}>
          {steps.map((s, i) => (
            <StaggerItem key={s.n} className="relative hover:-translate-y-1 transition-transform duration-300">
              {/* node menempel di puncak kartu */}
              <motion.span
                className="hidden md:flex absolute -top-6 left-1/2 -translate-x-1/2 z-10 items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-lime text-sm font-bold text-neutral-900 shadow-[0_0_0_6px_rgba(191,245,66,0.15)]"
                initial={rm ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: rm ? 0 : 0.25 + i * 0.28 }}
              >
                {s.n}
              </motion.span>

              <div className="bg-white p-8 pt-8 md:pt-11 rounded-2xl border border-[#E5E7EB] shadow-soft-ambient h-full group">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  <span className="md:hidden font-mono text-sm text-lime-600 mr-2">{s.n}</span>
                  {s.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-neutral-400 transition-colors group-hover:text-lime-600">
                  {s.icon}
                  <span>{s.tag}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
