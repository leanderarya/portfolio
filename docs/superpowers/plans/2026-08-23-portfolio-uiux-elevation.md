# UI/UX Elevation Portofolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate landing page portofolio (motion sedang + polish halus) memakai framer-motion, hapus testimoni fiktif, tanpa mengganti identitas visual.

**Architecture:** Satu file primitives motion bersama (`components/motion/primitives.tsx`) dipakai semua section. Modal direfaktor ke pola `AnimatePresence` di `page.tsx`. Semua animasi transform/opacity, hormat `prefers-reduced-motion`.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind v4, framer-motion (satu-satunya dep baru).

**Spec:** `docs/superpowers/specs/2026-08-23-portfolio-uiux-elevation-design.md`

## Global Constraints

- Dep baru HANYA `framer-motion` (latest v12+). Tidak ada lib lain.
- Animasi hanya `transform` + `opacity`. Setiap animasi hormati `prefers-reduced-motion`.
- Warna tetap: lime `#BFF542`, dark `#18181B`, bg `#FAF9F6`, surface putih, border `#E5E7EB`.
- Static export tetap: setiap task diakhiri `npm run build` → HARUS sukses.
- Tanpa test framework (keputusan spec v1): verifikasi = build sukses + cek visual manual via `npm run dev`. TDD tidak berlaku untuk animasi visual murni.
- Copy/konten tidak berubah KECUALI penghapusan block testimoni fiktif di Process.tsx.
- Commit per task, format conventional commits.

---

### Task 1: Fondasi — install framer-motion + primitives + CSS utilitas

**Files:**
- Modify: `package.json` (via npm install)
- Create: `components/motion/primitives.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: tidak ada (fondasi).
- Produces dari `@/components/motion/primitives`: `EASE`, `DURATION = 0.55`, `<Reveal {children, delay?, y?, className?}>`, `<Stagger {children, delay?, gap?, className?}>`, `<StaggerItem {children, y?, x?, className?}>`.

- [ ] **Step 1: Install dependency**

```bash
npm install framer-motion
```

Expected: `package.json` bertambah `"framer-motion": "^12.x.x"`, sukses tanpa error peer-dep React 19.

- [ ] **Step 2: Buat primitives**

Buat `components/motion/primitives.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const DURATION = 0.55;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const rm = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={rm ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DURATION, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  delay = 0,
  gap = 0.08,
  className,
}: {
  children: ReactNode;
  delay?: number;
  gap?: number;
  className?: string;
}) {
  const rm = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: rm ? 0 : gap,
            delayChildren: rm ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  y = 24,
  x,
  className,
}: {
  children: ReactNode;
  y?: number;
  x?: number;
  className?: string;
}) {
  const rm = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: rm ? {} : { opacity: 0, ...(x !== undefined ? { x } : { y }) },
        show: {
          opacity: 1,
          ...(x !== undefined ? { x: 0 } : { y: 0 }),
          transition: { duration: DURATION, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Tambah utilitas CSS ke `app/globals.css`**

Tambahkan di akhir file:

```css
/* Nav link underline draw */
.nav-link {
  position: relative;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 100%;
  background: #bff542;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-link:hover::after,
.nav-link:focus-visible::after {
  transform: scaleX(1);
}

/* Marquee edge fade */
.marquee-mask {
  mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
}

/* CTA glow pulse */
@keyframes glow-pulse {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.35;
  }
}
.animate-glow-pulse {
  animation: glow-pulse 6s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .animate-glow-pulse {
    animation: none;
  }
}
```

Lalu ubah rule `.animate-marquee` yang ada: `animation: marquee 25s linear infinite;` → `animation: marquee 35s linear infinite;`

- [ ] **Step 4: Verifikasi build**

Run: `npm run build`
Expected: sukses, static export tergenerate tanpa error.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json components/motion/primitives.tsx app/globals.css
git commit -m "feat: add framer-motion foundation, Reveal/Stagger primitives, CSS utilities"
```

---

### Task 2: Nav — hide-on-scroll, bg opaque, drawer animated

**Files:**
- Modify: `components/Nav.tsx` (rewrite)

**Interfaces:**
- Consumes: `EASE` dari primitives.
- Produces: props tetap `{ onOpenContact: () => void }`.

- [ ] **Step 1: Rewrite Nav.tsx**

```tsx
"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { FaBars, FaXmark, FaArrowRight } from "react-icons/fa6";
import { site } from "@/data/site";
import { EASE } from "@/components/motion/primitives";

export default function Nav({ onOpenContact }: { onOpenContact: () => void }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rm = useReducedMotion();

  const links = [
    { href: "#about", label: "About Me" },
    { href: "#process", label: "How I Work" },
    { href: "#experience", label: "Experience" },
    { href: "#works", label: "Selected Works" },
  ];

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(!rm && y > prev && y > 120);
    setScrolled(y > 24);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
        scrolled
          ? "bg-[#FAF9F6]/95 border-[#E5E7EB] shadow-sm"
          : "bg-[#FAF9F6]/80 border-[#E5E7EB]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs tracking-tighter group-hover:bg-lime group-hover:text-neutral-900 transition-colors">
            CA
          </div>
          <span className="flex flex-col leading-none">
            <span className="font-bold text-sm tracking-tight text-neutral-900">{site.brand}</span>
            <span className="text-[10px] text-neutral-500 font-medium mt-0.5">{site.name}</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-sm font-medium text-neutral-700 hover:text-black transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenContact}
            className="group hidden sm:inline-flex items-center gap-2 bg-[#18181B] hover:bg-[#27272A] text-white text-xs md:text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            Get in Touch
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="lg:hidden p-2.5 rounded-full bg-white border border-[#E5E7EB] text-neutral-800 hover:bg-neutral-50"
          >
            {open ? <FaXmark className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={rm ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="lg:hidden overflow-hidden border-b border-[#E5E7EB] bg-white"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium text-neutral-800 hover:text-black"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenContact();
                }}
                className="w-full text-center bg-[#18181B] text-white text-sm font-medium py-3 rounded-full"
              >
                Get in Touch →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
```

- [ ] **Step 2: Verifikasi visual + build**

`npm run dev`: scroll turun → nav hilang setelah 120px; naik → balik; drawer buka/tutup halus; underline lime hover di desktop. `npm run build` sukses.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat(nav): hide-on-scroll, opaque-on-scroll, animated mobile drawer, underline links"
```

---

### Task 3: Hero — load choreography + parallax portrait

**Files:**
- Modify: `components/Hero.tsx` (rewrite)

**Interfaces:**
- Consumes: `EASE`, `DURATION`.
- Produces: props tetap `{ onOpenContact: () => void }`.

- [ ] **Step 1: Rewrite Hero.tsx**

```tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { FaArrowRight, FaReact, FaTerminal } from "react-icons/fa6";
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
    <section id="about" ref={sectionRef} className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient-bg pointer-events-none -z-10 opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerV} initial="hidden" animate="show">
          <motion.div variants={fadeUpV} className="flex justify-center md:justify-start mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-[#E5E7EB] text-xs font-medium text-neutral-800 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500" />
              </span>
              Available for new opportunities
            </div>
          </motion.div>

          <h1 className="mt-6 text-center md:text-left max-w-4xl text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.08]">
            <span className="block overflow-hidden pb-1">
              <motion.span variants={lineInnerV} className="block">
                Hi I&apos;m <span className="font-bold">Arya Ajisadda</span>,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span variants={lineInnerV} className="block">
                <span className="font-editorial italic font-normal text-5xl sm:text-7xl text-neutral-900">
                  Software Engineer
                </span>{" "}
                <span className="text-neutral-500 font-light">&amp;</span> Web Developer
              </motion.span>
            </span>
          </h1>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div variants={fadeUpV} className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-between space-y-6 text-center lg:text-left">
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
            </motion.div>

            <motion.div variants={portraitV} className="lg:col-span-6 order-1 lg:order-2 flex justify-center relative">
              <div className="relative w-full max-w-2xl aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-lime/30 to-white">
                <div className="absolute top-1/4 w-64 h-64 rounded-full bg-lime/60 blur-2xl" />
                <motion.img
                  src="/portrait.png"
                  alt="Arya Ajisadda"
                  style={rm ? undefined : { y: parallaxY }}
                  className="relative z-10 w-full h-full object-contain object-center grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-800 shadow-sm">
                  <FaReact className="text-sky-500 mr-1.5 inline" /> Next.js 15
                </div>
                <div className="absolute bottom-6 right-4 z-20 bg-[#18181B]/90 text-white px-3.5 py-1.5 rounded-full text-xs font-medium shadow-md">
                  <FaTerminal className="text-lime mr-1.5 inline" /> Full-Stack Developer
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUpV} className="lg:col-span-3 order-3 flex flex-col justify-between space-y-6 text-center lg:text-left">
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                I build web applications, CMS platforms, and POS systems for clients — from backend architecture to pixel-ready frontend, shipped on time.
              </p>
              <div className="space-y-3">
                <button
                  onClick={onOpenContact}
                  className="group w-full inline-flex items-center justify-center gap-3 bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Get in Touch{" "}
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#works"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 border border-[#E5E7EB] text-neutral-800 text-sm font-medium px-6 py-3 rounded-full"
                >
                  Explore Selected Works
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verifikasi visual + build**

Reload dev: badge → headline dua baris clip-reveal → kartu kiri → portrait zoom-out fade → bio+CTA berurutan. Scroll: portrait bergeser ±20px. Reduced-motion emulate: semua langsung tampil statis. Build sukses.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat(hero): staggered load choreography, line clip reveal, portrait parallax"
```

---

### Task 4: TechMarquee — edge fade mask

**Files:**
- Modify: `components/TechMarquee.tsx:42`

**Interfaces:**
- Consumes: `.marquee-mask` dari globals.css (Task 1).
- Produces: tidak ada perubahan API.

- [ ] **Step 1: Terapkan mask**

Di `components/TechMarquee.tsx`, ubah wrapper:

```tsx
<div className="relative w-full overflow-hidden marquee-mask">
```

(dari `className="relative w-full overflow-hidden"`)

- [ ] **Step 2: Verifikasi + commit**

Dev: tepi kiri/kanan marquee pudar halus. Build sukses.

```bash
git add components/TechMarquee.tsx
git commit -m "feat(marquee): edge fade mask"
```

---

### Task 5: Statement — phrase reveal, underline draw, pills pop

**Files:**
- Modify: `components/Statement.tsx` (rewrite)

**Interfaces:**
- Consumes: `EASE`, `Stagger`, `StaggerItem`.
- Produces: tidak ada perubahan API.

- [ ] **Step 1: Rewrite Statement.tsx**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, Stagger, StaggerItem } from "@/components/motion/primitives";

const pills = [
  "⚡ System Architecture",
  "🎯 Clean Code & Type Safety",
  "🚀 CI/CD & Cloud",
  "🎨 Pixel-Precise Frontend",
];

export default function Statement() {
  const rm = useReducedMotion();
  const phraseIn = (delay: number) => ({
    initial: rm ? false : ({ opacity: 0, y: 18 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: { duration: 0.55, ease: EASE, delay },
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-y border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Philosophy</span>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-snug mt-4">
          <motion.span className="inline-block" {...phraseIn(0)}>
            I build by blending{" "}
          </motion.span>
          <span className="relative inline-block font-bold">
            clear architecture
            <motion.span
              aria-hidden
              className="absolute left-0 -bottom-1 h-1 w-full bg-lime origin-left rounded-full"
              initial={rm ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
            />
          </span>
          <motion.span className="inline-block" {...phraseIn(0.2)}>
            , quality-first engineering, and user empathy to{" "}
            <span className="font-editorial italic">craft products</span> that solve real problems.
          </motion.span>
        </h2>

        <Stagger className="flex flex-wrap items-center justify-center gap-2.5 mt-8 sm:mt-10" gap={0.07}>
          {pills.map((p) => (
            <StaggerItem key={p} y={14}>
              <span className="inline-block px-4 py-2 rounded-full bg-white border border-[#E5E7EB] shadow-sm text-xs font-semibold text-neutral-700">
                {p}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
```

Catatan: underline statis `decoration-lime decoration-4` lama dihapus, digantikan bar lime animasi scaleX.

- [ ] **Step 2: Verifikasi visual + build**

Dev: frasa muncul berurutan, garis lime menggambar kiri→kanan, pills pop. Reduced-motion: langsung tampak semua. Build sukses.

- [ ] **Step 3: Commit**

```bash
git add components/Statement.tsx
git commit -m "feat(statement): phrase reveal, lime underline draw, staggered pills"
```

---

### Task 6: Process — hapus testimoni fiktif + motion

**Files:**
- Modify: `components/Process.tsx` (hapus block testimoni L61–104, tambah motion)

**Interfaces:**
- Consumes: `Reveal`, `Stagger`, `StaggerItem`.
- Produces: section Process tanpa testimoni.

- [ ] **Step 1: Rewrite Process.tsx**

```tsx
"use client";

import { FaDiagramProject, FaCode, FaRocket } from "react-icons/fa6";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";

const steps = [
  {
    n: "01",
    title: "Discover & Architect",
    desc: "Analyzing technical requirements, database models, and user journeys to construct a robust system blueprint.",
    tag: "System Design & Schema",
    icon: <FaDiagramProject />,
  },
  {
    n: "02",
    title: "Build & Optimize",
    desc: "Writing modular, type-safe code with React / Next.js and Laravel, ensuring high performance, SEO, and responsive accessibility.",
    tag: "Clean Code & Best Practices",
    icon: <FaCode />,
  },
  {
    n: "03",
    title: "Deploy & Scale",
    desc: "Configuring deployment pipelines and containerizing services to ship reliable applications to production.",
    tag: "CI/CD & Cloud",
    icon: <FaRocket />,
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
          / Engineering Process
        </span>
        <h2 className="text-3xl sm:text-5xl font-editorial text-neutral-900 mt-2">Here&apos;s how I work</h2>
        <p className="text-sm text-neutral-600 mt-3">
          Combining engineering rigor, clean code architecture, and high aesthetic standards from inception to deployment.
        </p>
      </Reveal>

      <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" gap={0.1}>
        {steps.map((s, i) => (
          <StaggerItem key={s.n} className={i === 1 ? "md:-translate-y-3 hover:-translate-y-4 transition-transform duration-300" : "hover:-translate-y-1 transition-transform duration-300"}>
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-soft-ambient h-full group">
              <div className="w-12 h-12 rounded-xl bg-brand-bg border border-[#E5E7EB] flex items-center justify-center font-bold text-lg text-neutral-800 mb-6 group-hover:bg-lime transition-colors">
                {s.n}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{s.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-neutral-400">
                {s.icon}
                <span>{s.tag}</span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
```

CATATAN PENTING: block testimoni lama (`{/* Testimonials */}` sampai penutup div-nya, L61–104) DIHAPUS SELURUHNYA. Data "Daniel Reed/NovaLabs" dan "Sarah Nguyen/FlowSync" adalah fiktif dan melanggar Real Data Only Principle spec v1.

- [ ] **Step 2: Verifikasi visual + build**

Dev: header fade-up, kartu muncul berurutan, hover lift jalan, testimoni hilang dari halaman. Build sukses.

- [ ] **Step 3: Commit**

```bash
git add components/Process.tsx
git commit -m "feat(process): staggered cards; remove fictional testimonials (real-data principle)"
```

---

### Task 7: Works — FLIP filter animation + hover polish

**Files:**
- Modify: `components/Works.tsx` (rewrite)

**Interfaces:**
- Consumes: `EASE`, `DURATION`.
- Produces: props tetap `{ onOpenProject: (p: Project) => void }`.

- [ ] **Step 1: Rewrite Works.tsx**

```tsx
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
```

Perubahan hover: kartu `transition-all` → `transition-shadow` (transform dikelola motion); thumb zoom `scale-[1.03]`; ikon arrow rotate 45° saat card hover.

- [ ] **Step 2: Verifikasi visual + build**

Dev: klik filter tab → kartu FLIP geser halus, tidak ada kartu hilang/zig-zag; scroll pertama → stagger reveal; hover → thumb zoom + arrow rotate. Build sukses.

- [ ] **Step 3: Commit**

```bash
git add components/Works.tsx
git commit -m "feat(works): FLIP filter transitions, first-view stagger, hover micro-interactions"
```

---

### Task 8: Experience — slide-in items + divider draw

**Files:**
- Modify: `components/Experience.tsx` (rewrite)

**Interfaces:**
- Consumes: `Reveal`, `Stagger`, `StaggerItem`, `EASE`.
- Produces: tidak ada perubahan API.

- [ ] **Step 1: Rewrite Experience.tsx**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";

const history = [
  {
    role: "Software Engineer / Full-Stack Developer",
    org: "Freelance & Client Projects",
    period: "2021 — Present",
  },
  {
    role: "Web Developer (Laravel / React)",
    org: "Enterprise POS & CMS Solutions",
    period: "2020 — 2021",
  },
  {
    role: "Frontend Developer",
    org: "Digital Product Projects",
    period: "2018 — 2020",
  },
];

export default function Experience() {
  const rm = useReducedMotion();

  return (
    <section id="experience" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <Reveal className="md:col-span-5 space-y-4">
          <span className="block text-xs font-bold text-lime-600 uppercase tracking-widest">Background</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            Building production software{" "}
            <span className="font-editorial italic font-normal text-neutral-500">since 2018</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2">
            Arya Ajisadda is a full-stack software engineer focused on robust web applications,
            CMS platforms, and POS systems — from backend architecture to accessible, pixel-perfect
            frontends.
          </p>

          <div className="pt-4 flex items-center gap-3 text-xs font-semibold text-neutral-700">
            <a
              href={site.github && `https://github.com/${site.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={site.github ? "hover:text-lime-600 transition-colors" : "pointer-events-none text-neutral-400"}
            >
              GitHub ↗
            </a>
            <span className="text-neutral-300">•</span>
            <a
              href={site.linkedin && `https://linkedin.com/in/${site.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className={site.linkedin ? "hover:text-lime-600 transition-colors" : "pointer-events-none text-neutral-400"}
            >
              LinkedIn ↗
            </a>
          </div>
        </Reveal>

        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] space-y-6">
          <Stagger gap={0.12}>
            {history.map((h, i) => (
              <div key={h.role}>
                <StaggerItem x={32} className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm sm:text-base">{h.role}</h4>
                    <p className="text-xs text-neutral-500">{h.org}</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold text-neutral-500 font-mono">{h.period}</span>
                </StaggerItem>
                {i < history.length - 1 && (
                  <motion.div
                    className="mt-6 mb-6 h-px w-full bg-[#E5E7EB] origin-left"
                    initial={rm ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                  />
                )}
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
```

Catatan: `border-b` antar baris diganti elemen divider terpisah agar bisa dianimasikan scaleX draw; layout row (role/org kiri, periode kanan) tetap sama seperti semula.

- [ ] **Step 2: Verifikasi visual + build**

Dev: kolom kiri fade-up; item slide dari kanan berurutan; garis menggambar. Build sukses.

- [ ] **Step 3: Commit**

```bash
git add components/Experience.tsx
git commit -m "feat(experience): right slide-in history items, divider draw"
```

---

### Task 9: CTA — stagger + glow pulse

**Files:**
- Modify: `components/CTA.tsx` (rewrite)

**Interfaces:**
- Consumes: `Reveal`, `Stagger`, `StaggerItem`, `.animate-glow-pulse`.
- Produces: props tetap `{ onOpenContact: () => void }`.

- [ ] **Step 1: Rewrite CTA.tsx**

```tsx
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
```

Catatan: glow div lama `bg-lime/20` → `bg-lime` + opacity dikontrol keyframes `.animate-glow-pulse` (0.2↔0.35). Shadow hover tombol menguat via arbitrary shadow class.

- [ ] **Step 2: Verifikasi visual + build**

Dev: konten CTA stagger berurutan; glow berdenyut pelan; hover tombol glow menguat + arrow geser. Build sukses.

- [ ] **Step 3: Commit**

```bash
git add components/CTA.tsx
git commit -m "feat(cta): entrance stagger, pulsing lime glow, button glow hover"
```

---

### Task 10: Footer — watermark fade-in + social hover lift

**Files:**
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes: `Reveal`.
- Produces: tidak ada perubahan API.

- [ ] **Step 1: Bungkus watermark dengan Reveal + polish ikon sosial**

Di `components/Footer.tsx`:

Tambahkan import di atas:

```tsx
"use client";

import { Reveal } from "@/components/motion/primitives";
```

Ubah blok watermark (L34–38) menjadi:

```tsx
<Reveal y={16} className="text-center select-none pt-4 pointer-events-none">
  <span className="block text-[12vw] sm:text-[11vw] font-editorial italic text-neutral-100 leading-none tracking-tighter">
    {site.brand}
  </span>
</Reveal>
```

Ubah className tiap link sosial (L25) menjadi:

```tsx
className="hover:text-neutral-900 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
```

- [ ] **Step 2: Verifikasi + commit**

Dev: watermark fade-up saat masuk viewport; ikon sosial naik tipis saat hover. Build sukses.

```bash
git add components/Footer.tsx
git commit -m "feat(footer): watermark reveal, social icon hover lift"
```

---

### Task 11: Modals — AnimatePresence + ProjectModal upgrade

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/ContactModal.tsx` (rewrite)
- Modify: `components/ProjectModal.tsx` (rewrite)

**Interfaces:**
- Consumes: `EASE`, `Stagger`, `StaggerItem`, `useModal` (tidak berubah), `site`, `Project`.
- Produces:
  - `<ContactModal {onClose}>` — tanpa prop `open` (mount = tampil, unmount via AnimatePresence).
  - `<ProjectModal {project: Project, onClose}>`.

- [ ] **Step 1: Ubah app/page.tsx**

Ganti import modal + render bagian bawah:

```tsx
import { AnimatePresence } from "framer-motion";
import ContactModal from "@/components/ContactModal";
import ProjectModal from "@/components/ProjectModal";
```

Bagian JSX akhir menjadi:

```tsx
      <Footer />
      <AnimatePresence>
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
```

(Import `ContactModal`/`ProjectModal` lama yang sudah ada tinggal dipertahankan; hapus duplikat jika ada.)

- [ ] **Step 2: Rewrite ContactModal.tsx**

```tsx
"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaXmark, FaCheckCircle } from "react-icons/fa6";
import { useModal } from "@/hooks/useModal";
import { site } from "@/data/site";

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const rm = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalRef = useModal(onClose);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const message = fd.get("message") as string;
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onClose, 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (timerRef.current) clearTimeout(timerRef.current);
          onClose();
        }
      }}
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Contact form"
        tabIndex={-1}
        initial={rm ? false : { opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.18 } }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-[#E5E7EB] max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={() => {
            if (timerRef.current) clearTimeout(timerRef.current);
            onClose();
          }}
          aria-label="Close"
          className="absolute top-6 right-6 text-neutral-400 hover:text-black text-lg"
        >
          <FaXmark />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact Me</span>
          <h3 className="text-2xl font-editorial text-neutral-900 mt-1">Get in Touch</h3>
          <p className="text-xs text-neutral-500 mt-1">Tell me about your project — I&apos;ll get back to you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Name</label>
            <input type="text" name="name" required placeholder="John Doe" className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-lime bg-brand-bg" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Email</label>
            <input type="email" name="email" required placeholder="john@example.com" className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-lime bg-brand-bg" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Message / Project Details</label>
            <textarea name="message" rows={4} required placeholder="Tell me about your project or inquiry..." className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-lime bg-brand-bg" />
          </div>
          <button type="submit" className="w-full bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-semibold py-3.5 rounded-xl transition-colors shadow-md">
            Send Message →
          </button>
        </form>

        {sent && (
          <motion.div
            initial={rm ? false : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs text-center font-medium flex items-center justify-center gap-2"
          >
            <FaCheckCircle /> Thank you! Opening your email app to send the message.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
```

Perubahan: tanpa prop `open`; backdrop + panel motion dengan spring in / fast out; ring fokus input lime; panel scrollable; sukses state pop.

- [ ] **Step 3: Rewrite ProjectModal.tsx**

```tsx
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
```

Catatan: tombol close X ikonik diganti teks "Close ✕" agar tak menutupi thumbnail (ikon absolut lama bertabrakan dengan gambar); jika ingin kembali ke FaXmark, posisikan `z-10` seperti di atas.

- [ ] **Step 4: Verifikasi visual + build**

Dev: buka ContactModal dari Nav/Hero/CTA → backdrop fade + panel spring; ESC/klik luar/tab-trap jalan; submit → check pop. Klik kartu Works → ProjectModal dengan thumb + chips stagger. Tutup → animasi exit cepat. Build sukses.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/ContactModal.tsx components/ProjectModal.tsx
git commit -m "feat(modals): AnimatePresence spring transitions, project modal content upgrade, lime focus rings"
```

---

### Task 12: Verifikasi akhir

**Files:** tidak ada perubahan kode (verifikasi saja).

- [ ] **Step 1: Build penuh**

Run: `npm run build && ls out/index.html`
Expected: build sukses, static export ada.

- [ ] **Step 2: Checklist manual dev (`npm run dev`)**

- Desktop + mobile viewport: tiap section reveal/stagger/hover jalan sekali (tidak repeat saat scroll balik).
- Filter Works: FLIP halus, semua kartu benar per kategori.
- Modal: open/close ESC, klik backdrop, tab-trap, restore fokus ke elemen pemicu.
- DevTools Rendering → Emulate `prefers-reduced-motion: reduce`: semua konten langsung terlihat, tanpa animasi (termasuk glow pulse & marquee? marquee tetap jalan — hanya glow pulse yang dimatikan CSS; marquee adalah konten bergerak non-esensial, biarkan).
- Lighthouse sanity (Chrome DevTools): performa ≥ sebelumnya ± sedikit; tidak ada layout shift besar.

- [ ] **Step 3: Commit final (jika ada sisa)**

```bash
git status
# jika bersih: selesai. Jika ada perbaikan kecil dari checklist:
git add -A && git commit -m "chore: final polish from verification checklist"
```

---

## Self-Review Plan (sudah dijalankan saat penulisan)

1. **Spec coverage:** §2 fondasi→Task 1; §3 Nav→T2, Hero→T3, Marquee→T4, Statement→T5, Process→T6, Works→T7, Experience→T8, CTA→T9, Footer→T10; §4 modals→T11; §5 spacing/fokus→T11 (ring) — spacing rhythm sudah konsisten di kode existing, tidak perlu task; §6 verifikasi→T12. Testimoni dihapus→T6. ✔
2. **Placeholder scan:** tidak ada TBD/TODO; semua step berisi kode lengkap atau instruksi tepat. ✔
3. **Type consistency:** `Reveal/Stagger/StaggerItem/EASE/DURATION` dipakai konsisten lintas task sesuai signature Task 1; props modal baru `{onClose}` / `{project, onClose}` konsisten T11 Step 1 & 2–3. ✔
