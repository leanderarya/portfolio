"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useModal } from "@/hooks/useModal";
import type { Project } from "@/data/projects";
import { Stagger, StaggerItem } from "@/components/motion/primitives";

const catLabel: Record<Project["category"], string> = {
  web: "Web App",
  cms: "CMS",
  mobile: "Mobile",
};

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const rm = useReducedMotion();
  const modalRef = useModal(onClose);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Project details: ${project.title}`}
        tabIndex={-1}
        initial={rm ? false : { opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.18 } }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-[#E5E7EB] max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 text-neutral-400 hover:text-black text-lg z-10">
          Close ✕
        </button>

        {project.thumb && (
          <div className="mb-5 rounded-xl overflow-hidden border border-[#E5E7EB] bg-neutral-100 h-44 flex items-center justify-center">
            <img src={project.thumb} alt={`${project.title} preview`} className="w-full h-full object-contain" />
          </div>
        )}

        <div className="flex items-center gap-2 mb-3 pr-8">
          <span className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-semibold">
            {catLabel[project.category]}
          </span>
          <span className="text-xs text-neutral-400">{project.year}</span>
        </div>

        <h3 id="project-modal-title" className="text-2xl font-bold text-neutral-900">{project.title}</h3>
        <p className="text-sm text-neutral-600 mt-3 leading-relaxed">{project.description}</p>

        <Stagger className="mt-4 flex flex-wrap gap-1.5" gap={0.05}>
          {project.stack.map((s) => (
            <StaggerItem key={s} y={10}>
              <span className="inline-block text-[11px] bg-brand-bg px-2 py-0.5 rounded text-neutral-600 border border-[#E5E7EB]">
                {s}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        <button onClick={onClose} className="mt-6 w-full bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-semibold py-3 rounded-xl transition-colors">
          Close Preview
        </button>
      </motion.div>
    </div>
  );
}
