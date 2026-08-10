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
