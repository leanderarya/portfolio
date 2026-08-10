# Design Spec — Portofolio Arya Ajisadda

**Tanggal:** 2026-08-10
**Tujuan:** Portofolio freelance / client hunting untuk Arya Ajisadda (Software Engineer & Web Developer).
**Inspirasi:** Desain HTML hasil brainstorming Gemini (light minimal clean, aksen lime `#BFF542`, editorial serif + Inter).

---

## 1. Ringkasan

Landing page satu halaman (single-page) yang menampilkan layanan, proses kerja, dan portofolio project real. Fokus: narik client — CTA "Get in Touch" menonjol, showcase project dengan data asli (bukan fiktif).

**Stack target:** Next.js 15 (App Router) + TypeScript + Tailwind v4. Static export → deploy Vercel.

**Lokasi:** `~/Herd/portfolio`

---

## 2. Konversi dari Desain Gemini

Desain HTML referensi dikonversi ke Next.js 15 + Tailwind v4. Perbedaan teknis:

| Item Gemini (HTML mentah) | Di-Next.js |
|---|---|
| Tailwind CDN (`cdn.tailwindcss.com`) | Tailwind v4 proper (config via CSS `@theme`, bukan JS objek) |
| Font Awesome CDN | `react-icons` (brand icon: react, node, docker, laravel, github, linkedin, x) |
| Google Fonts CDN | `next/font` (Playfair Display + Inter) |
| Unsplash stock photo | placeholder `public/` (diganti foto asli user) |
| `onclick` global JS | React state / event handler per komponen |

Warna brand (dari Tailwind config Gemini):
- `lime: #BFF542`, `lime-hover: #A3E635`
- `dark: #18181B`, `dark-hover: #27272A`
- `bg: #FAF9F6`, `surface: #FFFFFF`
- `border: #E5E7EB`, `muted: #666666`

Font: `Playfair Display` (editorial, heading) + `Inter` (body/sans).

---

## 3. Klaim Fiktif — Dibersihkan

Desain Gemini berisi klaim fiktif. **SEMUA dihapus/diganti data real:**

- ❌ "Google Website Of The Day 2026 Nominee" → dihapus (badge)
- ❌ "Trusted by 10+ startups" → dihapus; ganti statistik real bila ada, default dihapus
- ❌ "4+ Yrs / 99.9% Uptime" stats → dihapus (tanpa bukti)
- ❌ Testimoni "Sarah Nguyen VP FlowSync" → dihapus (fiktif)
- ❌ Project fiktif (Finvera, Havenly Real Estate, AI Liveness) → diganti 6 project real

Keputusan user: **isi data real.** Data yang tidak punya bukti = dihapus, bukan diisi placeholder klaim.

---

## 4. Struktur Halaman & Komponen

```
~/Herd/portfolio/
├── app/
│   ├── layout.tsx          — font (next/font), metadata, globals.css
│   ├── page.tsx            — rakit semua section
│   └── globals.css         — tailwind v4 @theme (warna brand, shadow, mesh gradient, marquee keyframes)
├── components/
│   ├── Nav.tsx             — sticky nav + mobile drawer
│   ├── Hero.tsx            — headline, status badge, portrait, bio, CTA, stats
│   ├── TechMarquee.tsx     — tech stack scroll (React, Next, TS, Tailwind, Docker, Node, Laravel, PostgreSQL)
│   ├── Process.tsx         — 3 kartu: Discover & Architect / Build & Optimize / Deploy & Scale
│   ├── Works.tsx           — bento grid + filter tab (All / Web App / CMS / Mobile)
│   ├── CTA.tsx             — final section CTA
│   ├── Footer.tsx          — copyright + social links
│   ├── ContactModal.tsx    — modal contact (form → mailto)
│   └── ProjectModal.tsx    — modal detail project
├── data/
│   └── projects.ts         — data 6 project real (mudah diedit)
└── public/                 — foto, favicon, og-image
```

Section & urutan (sesuai desain Gemini):
1. Nav (sticky)
2. Hero — headline "Hi I'm Arya Ajisadda, Software Engineer & Web Developer", status badge, portrait card, bio, CTA
3. TechMarquee — tech stack scroll
4. Process — "Here's how I work" 3 kartu
5. Testimonial — **DIHAPUS untuk v1.** Testimoni Gemini (Sarah Nguyen/FlowSync) fiktif. Section di-skip sampai ada testimoni real dari client. (Pantau: `Testimonial.tsx` tidak dibuat.)
6. Works — "Selected Works" bento grid + filter
7. CTA — "Have an ambitious project in mind?"
8. Footer

---

## 5. Data Project Real (6)

Dari repo user, stack diverifikasi dari package.json/composer.json:

| # | Nama | Kategori | Stack real |
|---|---|---|---|
| 1 | **Mie Ayam Plombokan POS** | Web App | React 19, Vite, Tailwind v4, Capacitor (Android), Laravel 13 + Sanctum, SQLite |
| 2 | **CMS Dombi** | CMS | Laravel 13, Inertia v3 + React, Web Push, Backup |
| 3 | **Dombi App** | Mobile | Capacitor Android, Laravel API |
| 4 | **Presensi SIMS** | Web App | Laravel + Inertia React, MUI, Leaflet (GPS), AmCharts |
| 5 | **Graha Motor POS (Graha Mesran)** | Web App | Laravel 12, Filament 3, Inertia React, Radix/shadcn, Capacitor |
| 6 | **Multi-Tenant POS** | Web App | Laravel + React + Capacitor |

Format `data/projects.ts`:
```ts
interface Project {
  id: string
  title: string
  category: 'web' | 'cms' | 'mobile'
  year: string
  description: string
  stack: string[]
  highlight?: string   // teks stat/keterangan visual kartu
}
```

Deskripsi singkat per project ditulis dari sifat repo (POS, CMS, presensi, dll) — bukan klaim performa fiktif. Filter kategori: All / Web App / CMS / Mobile.

---

## 6. Interaksi

- **Nav:** sticky, backdrop-blur; mobile → drawer hamburger (toggle)
- **Works filter:** klik tab menampilkan/menyembunyikan kartu project (client-side state)
- **Contact modal:** form name/email/message; submit → `mailto:` (buka email draft). Validasi dasar: required, email format. Feedback sukses singkat.
- **Project modal:** klik ikon kartu → detail project (title + description)

---

## 7. Form Contact — mailto (YAGNI)

Modal contact pakai `mailto:` — buka client email user dengan isi form. Tanpa backend form dulu.
→ **Skipped:** backend form service (Formspree/API). **Add when:** ada kebutuhan form yang benar-benar terkirim tanpa buka email, atau tracking.

---

## 8. SEO & Metadata

- `layout.tsx`: `<meta>` title, description, Open Graph, viewport
- `metadata` Next.js (title: "Arya Ajisadda — Software Engineer & Web Developer")
- Semantic HTML (header, main, section, footer), heading hierarki benar, alt text gambar

---

## 9. Error Handling

- Form: validasi required + email format (HTML5 `required`/`type=email` + check JS)
- Gambar: `alt` selalu ada; fallback di `public/`
- Tidak ada data dinamis (static) → tidak ada error async/network yang perlu ditangani

---

## 10. Testing & Verification

- **Self-check:** `npm run build` menghasilkan sukses (static export). Ini verifikasi utama.
- Render cek: halaman tampil tanpa error di dev.
- Tidak pakai framework test (landing static, YAGNI). Filter/modal dikonfirmasi manual via browsing.

---

## 11. Deploy

- Vercel (dipilih user). Static export kompatibel.
- Git repo di `~/Herd/portfolio`, commit, push, connect Vercel.

---

## 12. Out of Scope (YAGNI)

- ❌ Backend form (mailto cukup)
- ❌ Blog / CMS admin
- ❌ Halaman per-project (case study detail) — modal cukup untuk v1
- ❌ Dark mode toggle
- ❌ Klaim fiktif / statistik tanpa bukti

→ **Add when:** client minta form real, mau nulis blog, mau case study mendalam.
