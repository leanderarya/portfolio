"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";

const history = [
  {
    role: "Freelance Full-Stack Developer",
    org: "Freelance & Client Projects",
    period: "2025 — Present",
  },
  {
    role: "Informatics Graduate",
    org: "Diponegoro University — built Presensi SMS & PT Sidorejo Makmur Sejahtera CMS during studies",
    period: "2022 — 2026",
  },
];

export default function Experience() {
  const rm = useReducedMotion();

  return (
    <section id="experience" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
        {/* Kiri — foto sebagai anchor */}
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-neutral-100">
            <img
              src="/arya-1610.webp"
              alt="Arya Ajisadda"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <p className="mt-5 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Full-stack developer and Informatics graduate of Diponegoro University — building robust
            web applications, CMS platforms, and POS systems end to end.
          </p>

          <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-neutral-700">
            <a
              href={site.github && `https://github.com/${site.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={site.github ? "inline-flex items-center gap-1 hover:text-lime-600 transition-colors" : "pointer-events-none text-neutral-400"}
            >
              GitHub <span aria-hidden className="text-[10px]">↗</span>
            </a>
            <a
              href={site.linkedin && `https://linkedin.com/in/${site.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className={site.linkedin ? "inline-flex items-center gap-1 hover:text-lime-600 transition-colors" : "pointer-events-none text-neutral-400"}
            >
              LinkedIn <span aria-hidden className="text-[10px]">↗</span>
            </a>
          </div>
        </Reveal>

        {/* Kanan — riwayat tipografis tanpa kartu */}
        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <span className="block text-xs font-bold text-lime-600 uppercase tracking-widest">Background</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mt-2 mb-8">
              Building production software{" "}
              <span className="font-editorial italic font-normal text-neutral-500">since 2025</span>
            </h2>
          </Reveal>

          <Stagger gap={0.15}>
            {history.map((h, i) => (
              <div key={h.role}>
                <StaggerItem x={32} className="flex items-start justify-between gap-6 py-6 first:pt-0">
                  <div>
                    <h4 className="font-bold text-neutral-900 text-base sm:text-lg">{h.role}</h4>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1 leading-relaxed max-w-md">{h.org}</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold text-lime-600 font-mono pt-1">{h.period}</span>
                </StaggerItem>
                {i < history.length - 1 && (
                  <motion.div
                    className="h-px w-full bg-[#E5E7EB] origin-left"
                    initial={rm ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
                  />
                )}
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
