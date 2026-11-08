"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaExpand, FaImage } from "react-icons/fa6";
import { categories, projects, type Project } from "@/data/projects";
import { EASE, DURATION } from "@/components/motion/primitives";

const cols: Record<string, string> = {
  "mieayam-pos": "md:col-span-1 lg:col-span-7",
  "cms-dombi": "md:col-span-1 lg:col-span-5",
  "cms-sidorejo": "md:col-span-1 lg:col-span-5",
  "presensi-sims": "md:col-span-2 lg:col-span-12",
  "graha-mesran": "md:col-span-1 lg:col-span-7",
  "dipo-feed": "md:col-span-2 lg:col-span-12",
};

const catLabel: Record<string, string> = { web: "Web App", cms: "CMS", mobile: "Mobile" };

export default function Works({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  const [active, setActive] = useState("All");
  const rm = useReducedMotion();

  const featuredProject = projects.find((p) => p.id === "presensi-sims");
  const orderedProjects = featuredProject
    ? [featuredProject, ...projects.filter((p) => p.id !== featuredProject.id)]
    : projects;
  const filtered = active === "All" ? orderedProjects : orderedProjects.filter((p) => catLabel[p.category] === active);
  const nonFeaturedFiltered = filtered.filter((p) => p.id !== "presensi-sims");
  const lastUnpairedProject = nonFeaturedFiltered.length % 2 === 1 ? nonFeaturedFiltered[nonFeaturedFiltered.length - 1]?.id : undefined;

  return (
    <section id="works" className="pt-12 pb-20 md:pt-16 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              aria-pressed={active === c}
              className={`min-h-11 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
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

      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => {
            const isFeatured = p.id === "presensi-sims";
            const isCompactHorizontal = p.id === "dipo-feed";
            const isUnpairedFilteredProject = active !== "All" && p.id === lastUnpairedProject;
            const spanClass =
              active === "All"
                ? cols[p.id] ?? "md:col-span-1 lg:col-span-6"
                : isFeatured || isUnpairedFilteredProject
                  ? "md:col-span-2 lg:col-span-12"
                  : "md:col-span-1 lg:col-span-6";
            const imageSrc = p.thumb;
            const imageAlt = `${p.title} preview`;
            const horizontalLayout = isFeatured || isCompactHorizontal;

            return (
              <motion.div
                key={p.id}
                layout
                initial={rm ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={rm ? undefined : { opacity: 0, scale: 0.96 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: DURATION, ease: EASE }}
                className={`${spanClass} min-w-0 bg-white rounded-3xl border border-[#E5E7EB] p-4 sm:p-5 ${
                  horizontalLayout ? "grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-12" : "flex flex-col"
                } group hover:shadow-card-hover transition-shadow duration-300`}
              >
                <button
                  onClick={() => onOpenProject(p)}
                  aria-label={`Open ${p.title}`}
                  className={`relative block w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-neutral-100 cursor-pointer ${
                    isFeatured
                      ? "aspect-[16/10] md:col-span-7 md:aspect-auto md:min-h-[20rem] lg:min-h-[24rem]"
                      : isCompactHorizontal
                        ? "aspect-[16/10] md:col-span-6 md:aspect-auto md:min-h-[16rem] lg:col-span-4"
                        : "aspect-[16/10]"
                  }`}
                >
                  {imageSrc ? (
                    <motion.img
                      layoutId={rm ? undefined : `proj-media-${p.id}`}
                      src={imageSrc}
                      alt={imageAlt}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      style={{ borderRadius: 15 }}
                      className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${
                        isFeatured || isCompactHorizontal ? "object-contain" : "object-cover"
                      }`}
                    />
                  ) : (
                    <motion.span
                      layoutId={rm ? undefined : `proj-media-${p.id}`}
                      style={{ borderRadius: 15 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-lime/25 via-brand-bg to-white px-6 text-center"
                    >
                      <FaImage className="text-3xl text-neutral-300" />
                      <span className="text-[11px] font-semibold text-neutral-500">{p.mediaHint}</span>
                    </motion.span>
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
                <div
                  className={`flex min-w-0 flex-col flex-1 px-2 pt-5 pb-2 ${
                    isFeatured
                      ? "md:col-span-5 md:justify-center md:px-4 md:py-8"
                      : isCompactHorizontal
                        ? "md:col-span-6 md:justify-center md:px-4 md:py-4 lg:col-span-8"
                        : ""
                  }`}
                >
                  {isFeatured && (
                    <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
                      Featured Project
                    </span>
                  )}
                  <h3 className={`text-xl sm:text-2xl font-bold text-neutral-900 ${isFeatured ? "md:text-3xl" : ""}`}>
                    {p.title}
                  </h3>
                  <p className={`text-sm text-neutral-600 mt-2 ${isFeatured ? "" : "line-clamp-3"}`}>{p.description}</p>

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
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
