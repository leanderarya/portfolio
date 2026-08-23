# Design Spec — UI/UX Elevation Portofolio Arya Ajisadda

**Tanggal:** 2026-08-23
**Tujuan:** Elevate landing page portofolio ke level personal-brand/gengsi — kesan craft yang diingat, tanpa mengganti identitas visual.
**Prekursor:** `2026-08-10-portfolio-design.md` (v1, terpenuhi). Spec ini evolusi, bukan redesign.

---

## 1. Keputusan Produk (hasil brainstorming)

| Keputusan | Pilihan |
|---|---|
| Tujuan utama | Gengsi / personal brand (bukan conversion-first) |
| Arah visual | Elevate arah sekarang: light minimal + lime `#BFF542` dipertahankan |
| Level motion | Sedang: scroll reveal, parallax ringan Hero, hover micro-interaction |
| Cakupan | Full page — semua section + kedua modal + Nav + Footer |
| Library animasi | **Framer Motion v12** (declarative, idiomatik React 19; bukan GSAP/CSS murni) |
| Testimoni fiktif | **Dihapus total** dari `Process.tsx` — menyalahi Real Data Only Principle spec v1 |

---

## 2. Fondasi Motion

### Dependensi
- `framer-motion@^12` (satu-satunya dep baru). Import dari `"framer-motion"`.

### Primitives — `components/motion/`
Satu file `primitives.tsx` ("use client") berisi:

1. **`Reveal`** — wrapper fade+up saat masuk viewport.
   - Props: `delay?: number`, `y?: number` (default 24), `className?: string`, `children`.
   - `whileInView` + `viewport={{ once: true, margin: "-80px" }}` → tidak repeat saat scroll balik.
   - Reduced motion: langsung render tanpa animasi (`useReducedMotion()`).

2. **`Stagger` / `StaggerItem`** — container variants (`staggerChildren`) + item (`fade+y`).
   - Props container: `delay?: number`, `gap?: number` (default 0.08).

3. Konstanta bersama:
   - `EASE = [0.22, 1, 0.36, 1]`
   - `DURATION = 0.55`

### Aturan global
- Hanya animasi `transform` + `opacity` (GPU-friendly). Tidak animate layout props.
- Setiap komponen yang memakai motion primitives sudah/tetap `"use client"`.
- Semua animasi hormati `prefers-reduced-motion` via `useReducedMotion`.

---

## 3. Per Section

### Nav.tsx
- Hide-on-scroll-down / show-on-scroll-up: `useScroll` + `useMotionValueEvent`; header `-translate-y-full` saat turun >8px, kembali saat naik.
- Background makin opaque setelah scrollY > 24px (`bg-[#FAF9F6]/95` + shadow tipis).
- Mobile drawer: bungkus `AnimatePresence` → animasi height auto + opacity.
- Link hover: underline lime scaleX draw (CSS pseudo, tanpa motion lib).

### Hero.tsx
- Load choreography (sekali saat mount, stagger):
  1. Badge "Available..." fade-down
  2. Headline baris-per-baris clip reveal (span overflow-hidden + y 100%→0)
  3. Kartu tag kiri + kartu Laravel/React fade-up
  4. Portrait scale 1.04→1 + fade
  5. Bio + dua tombol fade-up
- Portrait parallax ringan: `useScroll` target section → translateY ±20px pada gambar.
- Tombol "Get in Touch": arrow `translate-x` nudge saat hover (CSS group-hover).
- Grayscale→color portrait tetap (sudah ada).

### TechMarquee.tsx
- Edge fade mask: CSS `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)` di wrapper.
- Durasi marquee 25s → 35s (lebih kalem).
- Pause-on-hover tetap.

### Statement.tsx
- Headline reveal per baris manual (split span statis, bukan library split) saat in view.
- Underline lime pada "clear architecture": scaleX 0→1 origin-left saat in view.
- Pills: `Stagger` pop-in (scale 0.9→1 + fade).

### Process.tsx
- Header section fade-up.
- Kartu langkah: `Stagger` fade-up.
- Hover lift & number bg transition tetap (CSS).
- **Block testimoni (L61–104) dihapus seluruhnya** beserta markup divide-x-nya.

### Works.tsx
- Grid pertama masuk viewport: `Stagger` fade-up.
- Filter tab: kartu pakai `motion.div layout` + `AnimatePresence mode="popLayout"` → FLIP smooth saat filter berubah.
- Card hover: thumb `scale(1.03)`, tombol arrow rotate 45°, shadow-card-hover (CSS transition, konsisten dengan pola lama).
- Filter tab aktif tetap warna solid (tanpa indicator geser — YAGNI).

### Experience.tsx
- Heading kolom kiri fade-up.
- Item riwayat: slide-in dari kanan (x 32→0) stagger per item.
- Garis pemisah antar item: scaleX 0→1 draw.

### CTA.tsx
- Stagger: badge → judul → paragraf → dua tombol.
- Glow blur pulse pelan via CSS keyframes (opacity 0.2 ↔ 0.35, 6s ease-in-out infinite).
- Tombol "Start a Conversation": hover glow menguat + arrow nudge.

### Footer.tsx
- Watermark brand besar: fade-in + y kecil saat in view.
- Ikon sosial: hover -translate-y-0.5 + warna lime (CSS).

---

## 4. Modal System

### Pola umum (kedua modal)
- State modal pindah ke pola `AnimatePresence` di `page.tsx`: `{contactOpen && <ContactModal/>}`, `{activeProject && <ProjectModal/>}`.
- Backdrop: opacity 0→1. Panel: scale 0.96→1 + y 12→0, spring lembut (stiffness ~300, damping ~28). Exit kebalikannya (cepat, 0.18s).
- Hook `useModal` (ESC + focus trap + restore focus) **tetap dipakai** — tidak diganti.
- Focus ring konsisten: `focus:ring-lime` untuk input (menggantikan ring hitam), kontras dijaga.
- Panel: `max-h-[90vh] overflow-y-auto` agar aman di layar pendek.

### ContactModal.tsx
- Transisi sesuai pola umum.
- State `sent`: teks sukses + ikon check dengan pop animation kecil.
- Sisanya (mailto flow, timer close) tidak berubah.

### ProjectModal.tsx
- Upgrade konten: thumbnail image (pakai `project.thumb` bila ada), badge kategori + tahun, stack chips stagger-in.
- Lebar panel naik `max-w-md` → `max-w-lg` untuk muat gambar.
- Transisi sesuai pola umum.

---

## 5. Non-Motion Polish

- Spacing rhythm section seragam: `py-20 md:py-28` (yang belum: disamakan).
- Fokus visible di semua elemen interaktif (keyboard nav tetap enak).

---

## 6. Verifikasi

- `npm run build` sukses (static export `out/` tetap jalan — framer-motion client-side only).
- Manual dev check:
  - Tiap section desktop + mobile (reveal, stagger, hover)
  - Filter Works: kartu FLIP halus, tidak ada kartu hilang/zig-zag aneh
  - Modal: open/close ESC, klik backdrop, tab-trap, restore focus
  - `prefers-reduced-motion: reduce` (devtools emulation) → semua animasi off, konten tetap terlihat
- Lighthouse sanity: performa tidak turun drastis (transform/opacity only).

---

## 7. Out of Scope (YAGNI)

- ❌ GSAP / ScrollTrigger / pinning / scrubbing
- ❌ Dark mode toggle
- ❌ Custom cursor / cursor follower
- ❌ Page transition (single page)
- ❌ Split-text library (GSAP SplitText dsb) — split manual cukup
- ❌ Konten baru (copy tetap)

→ **Add when:** mau scroll-storytelling sinematik (naik level ke GSAP), multi-halaman (page transition relevan).
