"use client";

import { FaArrowRight } from "react-icons/fa6";
import { site } from "@/data/site";
import { Stagger, StaggerItem } from "@/components/motion/primitives";

export default function CTA({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="py-20 bg-[#18181B] text-white relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-lime blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
        <Stagger gap={0.12} className="space-y-8">
          <StaggerItem y={18}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-neutral-800 text-lime text-xs font-semibold tracking-wider uppercase">
              Let&apos;s Build Something Exceptional
            </span>
          </StaggerItem>
          <StaggerItem y={22}>
            <h2 className="text-4xl sm:text-6xl font-editorial leading-tight">
              Have an ambitious project or engineering role in mind?
            </h2>
          </StaggerItem>
          <StaggerItem y={18}>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
              I am open to full-time engineering positions, technical contract roles, and high-impact web development collaborations.
            </p>
          </StaggerItem>
          <StaggerItem y={18}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenContact}
                className="group w-full sm:w-auto bg-lime hover:bg-lime-hover text-black font-bold text-sm px-8 py-4 rounded-full transition-all shadow-glow-lime hover:shadow-[0_0_60px_14px_rgba(191,245,66,0.55)]"
              >
                Start a Conversation{" "}
                <FaArrowRight className="inline ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={`mailto:${site.email}`}
                className="w-full sm:w-auto bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm px-8 py-4 rounded-full border border-neutral-700 transition-colors"
              >
                {site.email}
              </a>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
