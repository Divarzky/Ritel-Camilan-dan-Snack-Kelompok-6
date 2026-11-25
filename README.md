# Camilan Nusantara — Website Ritel Makanan Ringan Kemasan

Proyek website ritel **Camilan Nusantara** untuk **Tugas 2 Mata Kuliah Pemrograman Web (WebPRO)**, dikembangkan oleh **Kelompok 6**, Program Studi S-1 Teknik Informatika, Fakultas Teknologi Informasi, Universitas Islam Balitar (Unisba Blitar).

Website ini memadukan fondasi **HTML5 Semantik** dari Tugas 1 dengan peningkatan tampilan bertema **Vintage Nusantara** menggunakan **CSS3 Murni** dan **Vanilla JavaScript** terpusat untuk fitur interaktif (katalog produk, pencarian instan, keranjang belanja `LocalStorage`, checkout WhatsApp, formulir Kritik & Saran via Formspree, serta sistem notifikasi dengan fallback lokal).

---

## Identitas Akademik & Tim Pengembang

- **Nama Website:** Camilan Nusantara
- **Tema:** Ritel Camilan & Makanan Ringan Kemasan Berkualitas
- **Kelompok:** Kelompok 6
- **Kelas / Semester:** TI B – Semester Gasal Tahun Akademik 2026/2027
- **Mata Kuliah:** Pemrograman Web (WebPRO)
- **Dosen Pengampu:** Abdi Pandu Kusuma, S.Kom, M.T.
- **Institusi:** Universitas Islam Balitar (Unisba Blitar), Jawa Timur

### Pembagian Tugas Anggota

| No. | Nama Mahasiswa | NIM | Peran / Bagian Tugas | Halaman Dikelola |
|---|---|---|---|---|
| 1 | Gladis Ayu Diapitaloka | `25104410073` | Halaman Beranda & Profil Bisnis | `index.html` |
| 2 | Aswin Akmal Rizantha | `25104410058` | Katalog Produk, Keranjang, & Multimedia | `produk.html` |
| 3 | Tahta Alfina Pagelaran | `25104410040` | Artikel Bisnis & Edukasi Ritel | `artikel.html` |
| 4 | Fajar Dwi Prayitno | `25104410048` | FAQ, Kebijakan Privasi, & Kritik/Saran | `kontak.html` |
| 5 | Diva Islamy Rizky Akbar | `25104410033` | Profil Kelompok, Biodata, Refleksi, & PDF Laporan | `biodata.html` |

---

## Struktur Folder Proyek

```text
Kelompok 6 _ Tugas 2/
├── index.html                  # Beranda (profil, visi, misi, layanan, gambar srcset)
├── produk.html                 # Katalog produk, keranjang WhatsApp, tabel harga, & media
├── artikel.html                # Artikel edukasi industri ritel makanan ringan
├── kontak.html                 # FAQ akordeon, kebijakan privasi, & form Kritik dan Saran
├── biodata.html                # Profil kelompok, biodata tim, refleksi, & pratinjau PDF
├── css/
│   └── style.css               # Stylesheet utama bertema Vintage Nusantara & responsif
├── js/
│   └── main.js                 # Skrip JavaScript global tunggal (tanpa inline script)
├── upload/
│   ├── music.mp3               # Audio jingle resmi toko ritel
│   └── gambar/
│       ├── basreng.jpg         # Foto produk Basreng Daun Jeruk
│       ├── kripikkaca.jpg      # Foto produk Keripik Kaca Pedas
│       └── makaronipedas.jpg   # Foto produk Makaroni Pedas Gurih
├── laporan/
│   └── Laporan.pdf             # Dokumen laporan akademik proyek
├── Data.md                     # Dokumentasi rincian perubahan, pengujian, & laporan Tugas 2
└── README.md                   # Ringkasan lengkap dan panduan proyek
```

---

## Teknologi & Library yang Digunakan

- **HTML5 Semantic:** Menggunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<time>`, `<dl>`, `<details>`, `<summary>`, `<table>`, dan `<form>`.
- **CSS3 Native (Tanpa Framework):**
  - CSS Variables (`:root`) dengan palet **Vintage Nusantara**: Ivory (`#fdfbf7`), Cream (`#fdf6ee`), Surface (`#fffdf9`), Brown (`#8B4513`), Dark Brown (`#5d2b12`), dan Gold (`#d97706`).
  - Tipografi: **Georgia** untuk heading (`h1`–`h4`) dan **Arial** untuk teks isi, tabel, serta formulir.
  - Tata letak **Flexbox**, *sticky navbar*, pembungkus tabel responsif (`overflow-x: auto`), `aspect-ratio: 9 / 16` pada video, micro-animations CSS ringan, `:focus-visible`, dan dukungan `@media (prefers-reduced-motion: reduce)`.
- **Vanilla JavaScript (`/js/main.js`):** Satu file global yang dimuat menggunakan atribut `defer` di seluruh halaman untuk manipulasi DOM, pencarian real-time, validasi formulir, manajemen keranjang `LocalStorage`, dan integrasi WhatsApp/Formspree.
- **SweetAlert2 v11 (CDN):** Dimuat secara `defer` melalui `https://cdn.jsdelivr.net/npm/sweetalert2@11` untuk toast notifikasi dan modal konfirmasi. Dilengkapi **fallback lokal otomatis** ke toast DOM (`#wadah-toast`) dan `window.confirm()` apabila perangkat sedang offline atau CDN gagal dimuat.

---

## Rincian Halaman Website

1. **`index.html` — Beranda:**
   - Banner foto gerai responsif menggunakan `srcset` dan `sizes`.
   - Narasi Profil Bisnis, Visi dan Misi Perusahaan, Jaminan Mutu & Manajemen Distribusi (metode FIFO), Layanan Belanja Terpadu, Artikel Sorotan inovasi kemasan *zipper lock*, tombol CTA menuju katalog/keranjang, serta `<aside>` alamat gerai (`Jalan Merdeka No. 25, Kota Blitar`) dan nomor WhatsApp resmi `0858-0058-9235`.
2. **`produk.html` — Katalog Produk & Pemesanan WhatsApp:**
   - **Galeri Produk Terpopuler:** 3 kartu produk unggulan menggunakan gambar lokal (`basreng.jpg`, `kripikkaca.jpg`, `makaronipedas.jpg`), deskripsi singkat, pilihan kemasan (`<select>`), dan tombol `+ Tambah ke Pesanan`.
   - **Panel Keranjang & Pemesanan WhatsApp (`<details id="panel-keranjang">`):** Ringkasan badge jumlah item & total di `<summary>`, *empty state*, kontrol jumlah (`-` / `+`), tombol hapus per item, tombol kosongkan keranjang, formulir pengiriman pelanggan, serta panel konfirmasi pascakirim WhatsApp (`#konfirmasi-wa`).
   - **Daftar Harga & Komparasi Kemasan (`<details>`):** Tabel 7 varian produk lengkap dengan kotak pencarian real-time (`#input-cari`) dan pesan kosong (`#pesan-kosong`).
   - **Informasi Produk (`<details>`):** Daftar 6 kategori produk (`<ul>`), alur pemesanan 5 langkah (`<ol>`), dan spesifikasi legalitas P-IRT/Halal (`<dl>`).
   - **Multimedia & Tips:** Video embed YouTube Shorts (`<iframe>`), pemutar `<audio controls>` (`upload/music.mp3`), dan `<aside>` petunjuk penyimpanan.
3. **`artikel.html` — Artikel Edukasi:**
   - Artikel kajian industri ritel makanan ringan kemasan (`<article>`, satu `<h1>` utama judul artikel, enam subbagian `<h2>`, kutipan `<blockquote>`, `<figure>`, `<time>`, dan `<aside>` panduan cermat konsumen).
4. **`kontak.html` — Kontak & Layanan:**
   - 5 FAQ akordeon (`<details>`), Kebijakan Privasi & Perlindungan Data, formulir **Kritik dan Saran** lengkap seluruh tipe input HTML (`text` `name`, `email`, `select` `topik`, `radio` `jenis_pesan`, `textarea` `message`, `checkbox` `konfirmasi`, dan `_subject`), terintegrasi Formspree via `fetch()`, serta `<aside>` kontak resmi (`0858-0058-9235` dan `canusblt@gmail.com`).
5. **`biodata.html` — Biodata Tim & Laporan:**
   - Section khusus **Profil Kelompok** (`#profil-kelompok`) beserta kartu anggota tim, metadata proyek (`<dl>`), tabel biodata lengkap (`<table>`), narasi refleksi pengerjaan (`#refleksi`), dan pratinjau dokumen PDF (`<iframe src="laporan/Laporan.pdf">`).

---

## Katalog Produk Resmi (`KATALOG_PRODUK`)

Seluruh harga eceran pada kartu produk, tabel daftar harga, keranjang belanja, dan pesan WhatsApp bersumber tunggal dari `KATALOG_PRODUK` di `js/main.js`:

| Kode | Nama Varian | Kemasan | Harga Eceran | Harga Grosir (Min. 10) | Masa Simpan |
|---|---|---|---|---|---|
| `CN-BS01` | Basreng Daun Jeruk | Pouch 100g | Rp 8.000 | Rp 6.500 | 6 Bulan |
| `CN-BS02` | Basreng Daun Jeruk | Zipper 250g | Rp 18.000 | Rp 15.000 | 8 Bulan |
| `CN-KK01` | Keripik Kaca Pedas | Pouch 100g | Rp 7.500 | Rp 6.000 | 6 Bulan |
| `CN-KK02` | Keripik Kaca Pedas | Zipper 250g | Rp 16.500 | Rp 13.500 | 8 Bulan |
| `CN-MK01` | Makaroni Pedas Daun Jeruk | Zipper 250g | Rp 14.000 | Rp 11.500 | 9 Bulan |
| `CN-US01` | Usus Crispy Gurih | Pouch 150g | Rp 15.000 | Rp 12.000 | 6 Bulan |
| `CN-SB01` | Kerupuk Seblak Kering | Pouch 120g | Rp 10.000 | Rp 8.500 | 6 Bulan |

---

## Fitur Utama & Alur Kerja

### 1. Keranjang Lokal & Checkout WhatsApp (`0858-0058-9235`)
1. Pelanggan memilih produk dari galeri atau tabel harga pada `produk.html`.
2. Data keranjang disimpan di `LocalStorage` dengan kunci `camilanNusantara_keranjang` dan divalidasi ulang saat dimuat (`muatKeranjang()`) terhadap `KATALOG_PRODUK` (kode valid dan kuantitas integer `1–999`).
3. Pelanggan mengisi nama, nomor telepon/WhatsApp (`9–15` digit angka), alamat pengiriman, dan catatan opsional.
4. Menekan **Pesan via WhatsApp** menyusun teks rincian pesanan, meng-encode dengan `encodeURIComponent()`, lalu membuka `https://wa.me/6285800589235?text=...` di tab baru (`noopener,noreferrer`). Jika popup diblokir browser, tautan manual aman akan ditampilkan.
5. **Pengosongan Keranjang Aman:** Keranjang tidak langsung dihapus saat WhatsApp baru dibuka. Setelah pelanggan kembali ke website (`visibilitychange`) atau lewat panel `#konfirmasi-wa`, muncul konfirmasi *"Apakah pesanan sudah berhasil dikirim melalui WhatsApp?"*. Keranjang & `LocalStorage` hanya dihapus jika pelanggan memilih **Ya, Sudah Terkirim**.

### 2. Formulir Kritik dan Saran (Formspree)
- Mengirim data ke `FORMSPREE_ENDPOINT` (`https://formspree.io/f/mqpqnloy`) di `js/main.js` menggunakan `fetch()` metode `POST` dan `FormData(form)` dengan header `Accept: application/json`.
- Dilengkapi validasi inline, pencegahan *double submit*, tombol loading `.sedang-loading`, pesan `aria-live="polite"`, dan reset form hanya jika server merespons sukses (`response.ok`).

### 3. Ringkasan Fungsi di `js/main.js`
- `siapkanWadahNotifikasi()`, `tampilkanNotifikasi()`, `mintaKonfirmasi()` — Sistem notifikasi & konfirmasi (SweetAlert2 + fallback toast lokal).
- `updateTahun()`, `highlightMenu()`, `aturMenuMobile()`, `aturTombolKeAtas()` — Fitur navigasi dan utilitas UI lintas halaman.
- `formatRupiah()`, `cekFormatTelepon()`, `aturErrorInput()`, `tampilkanStatusForm()` — Helper pemformatan & validasi aksesibel tanpa `innerHTML`.
- `aturValidasiForm()` — Penanganan formulir Kritik dan Saran di `kontak.html`.
- `aturPencarianTabel()` — Pencarian real-time tabel produk di `produk.html`.
- `muatKeranjang()`, `simpanKeranjang()`, `hitungTotalItem()`, `hitungTotalHarga()`, `perbaruiBadgeKeranjang()`, `tambahKeKeranjang()`, `ubahJumlahItem()`, `hapusItemKeranjang()`, `kosongkanKeranjangPenuh()`, `renderKeranjang()`, `buatPesanWhatsApp()`, `buatUrlCheckoutWA()`, `aturPemesananWhatsApp()` — Pengelolaan keranjang & checkout WhatsApp.

---

## Cara Menjalankan Secara Lokal

Karena website ini terdiri dari HTML, CSS, dan JavaScript statis tanpa proses build:

1. **Menggunakan VS Code Live Server (Disarankan):**
   - Buka folder proyek di Visual Studio Code.
   - Klik kanan `index.html` → pilih **Open with Live Server**.
2. **Menggunakan Python HTTP Server:**
   ```bash
   python -m http.server 8000
   ```
   Lalu buka `http://localhost:8000/index.html` di peramban.

*(Disarankan menggunakan server lokal dibanding `file://` agar `<iframe src="laporan/Laporan.pdf">` dan path relatif bekerja seragam di semua browser.)*

---

## Batasan & Catatan Pengumpulan

- **Tanpa Backend Sendiri:** Website berjalan sepenuhnya di sisi klien (*client-side*). Pemesanan diteruskan secara manual oleh pelanggan melalui aplikasi WhatsApp, dan pengiriman Kritik & Saran memanfaatkan Formspree.
- **Catatan Endpoint Formspree:** `js/main.js` mengirim request ke `https://formspree.io/f/mqpqnloy`, sedangkan atribut HTML fallback `action` pada `<form id="form-kontak">` di `kontak.html` masih tercatat `https://formspree.io/f/xeagnzdd` (saat JavaScript aktif, request selalu menggunakan endpoint di `js/main.js`).
- **Dokumen Rincian:** Untuk rincian log perubahan dari Tugas 1 ke Tugas 2 dan matriks pengujian, lihat [Data.md](Data.md).


