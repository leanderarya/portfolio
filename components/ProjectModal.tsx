"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaXmark, FaImage } from "react-icons/fa6";
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
  const layoutId = rm ? undefined : `proj-media-${project.id}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
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
        initial={rm ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="bg-white rounded-3xl max-w-2xl w-full relative shadow-2xl border border-[#E5E7EB] max-h-[92vh] overflow-y-auto"
      >
        {/* Media full-bleed — morph dari thumbnail kartu (shared element) */}
        <div className="relative aspect-[16/10] bg-neutral-100">
          {project.thumb ? (
            <motion.img
              layoutId={layoutId}
              src={project.thumb}
              alt={`${project.title} preview`}
              style={{
                borderTopLeftRadius: 23,
                borderTopRightRadius: 23,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <motion.span
              layoutId={layoutId}
              style={{
                borderTopLeftRadius: 23,
                borderTopRightRadius: 23,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-lime/25 via-brand-bg to-white px-6 text-center"
            >
              <FaImage className="text-3xl text-neutral-300" />
              <span className="text-xs font-semibold text-neutral-500">{project.mediaHint}</span>
            </motion.span>
          )}

          {/* overlay chips — konsisten dengan kartu Works */}
          <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-semibold text-neutral-800 shadow-sm">
            {catLabel[project.category]}
          </span>
          <span className="absolute top-4 right-14 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-medium text-neutral-500 shadow-sm">
            {project.year}
          </span>

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3.5 right-3.5 z-20 p-2.5 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-white transition-colors"
          >
            <FaXmark className="text-sm" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">{project.description}</p>

          <div className="my-6 h-px w-full bg-[#E5E7EB]" />

          <Stagger className="flex flex-wrap gap-1.5" gap={0.05}>
            {project.stack.map((s) => (
              <StaggerItem key={s} y={10}>
                <span className="inline-block text-[11px] font-medium bg-brand-bg px-2.5 py-1 rounded-md text-neutral-600 border border-[#E5E7EB]">
                  {s}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <button
            onClick={onClose}
            className="mt-8 w-full bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-semibold py-3.5 rounded-full transition-colors"
          >
            Close Preview
          </button>
        </div>
      </motion.div>
    </div>
  );
}
