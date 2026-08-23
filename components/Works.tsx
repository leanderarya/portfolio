"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaExpand, FaImage } from "react-icons/fa6";
import { categories, projects, type Project } from "@/data/projects";
import { EASE, DURATION } from "@/components/motion/primitives";

const cols: Record<string, string> = {
  "mieayam-pos": "md:col-span-8",
  "cms-dombi": "md:col-span-4",
  "cms-sidorejo": "md:col-span-8",
  "presensi-sims": "md:col-span-4",
  "graha-mesran": "md:col-span-4",
  "dipo-feed": "md:col-span-8",
};

const catLabel: Record<string, string> = { web: "Web App", cms: "CMS", mobile: "Mobile" };

export default function Works({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  const [active, setActive] = useState("All");
  const rm = useReducedMotion();

  const filtered = active === "All" ? projects : projects.filter((p) => catLabel[p.category] === active);

  return (
    <section id="works" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">/ Portfolio</span>
          <h2 className="text-3xl sm:text-5xl font-editorial text-neutral-900 mt-2">Selected Works</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                active === c
                  ? "bg-[#18181B] text-white"
                  : "bg-white hover:bg-neutral-100 border border-[#E5E7EB] text-neutral-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={rm ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={rm ? undefined : { opacity: 0, scale: 0.96 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: DURATION, ease: EASE }}
              className={`${cols[p.id] ?? "md:col-span-6"} bg-white rounded-3xl border border-[#E5E7EB] p-4 sm:p-5 flex flex-col group hover:shadow-card-hover transition-shadow duration-300`}
            >
              {/* Media — image-first */}
              <button
                onClick={() => onOpenProject(p)}
                aria-label={`Open ${p.title}`}
                className="relative block w-full aspect-[16/10] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-neutral-100 cursor-pointer"
              >
                {p.thumb ? (
                  <img
                    src={p.thumb}
                    alt={`${p.title} preview`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-lime/25 via-brand-bg to-white px-6 text-center">
                    <FaImage className="text-3xl text-neutral-300" />
                    <span className="text-[11px] font-semibold text-neutral-500">{p.mediaHint}</span>
                  </span>
                )}
                <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-semibold text-neutral-800 shadow-sm">
                  {catLabel[p.category]}
                </span>
                <span className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-medium text-neutral-500 shadow-sm">
                  {p.year}
                </span>
                <span className="absolute bottom-3 right-3 z-10 p-2.5 rounded-full bg-lime text-neutral-900 shadow-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <FaExpand className="text-xs" />
                </span>
              </button>

              {/* Body */}
              <div className="flex flex-col flex-1 px-2 pt-5 pb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">{p.title}</h3>
                <p className="text-sm text-neutral-600 mt-2 line-clamp-3">{p.description}</p>

                <div className="mt-4 inline-flex self-start items-center gap-2 px-3.5 py-2 rounded-lg bg-brand-bg border border-[#E5E7EB]">
                  <span className="text-xs font-bold text-neutral-900">{p.highlight}</span>
                </div>

                <div className="mt-auto pt-5 flex flex-wrap gap-1.5 border-t border-[#E5E7EB]/70 mt-5">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="text-[11px] bg-brand-bg px-2 py-0.5 rounded text-neutral-600 border border-[#E5E7EB]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
