"use client";

import { FaArrowRight, FaReact, FaTerminal } from "react-icons/fa6";

export default function Hero({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section id="about" className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-bg pointer-events-none -z-10 opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center md:justify-start mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-[#E5E7EB] text-xs font-medium text-neutral-800 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500" />
            </span>
            Available for new opportunities
          </div>
        </div>

        <div className="text-center md:text-left max-w-4xl">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.08]">
            Hi I'm <span className="font-bold">Arya Ajisadda</span>,<br />
            <span className="font-editorial italic font-normal text-5xl sm:text-7xl text-neutral-900">
              Software Engineer
            </span>{" "}
            <span className="text-neutral-500 font-light">&</span> Web Developer
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-between space-y-6 text-center lg:text-left">
            <div className="bg-white/80 border border-[#E5E7EB] p-5 rounded-2xl shadow-soft-ambient space-y-3">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {["Web App", "CMS", "POS", "Mobile"].map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-brand-bg border border-[#E5E7EB] rounded-md text-[11px] text-neutral-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/70 border border-[#E5E7EB] p-3.5 rounded-xl text-center">
                <div className="text-xl font-bold text-neutral-900">Laravel</div>
                <div className="text-[11px] text-neutral-500 font-medium">Backend</div>
              </div>
              <div className="bg-white/70 border border-[#E5E7EB] p-3.5 rounded-xl text-center">
                <div className="text-xl font-bold text-neutral-900">React</div>
                <div className="text-[11px] text-neutral-500 font-medium">Frontend</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center relative">
            <div className="relative w-full max-w-2xl aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-lime/30 to-white">
              <div className="absolute top-1/4 w-64 h-64 rounded-full bg-lime/60 blur-2xl" />
              <img
                src="/portrait.png"
                alt="Arya Ajisadda"
                className="relative z-10 w-full h-full object-contain object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-800 shadow-sm">
                <FaReact className="text-sky-500 mr-1.5 inline" /> Next.js 15
              </div>
              <div className="absolute bottom-6 right-4 z-20 bg-[#18181B]/90 text-white px-3.5 py-1.5 rounded-full text-xs font-medium shadow-md">
                <FaTerminal className="text-lime mr-1.5 inline" /> Full-Stack Developer
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 order-3 flex flex-col justify-between space-y-6 text-center lg:text-left">
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
              I build web applications, CMS platforms, and POS systems for clients — from backend architecture to pixel-ready frontend, shipped on time.
            </p>
            <div className="space-y-3">
              <button
                onClick={onOpenContact}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-all shadow-lg hover:-translate-y-0.5"
              >
                Get in Touch <FaArrowRight className="text-xs" />
              </button>
              <a
                href="#works"
                className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 border border-[#E5E7EB] text-neutral-800 text-sm font-medium px-6 py-3 rounded-full"
              >
                Explore Selected Works
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
