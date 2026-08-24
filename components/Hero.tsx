"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { FaArrowRight, FaTerminal } from "react-icons/fa6";
import { EASE, DURATION } from "@/components/motion/primitives";

export default function Hero({ onOpenContact }: { onOpenContact: () => void }) {
  const rm = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerV: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: rm ? 0 : 0.1, delayChildren: rm ? 0 : 0.15 },
    },
  };
  const fadeUpV: Variants = rm
    ? {}
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
      };
  const portraitV: Variants = rm
    ? {}
    : {
        hidden: { opacity: 0, scale: 1.04 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
      };
  const lineInnerV: Variants = rm
    ? {}
    : {
        hidden: { y: "110%" },
        show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <section id="about" ref={sectionRef} className="relative pt-8 pb-12 md:pt-14 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-bg pointer-events-none -z-10 opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerV} initial="hidden" animate="show">
          <motion.div variants={fadeUpV} className="flex justify-center md:justify-start mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#E5E7EB]/80 text-xs font-medium text-neutral-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500" />
              </span>
              Available for new opportunities
            </div>
          </motion.div>

          <h1 className="mt-6 text-center md:text-left max-w-5xl text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05]">
            <span className="block overflow-hidden pb-1">
              <motion.span variants={lineInnerV} className="block">
                Hi, I&apos;m <span className="font-bold">Arya Ajisadda</span>,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <motion.span variants={lineInnerV} className="block">
                <span className="font-editorial italic font-normal text-5xl sm:text-7xl xl:text-8xl text-neutral-900">
                  Software Engineer
                </span>{" "}
                <span className="text-neutral-500 font-light">&amp;</span> Web Developer
              </motion.span>
            </span>
          </h1>

          <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Kiri — tipografi tanpa kotak */}
            <motion.div variants={fadeUpV} className="lg:col-span-3 order-2 lg:order-1 space-y-8 text-center lg:text-left">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">Focus</p>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
                  Full-Stack Web Apps · CMS &amp; Admin Panels · POS Systems · Android Apps
                </p>
              </div>

              <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                <div className="py-4 flex items-baseline gap-4 justify-center lg:justify-start">
                  <span className="font-mono text-xs text-neutral-400">01</span>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-neutral-900">Laravel</p>
                    <p className="mt-0.5 text-xs text-neutral-500">API · Filament · Multi-tenant</p>
                  </div>
                </div>
                <div className="py-4 flex items-baseline gap-4 justify-center lg:justify-start">
                  <span className="font-mono text-xs text-neutral-400">02</span>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-neutral-900">React</p>
                    <p className="mt-0.5 text-xs text-neutral-500">Next.js · Inertia · TypeScript</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tengah — foto arch tanpa kartu */}
            <motion.div variants={portraitV} className="lg:col-span-6 order-1 lg:order-2 flex justify-center relative">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-t-full overflow-hidden">
                <motion.img
                  src="/arya-nobg.webp"
                  alt="Arya Ajisadda"
                  style={rm ? undefined : { y: parallaxY }}
                  className="absolute inset-0 h-full w-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 bg-[#18181B]/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap">
                  <FaTerminal className="text-lime mr-1.5 inline" /> Full-Stack Developer
                </div>
              </div>
            </motion.div>

            {/* Kanan — bio + CTA */}
            <motion.div variants={fadeUpV} className="lg:col-span-3 order-3 space-y-7 text-center lg:text-left">
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                I engineer web applications, CMS platforms, and POS systems that real businesses run on daily — owning everything from database schema to the final pixel, from first commit to production.
              </p>
              <div className="space-y-3">
                <button
                  onClick={onOpenContact}
                  className="group w-full inline-flex items-center justify-center gap-3 bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-semibold px-6 py-4 rounded-full transition-all hover:-translate-y-0.5"
                >
                  Get in Touch{" "}
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#works"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-black"
                >
                  Explore Selected Works
                  <span className="inline-block h-px w-6 bg-current transition-all duration-300 group-hover:w-9" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
