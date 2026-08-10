export interface Project {
  id: string;
  title: string;
  category: "web" | "cms" | "mobile";
  year: string;
  description: string;
  stack: string[];
  highlight: string;
  thumb?: string; // path gambar di public/projects/, kosong = tampil tanpa gambar
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
  },
  {
    id: "cms-dombi",
    title: "Dombi Commerce Platform",
    category: "cms",
    year: "2026",
    description:
      "Platform commerce operational untuk distribusi produk segar harian: pesanan, pengiriman, kurir, dan manajemen pelanggan. Integrasi pembayaran DOKU (QRIS/Transfer/VA), Google OAuth, dan monitoring Sentry.",
    stack: ["Laravel 13", "React 19", "Inertia", "DOKU", "Leaflet", "Sentry"],
    highlight: "E-commerce + delivery + payment",
  },
  {
    id: "dombi-app",
    title: "Dombi Mobile App",
    category: "mobile",
    year: "2026",
    description:
      "Aplikasi mobile Android (Capacitor) untuk platform commerce Dombi — akses katalog, pesanan, dan notifikasi langsung di perangkat.",
    stack: ["Capacitor", "Android", "Laravel API"],
    highlight: "Android app + Laravel API",
  },
  {
    id: "presensi-sims",
    title: "Presensi SIMS",
    category: "web",
    year: "2025",
    description:
      "Sistem presensi karyawan berbasis web dengan konfigurasi shift kerja, dashboard, dan PWA — Laravel 11 + Inertia React + MUI + AmCharts.",
    stack: ["Laravel 11", "Inertia React", "MUI", "AmCharts", "PWA"],
    highlight: "Presensi + shift kerja + PWA",
  },
  {
    id: "graha-mesran",
    title: "Graha Mesran POS",
    category: "web",
    year: "2025",
    description:
      "Point-of-sale untuk toko otomotif (sparepart & pelumas Pertamina): admin Filament untuk kontrol inventaris & laporan finansial, frontend kasir React yang cepat dan responsif.",
    stack: ["Laravel 12", "Filament 3", "Inertia React", "Excel", "Capacitor"],
    highlight: "Filament admin + React kasir",
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
  },
];
