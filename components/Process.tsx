"use client";

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
  return (
    <section id="process" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
          / Engineering Process
        </span>
        <h2 className="text-3xl sm:text-5xl font-editorial text-neutral-900 mt-2">Here&apos;s how I work</h2>
        <p className="text-sm text-neutral-600 mt-3">
          Combining engineering rigor, clean code architecture, and high aesthetic standards from inception to deployment.
        </p>
      </Reveal>

      <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" gap={0.1}>
        {steps.map((s, i) => (
          <StaggerItem key={s.n} className={i === 1 ? "md:-translate-y-3 hover:-translate-y-4 transition-transform duration-300" : "hover:-translate-y-1 transition-transform duration-300"}>
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-soft-ambient h-full group">
              <div className="w-12 h-12 rounded-xl bg-brand-bg border border-[#E5E7EB] flex items-center justify-center font-bold text-lg text-neutral-800 mb-6 group-hover:bg-lime transition-colors">
                {s.n}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{s.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-neutral-400">
                {s.icon}
                <span>{s.tag}</span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
