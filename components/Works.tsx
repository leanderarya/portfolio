"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
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
              className={`${cols[p.id] ?? "md:col-span-6"} bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 flex flex-col justify-between group hover:shadow-card-hover transition-shadow duration-300`}
            >
              <div>
                {p.thumb && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-[#E5E7EB] bg-neutral-100 flex items-center justify-center h-52">
                    <img
                      src={p.thumb}
                      alt={`${p.title} preview`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-semibold">
                    {catLabel[p.category]}
                  </span>
                  <span className="text-xs text-neutral-400">{p.year}</span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">{p.title}</h3>
                <p className="text-sm text-neutral-600 mt-2">{p.description}</p>
              </div>

              <div className="my-6 p-4 rounded-xl bg-brand-bg border border-[#E5E7EB] text-center">
                <div className="text-xs font-bold text-neutral-900">{p.highlight}</div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="text-[11px] bg-brand-bg px-2 py-0.5 rounded text-neutral-600 border border-[#E5E7EB]">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onOpenProject(p)}
                  aria-label={`Open ${p.title}`}
                  className="p-2.5 rounded-full bg-neutral-100 hover:bg-lime text-neutral-900 transition-colors"
                >
                  <FaArrowUpRightFromSquare className="text-xs transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
