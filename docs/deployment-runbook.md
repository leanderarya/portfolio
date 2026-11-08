# Deployment Runbook — Cahaya Arkana

Runbook ini mencatat alur rilis untuk repository `leanderarya/portfolio` dan project Vercel `portfolio`.

## Konfigurasi yang berlaku

- Framework: Next.js App Router, dengan `output: "export"` di `next.config.ts`.
- `npm run build` menjalankan `next build` dan menghasilkan static export di `out/`.
- Project Vercel memakai root directory `.` dan terhubung ke GitHub `leanderarya/portfolio`.
- Branch production Vercel adalah `main`. Push ke branch lain menghasilkan Preview; commit yang masuk ke `main` memicu Production Deployment otomatis.
- Domain production: `www.cahayaarkana.site`. Domain apex `cahayaarkana.site` mengarah ke `www`.

Konfigurasi Git/Vercel dapat berubah. Periksa kembali project Vercel sebelum menjalankan rilis baru.

## Alur rilis normal

1. Periksa branch, perubahan, dan commit yang akan dirilis:

   ```sh
   git status --short --branch
   git diff
   git diff --cached
   ```

   Pastikan hanya perubahan yang disetujui yang masuk commit. Stage path secara eksplisit; jangan memakai `git add -A` jika ada file lain di working tree.

2. Jalankan pemeriksaan lokal:

   ```sh
   npm run typecheck
   npm run build
   ```

   Pastikan asset yang dirujuk `data/projects.ts`, komponen, dan metadata ada di `public/` serta ikut di-commit. Static export membutuhkan berkas tersebut di repository; asset untracked tidak ikut clone GitHub.

3. Untuk perubahan berikutnya, gunakan feature branch untuk memperoleh Preview Deployment. Periksa preview sebelum merge atau push commit rilis ke `main`. Pastikan SHA commit yang akan masuk ke `main` sudah disetujui. Merge/push ke `main` memulai deployment production otomatis; jangan memicu deploy kedua secara manual.

4. Pantau project `portfolio` di Vercel → **Deployments**. Cocokkan branch dan commit SHA, lalu tunggu status **Ready** pada environment **Production**.

5. Smoke-test production:

   - `https://www.cahayaarkana.site/` memberi HTTP 200; apex mengarah ke `www`.
   - Buka Selected Works dan modal Presensi SMS. Pastikan empat gambar galeri tampil berurutan: shift dashboard, GPS attendance, attendance history, leave requests.
   - Periksa atribusi Admin Monitoring dan keterangan synthetic demo data.
   - Uji scroll isi modal, penutupan dengan Escape, dan pemulihan scroll halaman. Periksa juga asset image yang penting memberi HTTP 200.

Next.js menghasilkan static files, bukan server Next.js yang dijalankan dengan `next start`. Untuk preview lokal setelah build, sajikan direktori `out/` dengan static server, misalnya:

```sh
python3 -m http.server 4173 --directory out
```

## Perhatian untuk lokal dan rahasia

- `next dev` dan `next build` menggunakan direktori `.next` yang sama. Jangan jalankan build ketika dev server portfolio masih aktif. Hentikan hanya server portfolio yang dikenali, jalankan build, lalu mulai lagi dev server jika masih diperlukan.
- `.next/`, `out/`, `.vercel/`, dan file `.env*` adalah konfigurasi/hasil lokal yang tidak masuk release. Jangan commit `.env.local`, token OIDC Vercel, credential, atau isi environment. Jangan menaruh secret di runbook, screenshot, log, maupun output commit.
- Vercel Git Integration memakai repository dan akun Vercel. `.vercel/` dan autentikasi lokal tidak diperlukan untuk build static; jangan commit keduanya untuk membuat clone lain bisa build.
- Jangan menghapus `.next/` untuk mengatasi error sebelum memeriksa log dan pemilik proses. Hindari menjalankan `next dev` dan production build secara bersamaan di checkout ini.

## Troubleshooting

- **Remote berbeda dari ekspektasi:** periksa `git status --short --branch`, `git fetch origin`, dan SHA `origin/main`. Jika remote maju atau divergen, berhenti. Jangan force-push, reset, atau rebase perubahan orang lain; sepakati cara integrasi terlebih dahulu.
- **Build Vercel gagal:** buka deployment yang gagal, cocokkan commit SHA, dan baca build logs. Jalankan `npm run typecheck` dan `npm run build` lokal pada commit yang sama. Perbaiki lewat commit baru pada alur Git; push ke `main` akan membuat deployment production baru.
- **Asset 404:** cocokkan path dan kapitalisasi di source dengan file di `public/`; pastikan asset tracked dan berada di commit yang dideploy.
- **Dev lokal memberi 500:** periksa log server dan proses yang memakai port 3000. Jangan membunuh proses yang tidak dikenal atau menjalankan build bersamaan dengan dev server.
- **Project tidak menerima push:** periksa Git Integration, akses Vercel ke repository, production branch `main`, dan status deployment. Jangan beralih ke deploy manual tanpa persetujuan terpisah.

## Manual deployment dan rollback

`vercel deploy --prod` adalah jalur manual khusus, bukan alur normal. Jalankan hanya jika Git Integration tidak dapat dipakai dan ada persetujuan deployment terpisah. CLI dapat mengirim working tree lokal; perubahan uncommitted atau asset yang tidak ada di Git dapat membuat production berbeda dari `main`.

Rollback atau promosi deployment lama selalu memerlukan persetujuan terpisah. Setelah disetujui:

1. Catat deployment production yang sedang aktif dan pilih deployment **Ready** yang diketahui baik.
2. Gunakan **Instant Rollback** di Vercel Deployments atau `vercel rollback` hanya ke deployment yang disetujui. Verifikasi status rollback dan jalankan smoke test production.
3. Instant Rollback menonaktifkan auto-assignment domain. Sebelum mengandalkan deployment Git berikutnya, pemilik harus menyetujui **Undo Rollback** atau promosi deployment yang dipilih untuk memulihkan assignment otomatis.
4. Jika source Git juga perlu dipulihkan, gunakan commit `git revert` baru yang ditinjau dan disetujui, lalu ikuti alur normal. Jangan mengubah history dengan force-push.

Rollback, promosi deployment, dan revert/push yang mengubah production bukan langkah troubleshooting otomatis.

## Referensi resmi

- [Vercel Git deployments dan production branch](https://vercel.com/docs/git)
- [Static export Next.js](https://nextjs.org/docs/pages/guides/static-exports)
- [Vercel CLI deploy](https://vercel.com/docs/cli/deploy)
- [Rollback deployment production Vercel](https://vercel.com/docs/deployments/rollback-production-deployment)
