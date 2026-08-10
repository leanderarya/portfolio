"use client";

import { FaXmark, FaLaptopCode } from "react-icons/fa6";
import type { Project } from "@/data/projects";

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-[#E5E7EB]">
        <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 text-neutral-400 hover:text-black text-lg">
          <FaXmark />
        </button>
        <div className="w-10 h-10 rounded-full bg-lime/40 text-neutral-900 flex items-center justify-center text-sm mb-4">
          <FaLaptopCode />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900">{project.title}</h3>
        <p className="text-sm text-neutral-600 mt-3 leading-relaxed">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="text-[11px] bg-brand-bg px-2 py-0.5 rounded text-neutral-600 border border-[#E5E7EB]">
              {s}
            </span>
          ))}
        </div>
        <button onClick={onClose} className="mt-6 w-full bg-[#18181B] text-white text-xs font-semibold py-3 rounded-xl">
          Close Preview
        </button>
      </div>
    </div>
  );
}