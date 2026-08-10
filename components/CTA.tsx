"use client";

import { FaArrowRight } from "react-icons/fa6";

export default function CTA({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="py-20 bg-[#18181B] text-white relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-lime/20 blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-neutral-800 text-lime text-xs font-semibold tracking-wider uppercase">
          Let's Build Something Exceptional
        </span>
        <h2 className="text-4xl sm:text-6xl font-editorial leading-tight">
          Have an ambitious project or engineering role in mind?
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
          I am open to full-time engineering positions, technical contract roles, and high-impact web development collaborations.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={onOpenContact} className="w-full sm:w-auto bg-lime hover:bg-lime-hover text-black font-bold text-sm px-8 py-4 rounded-full transition-all shadow-glow-lime">
            Start a Conversation <FaArrowRight className="inline ml-2" />
          </button>
          <a href="mailto:arya.ajisadda@example.com" className="w-full sm:w-auto bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm px-8 py-4 rounded-full border border-neutral-700 transition-colors">
            arya.ajisadda@example.com
          </a>
        </div>
      </div>
    </section>
  );
}