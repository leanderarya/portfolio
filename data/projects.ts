export interface Project {
  id: string;
  title: string;
  category: "web" | "cms" | "mobile";
  year: string;
  description: string;
  stack: string[];
  highlight: string;
  thumb?: string; // path gambar di public/projects/, kosong = tampil tanpa gambar
  mediaHint?: string; // panduan foto yang dibutuhkan (tampil di placeholder)
}

export const categories = ["All", "Web App", "CMS", "Mobile"] as const;

export const projects: Project[] = [
  {
    id: "mieayam-pos",
    title: "Mie Ayam Plombokan POS",
    category: "web",
    year: "2025",
    description:
      "Point-of-sale offline-first untuk outlet: stok & transaksi jalan tanpa koneksi stabil, integrasi printer kasir & dapur, UI tablet-first untuk kasir cepat.",
    stack: ["React 19", "Vite", "Tailwind v4", "Capacitor", "Laravel 13", "SQLite"],
    highlight: "Offline-first POS + Android",
    mediaHint: "Placeholder 1600×1000 · UI kasir tablet di outlet",
    thumb: "/projects/mieayam.webp",
  },
  {
    id: "cms-dombi",
    title: "DombiCenter CMS and E-Commerce",
    category: "cms",
    year: "2026",
    description:
      "Platform commerce operational untuk distribusi produk segar harian: pesanan, pengiriman, kurir, dan manajemen pelanggan. Integrasi pembayaran DOKU (QRIS/Transfer/VA), Google OAuth, monitoring Sentry, plus aplikasi mobile Android (Capacitor) untuk katalog & pesanan di perangkat.",
    stack: ["Laravel 13", "React 19", "Inertia", "DOKU", "Capacitor", "Sentry"],
    highlight: "E-commerce + delivery + payment + Android",
    mediaHint: "Placeholder 1600×1000 · Storefront katalog DombiCenter",
    thumb: "/projects/dombi.webp",
  },
  {
    id: "cms-sidorejo",
    title: "PT Sidorejo Makmur Sejahtera CMS",
    category: "cms",
    year: "2025",
    description:
      "Company profile & news site untuk PT Sidorejo Makmur Sejahtera: landing page (visi misi, partner, SPBU, karir), berita/artikel, dan contact form — semua konten dikelola lewat admin Filament.",
    stack: ["Laravel 11", "Filament 3", "Tailwind", "Vite"],
    highlight: "Company profile + berita + admin Filament",
    mediaHint: "Placeholder 1600×1000 · Landing page company profile",
    thumb: "/projects/comprosms.webp",
  },
  {
    id: "presensi-sims",
    title: "Presensi SMS",
    category: "web",
    year: "2025",
    description:
      "Sistem presensi karyawan berbasis web dengan konfigurasi shift kerja, dashboard, dan PWA — Laravel 11 + Inertia React + MUI + AmCharts.",
    stack: ["Laravel 11", "Inertia React", "MUI", "AmCharts", "PWA"],
    highlight: "Presensi + shift kerja + PWA",
    mediaHint: "Placeholder 1600×1000 · Dashboard presensi",
    thumb: "/projects/presensi.webp",
  },
  {
    id: "graha-mesran",
    title: "Graha Motor POS",
    category: "web",
    year: "2025",
    description:
      "Point-of-sale untuk toko otomotif (sparepart & pelumas Pertamina): admin Filament untuk kontrol inventaris & laporan finansial, frontend kasir React yang cepat dan responsif.",
    stack: ["Laravel 12", "Filament 3", "Inertia React", "Excel", "Capacitor"],
    highlight: "Filament admin + React kasir",
    mediaHint: "Placeholder 1600×1000 · UI kasir / admin Filament",
  },
  {
    id: "dipo-feed",
    title: "DipoFeed",
    category: "mobile",
    year: "2025",
    description:
      "Aplikasi Flutter untuk peternak sapi perah: hitung, formulasi, dan evaluasi ransum pakan berdasarkan profil sapi & kandungan nutrisi bahan (BK, Protein Kasar, TDN, ME). Cross-platform Android/iOS/Web.",
    stack: ["Flutter", "Dart", "Cross-platform"],
    highlight: "Nutrisi ternak + Flutter",
    mediaHint: "Placeholder 1600×1000 · Dua layar aplikasi berdampingan",
  },
];
