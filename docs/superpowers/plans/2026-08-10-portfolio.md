# Portofolio Arya Ajisadda Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing page portofolio freelance satu halaman (single-page) dengan 6 project real, untuk Arya Ajisadda (Software Engineer & Web Developer).

**Architecture:** Next.js 15 App Router static export. Satu halaman `app/page.tsx` merakit section komponen (`Nav`, `Hero`, `TechMarquee`, `Process`, `Works`, `CTA`, `Footer`) + 2 modal (`ContactModal`, `ProjectModal`). Data project terpisah di `data/projects.ts`.

**Tech Stack:** Next.js 15, TypeScript, Tailwind v4, `react-icons`, `next/font` (Playfair Display + Inter).

## Global Constraints

- **Lokasi:** `~/Herd/portfolio`
- **Versi:** Next.js 15, TypeScript, Tailwind v4 (config via CSS `@theme`, bukan JS objek)
- **Ikon:** `react-icons` saja (bukan Font Awesome CDN)
- **Font:** `next/font` Google (Playfair Display + Inter), bukan CDN
- **Warna brand:** lime `#BFF542`, lime-hover `#A3E635`, dark `#18181B`, dark-hover `#27272A`, bg `#FAF9F6`, surface `#FFFFFF`, border `#E5E7EB`, muted `#666666`
- **Tidak ada klaim fiktif** — tidak ada badge nominee, stats tanpa bukti, testimoni palsu, project palsu
- **Testimonial section: TIDAK dibuat** (v1 skip)
- **Form contact:** `mailto:` (bukan backend)
- **Verifikasi:** `npm run build` sukses (static export) — ini self-check utama tiap task
- **Bahasa konten:** Inggris (sesuai desain Gemini)

---

### Task 1: Scaffold Next.js 15 + TS + Tailwind v4

**Files:**
- Create: `~/Herd/portfolio/package.json`
- Create: `~/Herd/portfolio/tsconfig.json`
- Create: `~/Herd/portfolio/next.config.ts`
- Create: `~/Herd/portfolio/postcss.config.mjs`
- Create: `~/Herd/portfolio/app/layout.tsx`
- Create: `~/Herd/portfolio/app/globals.css`
- Create: `~/Herd/portfolio/app/page.tsx` (placeholder)
- Create: `~/Herd/portfolio/.gitignore`
- Create: `~/Herd/portfolio/next-env.d.ts` (via build)

**Interfaces:**
- Consumes: `~/Herd/portfolio/docs/superpowers/specs/2026-08-10-portfolio-design.md` (spec)
- Produces: project scaffold yang bisa `npm run build`; `app/globals.css` berisi Tailwind v4 `@theme` dengan warna brand + keyframes (marquee, mesh gradient)

- [ ] **Step 1: Init package.json**

```bash
cd ~/Herd/portfolio
npm init -y
```

- [ ] **Step 2: Install dependencies**

```bash
npm install next@^15 react react-dom react-icons
npm install -D typescript @types/react @types/node @types/react-dom tailwindcss @tailwindcss/postcss postcss
```

- [ ] **Step 3: Tulis `next.config.ts`** (static export)

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 4: Tulis `postcss.config.mjs`**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 5: Tulis `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 6: Tulis `app/globals.css`** — Tailwind v4 tema + keyframes

```css
@import "tailwindcss";

@theme {
  --color-lime: #bff542;
  --color-lime-hover: #a3e635;
  --color-dark: #18181b;
  --color-dark-hover: #27272a;
  --color-surface: #ffffff;
  --color-border: #e5e7eb;
  --color-muted: #666666;
  --color-brand-bg: #faf9f6;

  --font-serif: "Playfair Display", "Instrument Serif", serif;
  --font-sans: "Inter", sans-serif;

  --shadow-soft-ambient: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
  --shadow-card-hover: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  --shadow-glow-lime: 0 0 50px 10px rgba(191, 245, 66, 0.45);
}

body {
  background-color: #faf9f6;
  color: #111111;
  overflow-x: hidden;
}

.font-editorial {
  font-family: var(--font-serif);
}

.mesh-gradient-bg {
  background: radial-gradient(circle at 50% 40%, rgba(191, 245, 66, 0.8) 0%, rgba(220, 252, 148, 0.4) 35%, rgba(250, 249, 246, 0) 70%);
}

@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: flex;
  width: 200%;
  animation: marquee 25s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}

::selection {
  background-color: #bff542;
  color: #000;
}
```

- [ ] **Step 7: Tulis `.gitignore`**

```
node_modules/
.next/
out/
*.tsbuildinfo
next-env.d.ts
.DS_Store
```

- [ ] **Step 8: Tulis `app/layout.tsx`** — font + metadata

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Arya Ajisadda — Software Engineer & Web Developer",
  description:
    "Software Engineer & Web Developer. Building robust web applications, CMS, POS systems, and mobile apps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 9: Tulis `app/page.tsx` placeholder**

```tsx
export default function Home() {
  return <main className="min-h-screen"></main>;
}
```

- [ ] **Step 10: Build verifikasi**

```bash
cd ~/Herd/portfolio && npm run build
```
Expected: build sukses, output `out/` (static export).

- [ ] **Step 11: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js 15 + Tailwind v4 static export"
```

---

### Task 2: Data project real (`data/projects.ts`)

**Files:**
- Create: `~/Herd/portfolio/data/projects.ts`

**Interfaces:**
- Consumes: nothing (data statis)
- Produces: `export const categories: string[]` dan `export const projects: Project[]` — dikonsumsi Works.tsx (Task 5)

- [ ] **Step 1: Tulis `data/projects.ts`**

```ts
export interface Project {
  id: string;
  title: string;
  category: "web" | "cms" | "mobile";
  year: string;
  description: string;
  stack: string[];
  highlight: string;
}

export const categories = ["All", "Web App", "CMS", "Mobile"] as const;

export const projects: Project[] = [
  {
    id: "mieayam-pos",
    title: "Mie Ayam Plombokan POS",
    category: "web",
    year: "2026",
    description:
      "Point-of-sale system untuk usaha mie ayam: manajemen menu, transaksi, dan laporan penjualan. Aplikasi hybrid Android + dashboard web.",
    stack: ["React 19", "Vite", "Tailwind v4", "Capacitor", "Laravel 13", "SQLite"],
    highlight: "POS + Android hybrid",
  },
  {
    id: "cms-dombi",
    title: "CMS Dombi",
    category: "cms",
    year: "2026",
    description:
      "Content management system dengan notifikasi web push dan backup otomatis. Arsitektur monorepo backend + frontend Inertia.",
    stack: ["Laravel 13", "Inertia", "React", "Web Push", "Backup"],
    highlight: "Laravel + Inertia + Web Push",
  },
  {
    id: "dombi-app",
    title: "Dombi App",
    category: "mobile",
    year: "2026",
    description:
      "Aplikasi mobile Android (Capacitor) yang terkoneksi dengan backend CMS Dombi — akses konten dan notifikasi di perangkat.",
    stack: ["Capacitor", "Android", "Laravel API"],
    highlight: "Android app + Laravel API",
  },
  {
    id: "presensi-sims",
    title: "Presensi SIMS",
    category: "web",
    year: "2025",
    description:
      "Sistem presensi dengan pelacakan GPS (Leaflet), dashboard analitik (AmCharts), dan UI berbasis Material UI + Inertia React.",
    stack: ["Laravel", "Inertia React", "MUI", "Leaflet", "AmCharts"],
    highlight: "GPS tracking + analytics",
  },
  {
    id: "graha-mesran",
    title: "Graha Motor POS",
    category: "web",
    year: "2025",
    description:
      "Point-of-sale untuk dealer motor (Graha Mesran): admin Filament 3, frontend Inertia React dengan shadcn/Radix, plus aplikasi Android.",
    stack: ["Laravel 12", "Filament 3", "Inertia React", "shadcn", "Capacitor"],
    highlight: "Filament admin + React + Android",
  },
  {
    id: "multi-tenant-pos",
    title: "Multi-Tenant POS",
    category: "web",
    year: "2025",
    description:
      "Arsitektur point-of-sale multi-tenant: satu basis kode melayani banyak tenant dengan isolasi data, backend + frontend monorepo.",
    stack: ["Laravel", "React", "Capacitor", "Multi-tenant"],
    highlight: "Multi-tenant architecture",
  },
];
```

- [ ] **Step 2: Verifikasi TypeScript**

```bash
cd ~/Herd/portfolio && npx tsc --noEmit
```
Expected: no type errors.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: project data (6 real projects)"
```

---

### Task 3: Nav.tsx (sticky nav + mobile drawer)

**Files:**
- Create: `~/Herd/portfolio/components/Nav.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: `<Nav />` — dipasang di `app/page.tsx`. Memakai `useState` untuk mobile menu. Memanggil `onOpenContact` prop ke ContactModal (Task 6).

- [ ] **Step 1: Tulis `components/Nav.tsx`** (client component)

```tsx
"use client";

import { useState } from "react";
import { FaBars, FaXmark, FaArrowRight } from "react-icons/fa6";

export default function Nav({ onOpenContact }: { onOpenContact: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About Me" },
    { href: "#process", label: "How I Work" },
    { href: "#works", label: "Selected Works" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF9F6]/80 border-b border-[#E5E7EB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-editorial italic text-2xl text-neutral-900">Arya</span>
          <span className="text-xl font-bold tracking-tight text-neutral-900">Ajisadda</span>
        </a>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-2 bg-[#18181B] hover:bg-[#27272A] text-white text-xs md:text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            Get in Touch
            <FaArrowRight className="text-xs" />
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="p-2.5 rounded-full bg-white border border-[#E5E7EB] text-neutral-800 hover:bg-neutral-50"
          >
            {open ? <FaXmark className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b border-[#E5E7EB] bg-white px-6 py-6 space-y-4">
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
      )}
    </header>
  );
}
```

- [ ] **Step 2: Build verifikasi**

```bash
cd ~/Herd/portfolio && npm run build
```
Expected: sukses.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: Nav with mobile drawer"
```

---

### Task 4: Hero.tsx + TechMarquee.tsx

**Files:**
- Create: `~/Herd/portfolio/components/Hero.tsx`
- Create: `~/Herd/portfolio/components/TechMarquee.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: `<Hero onOpenContact={...} />` dan `<TechMarquee />` untuk `app/page.tsx`. Hero: headline editorial, status badge, portrait card (placeholder `public/portrait.jpg`), bio, CTA, stat pills (tanpa klaim palsu — pakai info netral: "Available for new opportunities").

- [ ] **Step 1: Tulis `components/Hero.tsx`**

```tsx
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
              <p className="text-xs text-neutral-600 leading-relaxed">
                Building robust web applications, CMS, point-of-sale systems, and mobile apps for clients.
              </p>
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
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-lime/30 to-white">
              <div className="absolute top-1/4 w-64 h-64 rounded-full bg-lime/60 blur-2xl" />
              <img
                src="/portrait.jpg"
                alt="Arya Ajisadda"
                className="relative z-10 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
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
              Passionate about engineering robust web applications, CMS platforms, and POS systems from backend to frontend.
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
```

- [ ] **Step 2: Tulis `components/TechMarquee.tsx`**

```tsx
import {
  FaReact,
  FaJs,
  FaDocker,
  FaNodeJs,
  FaLaravel,
  FaDatabase,
} from "react-icons/fa6";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

const techs = [
  { name: "React 19", icon: <FaReact className="text-xl" /> },
  { name: "Next.js 15", icon: <SiNextdotjs className="text-xl" /> },
  { name: "TypeScript", icon: <FaJs className="text-xl" /> },
  { name: "Tailwind v4", icon: <SiTailwindcss className="text-xl" /> },
  { name: "Docker", icon: <FaDocker className="text-xl" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-xl" /> },
  { name: "Laravel", icon: <FaLaravel className="text-xl" /> },
  { name: "PostgreSQL", icon: <FaDatabase className="text-xl" /> },
];

function Row() {
  return (
    <div className="flex items-center space-x-12 sm:space-x-20 shrink-0 text-neutral-700 font-semibold text-sm">
      {techs.map((t) => (
        <span key={t.name} className="flex items-center gap-2 whitespace-nowrap">
          {t.icon} {t.name}
        </span>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section className="py-10 border-y border-[#E5E7EB]/70 bg-white/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
          Core Technologies & Ecosystem
        </span>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Buat placeholder `public/portrait.jpg`**

Tekankan: ini placeholder, diganti foto asli user. Buat file kosong tak tampil baik — ganti dengan SVG sederhana.

```bash
mkdir -p ~/Herd/portfolio/public
```

Tulis `public/portrait.jpg` sebagai foto placeholder (mis. copy 1 gambar dari repo sample ~/Herd, atau biarkan user sediakan). Verifikasi `npm run build` tetap sukses (gambar boleh tidak ada — img `onerror` di-handle browser).

- [ ] **Step 4: Build verifikasi**

```bash
cd ~/Herd/portfolio && npm run build
```
Expected: sukses.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Hero + TechMarquee sections"
```

---

### Task 5: Process.tsx + Works.tsx (bento grid + filter)

**Files:**
- Create: `~/Herd/portfolio/components/Process.tsx`
- Create: `~/Herd/portfolio/components/Works.tsx`

**Interfaces:**
- Consumes: `projects` + `categories` dari `data/projects.ts` (Task 2)
- Produces: `<Process />` dan `<Works onOpenProject={handle} />` untuk `app/page.tsx`. Works pakai `useState` untuk filter + modal project. Prop `onOpenProject(project: Project)` ke ProjectModal (Task 6).

- [ ] **Step 1: Tulis `components/Process.tsx`**

```tsx
import { FaDiagramProject, FaCode, FaRocket } from "react-icons/fa6";

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
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
          / Engineering Process
        </span>
        <h2 className="text-3xl sm:text-5xl font-editorial text-neutral-900 mt-2">Here's how I work</h2>
        <p className="text-sm text-neutral-600 mt-3">
          Combining engineering rigor, clean code architecture, and high aesthetic standards from inception to deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className={`bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-soft-ambient hover:-translate-y-1 transition-all duration-300 group ${
              i === 1 ? "md:-translate-y-3 hover:-translate-y-4" : ""
            }`}
          >
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
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Tulis `components/Works.tsx`** (client)

```tsx
"use client";

import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { categories, projects, type Project } from "@/data/projects";

const cols: Record<string, string> = {
  "mieayam-pos": "md:col-span-8",
  "cms-dombi": "md:col-span-4",
  "dombi-app": "md:col-span-4",
  "presensi-sims": "md:col-span-8",
  "graha-mesran": "md:col-span-4",
  "multi-tenant-pos": "md:col-span-8",
};

const catLabel: Record<string, string> = { web: "Web App", cms: "CMS", mobile: "Mobile" };

export default function Works({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active.toLowerCase());

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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className={`${cols[p.id] ?? "md:col-span-6"} bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 flex flex-col justify-between group hover:shadow-card-hover transition-all duration-300`}
          >
            <div>
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
                <FaArrowUpRightFromSquare className="text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build verifikasi**

```bash
cd ~/Herd/portfolio && npm run build
```
Expected: sukses. Catatan: `@/` alias butuh `baseUrl`/`paths` di tsconfig (sudah ada di Task 1 Step 5).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Process + Works bento grid with filter"
```

---

### Task 6: Modals (ContactModal + ProjectModal)

**Files:**
- Create: `~/Herd/portfolio/components/ContactModal.tsx`
- Create: `~/Herd/portfolio/components/ProjectModal.tsx`

**Interfaces:**
- Consumes: `Project` type dari `data/projects.ts`
- Produces: `<ContactModal open onClose />` dan `<ProjectModal project: Project | null onClose />` untuk `app/page.tsx`. ContactModal form → `mailto:`; validasi required + email.

- [ ] **Step 1: Tulis `components/ContactModal.tsx`**

```tsx
"use client";

import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const message = fd.get("message") as string;
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:arya.ajisadda@example.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(onClose, 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-[#E5E7EB]">
        <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 text-neutral-400 hover:text-black text-lg">
          <FaXmark />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Contact Me</span>
          <h3 className="text-2xl font-editorial text-neutral-900 mt-1">Get in Touch</h3>
          <p className="text-xs text-neutral-500 mt-1">Send a message and I'll respond within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Name</label>
            <input type="text" name="name" required placeholder="John Doe" className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#18181B] bg-brand-bg" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Email</label>
            <input type="email" name="email" required placeholder="john@example.com" className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#18181B] bg-brand-bg" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Message / Project Details</label>
            <textarea name="message" rows={4} required placeholder="Tell me about your project or inquiry..." className="w-full text-sm px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#18181B] bg-brand-bg" />
          </div>
          <button type="submit" className="w-full bg-[#18181B] hover:bg-[#27272A] text-white text-sm font-semibold py-3.5 rounded-xl transition-colors shadow-md">
            Send Message →
          </button>
        </form>

        {sent && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs text-center font-medium">
            Thank you! Opening your email app to send the message.
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Tulis `components/ProjectModal.tsx`**

```tsx
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
```

- [ ] **Step 3: Build verifikasi**

```bash
cd ~/Herd/portfolio && npm run build
```
Expected: sukses.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: contact + project modals"
```

---

### Task 7: CTA + Footer + rakit di page.tsx

**Files:**
- Create: `~/Herd/portfolio/components/CTA.tsx`
- Create: `~/Herd/portfolio/components/Footer.tsx`
- Modify: `~/Herd/portfolio/app/page.tsx`

**Interfaces:**
- Consumes: semua komponen (Nav, Hero, TechMarquee, Process, Works, CTA, Footer, ContactModal, ProjectModal)
- Produces: halaman final yang lengkap. `page.tsx` jadi client component (pakai state modal), merakit semua section.

- [ ] **Step 1: Tulis `components/CTA.tsx`**

```tsx
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
```

- [ ] **Step 2: Tulis `components/Footer.tsx`**

```tsx
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="font-editorial italic text-xl">Arya</span>
          <span className="text-sm font-bold">Ajisadda</span>
          <span className="text-xs text-neutral-400 ml-2">© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-neutral-600 text-sm">
          <a href="https://github.com" target="_blank" rel="noopener" className="hover:text-black transition-colors flex items-center gap-1.5">
            <FaGithub className="text-base" /> GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" className="hover:text-black transition-colors flex items-center gap-1.5">
            <FaLinkedin className="text-base" /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Rakit `app/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Process from "@/components/Process";
import Works from "@/components/Works";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ProjectModal from "@/components/ProjectModal";
import type { Project } from "@/data/projects";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <Nav onOpenContact={() => setContactOpen(true)} />
      <main>
        <Hero onOpenContact={() => setContactOpen(true)} />
        <TechMarquee />
        <Process />
        <Works onOpenProject={setActiveProject} />
        <CTA onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
```

- [ ] **Step 4: Build verifikasi**

```bash
cd ~/Herd/portfolio && npm run build
```
Expected: sukses, static export `out/`.

- [ ] **Step 5: Cek render dev (manual spot-check)**

```bash
cd ~/Herd/portfolio && npm run dev
```
Buka di browser: nav responsive, hero, marquee, filter works jalan, modal contact & project muncul. Confirm lalu stop dev server.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: assemble full portfolio landing page"
```

---

### Task 8: Final verification + README

**Files:**
- Create: `~/Herd/portfolio/README.md`

**Interfaces:**
- Consumes: project final
- Produces: README petunjuk run/deploy + verifikasi final.

- [ ] **Step 1: Tulis `README.md`**

```markdown
# Portofolio — Arya Ajisadda

Landing page portofolio freelance. Next.js 15 + TypeScript + Tailwind v4, static export.

## Run

```bash
npm install
npm run dev      # dev
npm run build    # static export → out/
```

## Customize

- Project: edit `data/projects.ts`
- Foto: ganti `public/portrait.jpg`
- Email: ganti di `ContactModal.tsx` & `CTA.tsx` (`arya.ajisadda@example.com`)
- Warna/tema: `app/globals.css` (`@theme`)

## Deploy

Static export → Vercel. Push repo, connect di Vercel.
```

- [ ] **Step 2: Final build**

```bash
cd ~/Herd/portfolio && npm run build
```
Expected: sukses tanpa error.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "docs: add README"
```

---

## Self-Review

**Spec coverage:**
- ✅ Scaffold Next.js + Tailwind v4 (Task 1) — spec §2, §4
- ✅ Data 6 project real (Task 2) — spec §5
- ✅ Nav sticky + mobile (Task 3) — spec §4, §6
- ✅ Hero + status badge + CTA (Task 4) — spec §4
- ✅ TechMarquee (Task 4) — spec §4
- ✅ Process 3 kartu (Task 5) — spec §4
- ✅ Works bento + filter (Task 5) — spec §4, §6
- ✅ Contact modal mailto (Task 6) — spec §7
- ✅ Project modal (Task 6) — spec §6
- ✅ CTA + Footer (Task 7) — spec §4
- ✅ SEO metadata (Task 1 layout) — spec §8
- ✅ Tidak ada Testimonial (skip) — spec §12
- ✅ Tidak ada klaim fiktif — spec §3

**Placeholder scan:** Semua step punya kode aktual. Satu-satunya nilai yang perlu diganti user: foto portrait + email → ditandai jelas di Task 7/README.

**Type consistency:** `Project` interface didefinisikan Task 2, dipakai Works (Task 5), ProjectModal & page.tsx (Task 6/7). Prop `onOpenProject: (p: Project) => void` konsisten. `onOpenContact: () => void` konsisten di Nav/Hero/CTA. `categories`/`catLabel` dipakai Works. Layout static (server) + page client — boundary benar (page.tsx "use client" membaca komponen server anak).

**Verification:** `npm run build` di tiap task = self-check. Tidak ada test framework (static landing, YAGNI — sesuai spec §10).