# DATA TUGAS 2

## Identitas Project
- **Nama Website:** Camilan Nusantara
- **Tema Website:** Sistem Ritel Camilan & Makanan Ringan Kemasan Berkualitas
- **Kelompok:** Kelompok 6
- **Kelas:** Kelas TI B (Semester Gasal Tahun Akademik 2026/2027)
- **Mata Kuliah:** Pemrograman Web (WebPRO)
- **Dosen Pengampu:** Abdi Pandu Kusuma, S.Kom, M.T.
- **Institusi Kampus:** Program Studi S-1 Teknik Informatika, Fakultas Teknologi Informasi, Universitas Islam Balitar (Unisba Blitar)

### Anggota Pengembang Kelompok 6:
1. **Gladis Ayu Diapitaloka** (NIM: 25104410073) &ndash; Halaman Beranda (`index.html`)
2. **Aswin Akmal Rizantha** (NIM: 25104410058) &ndash; Katalog Produk & Media (`produk.html`)
3. **Tahta Alfina Pagelaran** (NIM: 25104410040) &ndash; Artikel Edukasi Bisnis (`artikel.html`)
4. **Fajar Dwi Prayitno** (NIM: 25104410048) &ndash; Kontak & Layanan Pelanggan (`kontak.html`)
5. **Diva Islamy Rizky Akbar** (NIM: 25104410033) &ndash; Biodata Tim & Laporan (`biodata.html`)

---

## Latar Belakang
Pada pengerjaan Tugas 1, website Camilan Nusantara telah berhasil dibangun dengan struktur HTML semantik dasar serta file CSS sederhana. Namun, tampilan visual pada Tugas 1 masih bersifat statis, navigasi antar halaman belum responsif pada perangkat ponsel, belum terdapat interaktivitas antarmuka, dan belum memiliki logika penanganan aksi pengguna berbasis JavaScript.

Pengembangan dari Tugas 1 menuju Tugas 2 dilakukan untuk memenuhi capaian pembelajaran mata kuliah Pemrograman Web, yaitu meningkatkan kualitas antarmuka (*User Interface*), memberikan pengalaman pengguna (*User Experience*) yang lebih baik melalui desain responsif, serta menambahkan interaktivitas dinamis menggunakan JavaScript murni (Vanilla JS) yang ringkas, mudah dipelajari, dan terpusat dalam satu file script global.

---

## Tujuan Pengembangan
1. Meningkatkan estetika visual website dengan CSS modern murni tanpa ketergantungan pada library pihak ketiga.
2. Memastikan antarmuka website dapat diakses dengan rapi (*responsive*) pada layar Desktop, Tablet, maupun Ponsel Pintar (*Mobile*).
3. Menerapkan Vanilla JavaScript terpusat pada file `/js/main.js` untuk menyediakan fitur-fitur interaktif universal.
4. Menambahkan bagian resmi identitas kelompok pengembang ("Profil Kelompok") untuk melengkapi prasyarat akademik.
5. Menyediakan basis kode yang bersih, terstruktur rapi, berorientasi pemula, serta mudah dipelajari dan dipresentasikan di hadapan dosen pengampu.

---

## Teknologi Yang Digunakan
- **HTML5:** Digunakan untuk menyusun kerangka semantik dokumen (`header`, `nav`, `main`, `section`, `article`, `figure`, `figcaption`, `aside`, `footer`).
- **CSS3:** Digunakan untuk tata letak (*layout* flexbox), pewarnaan seragam, tipografi, efek transisi hover, kartu produk, dan responsivitas media query.
- **JavaScript (Vanilla JS):** Digunakan untuk logika interaktif DOM (*Document Object Model*) seperti manipulasi navigasi mobile, validasi formulir, filter pencarian tabel, keranjang `LocalStorage`, integrasi Formspree, dan checkout WhatsApp.
- **SweetAlert2 (CDN + Fallback Lokal):** Digunakan secara opsional untuk toast notifikasi dan dialog konfirmasi bernuansa Vintage Nusantara, dilengkapi fallback otomatis ke toast DOM lokal & `confirm()` apabila CDN gagal dimuat.

---

## Struktur Folder Project

```text
Kelompok 6 _ Tugas 2/
│
├── index.html                  # Halaman utama profil ritel Camilan Nusantara
├── artikel.html                # Halaman artikel edukasi bisnis makanan ringan
├── biodata.html                # Halaman profil kelompok, biodata anggota, & laporan
├── kontak.html                 # Halaman FAQ, kebijakan privasi, & form kontak
├── produk.html                 # Halaman katalog produk, media video/audio, & tabel
│
├── css/
│   └── style.css               # File stylesheet CSS utama seragam
│
├── js/
│   └── main.js                 # File script JavaScript global terpusat
│
├── upload/
│   ├── music.mp3               # File audio jingle ritel toko
│   └── gambar/                 # Folder aset gambar produk lokal
│       ├── basreng.jpg         # Foto produk Basreng Daun Jeruk
│       ├── kripikkaca.jpg      # Foto produk Keripik Kaca Pedas
│       └── makaronipedas.jpg   # Foto produk Makaroni Pedas Gurih
│
├── laporan/
│   └── Laporan.pdf             # Berkas PDF laporan resmi proyek
│
└── Data.md                     # Berkas dokumentasi data dan laporan akademik Tugas 2
```

---

## Daftar Halaman

| Halaman | Judul & Topik | Fungsi Utama |
|---|---|---|
| `index.html` | Beranda - Camilan Nusantara | Menampilkan profil bisnis ritel makanan ringan, visi & misi perusahaan, jaminan mutu pergudangan FIFO, layanan toko, dan artikel sorotan inovasi kemasan. |
| `produk.html` | Katalog Produk - Camilan Nusantara | Menampilkan galeri kartu produk dengan foto lokal (`basreng.jpg`, `kripikkaca.jpg`, `makaronipedas.jpg`), panel keranjang & checkout WhatsApp yang dapat dibuka-tutup, tabel daftar harga 7 varian dengan pencarian instan, informasi produk dalam akordeon ringkas, serta media video & audio. |
| `artikel.html` | Artikel Edukasi - Camilan Nusantara | Menyajikan kajian edukatif mendalam mengenai dinamika industri ritel makanan ringan, tren konsumen, sertifikasi higienitas pangan, dan tips belanja cermat bagi masyarakat. |
| `kontak.html` | Kontak & Layanan - Camilan Nusantara | Menyediakan pusat bantuan tanya jawab (FAQ) model akordeon, kebijakan privasi konsumen, formulir **Kritik dan Saran** terintegrasi **Formspree** (`https://formspree.io/f/xeagnzdd`) menuju `canusblt@gmail.com`, dan informasi kontak resmi gerai. |
| `biodata.html` | Biodata Tim & Laporan - Kelompok 6 | Menampilkan section khusus Profil Kelompok 6 lengkap dengan nama anggota, NIM, dosen pengampu, tabel distribusi tugas, narasi refleksi pengerjaan (>300 kata), serta pratinjau dokumen laporan melalui iframe. |

---

## Perubahan Yang Dilakukan

### Perubahan HTML
1. **Penyeragaman Komponen Header dan Footer:** Seluruh halaman kini menggunakan struktur `<header>` dan `<footer>` yang konsisten.
2. **Navigasi Responsif & Aksesibilitas:** Menambahkan tombol menu hamburger `<button id="tombol-menu">` dengan `aria-expanded="false"` dan `aria-controls="daftar-menu"`, serta daftar tautan `<ul id="daftar-menu">`.
3. **Penambahan Section "Profil Kelompok":** Menambahkan section `#profil-kelompok` pada `biodata.html` yang memuat nama kelompok, daftar anggota, NIM, kelas, mata kuliah, dan dosen pengampu.
4. **Katalog Produk dengan Foto Lokal & Progressive Disclosure:** Menggunakan gambar produk lokal (`upload/gambar/basreng.jpg`, `upload/gambar/kripikkaca.jpg`, `upload/gambar/makaronipedas.jpg`) pada galeri utama `produk.html`, serta merapikan tabel daftar harga 7 varian dan informasi kategori/alur/mutu ke dalam elemen `<details>` agar halaman ringkas dan mudah dipindai.
5. **Section Keranjang & Pemesanan WhatsApp (`#keranjang-pesanan`):** Menambahkan panel `<details id="panel-keranjang">` yang menampilkan ringkasan badge (`#badge-keranjang`) dan total (`#ringkasan-total-header`), *empty state* (`#keranjang-kosong`), daftar item (`#wadah-keranjang`), tombol kosongkan keranjang (`#btn-kosongkan`), formulir pengiriman (`#form-checkout-wa`), serta panel konfirmasi pascakirim (`#konfirmasi-wa`).
6. **Formulir Kritik & Saran Terintegrasi Formspree (`kontak.html`):** Mengubah formulir menjadi **Kritik dan Saran** yang tetap memenuhi kelengkapan ragam input Tugas 1 (`text` `name`, `email`, `select` `topik`, `radio` `jenis_pesan`, `textarea` `message`, `checkbox` `konfirmasi`, serta `_subject`) menuju endpoint `https://formspree.io/f/xeagnzdd` dengan atribut `aria-live="polite"`.
7. **Perbaikan Hierarki Heading & Sinkronisasi Narasi:** Merapikan heading kartu produk di `produk.html` menjadi `<h3>`, memastikan `artikel.html` hanya memiliki satu `<h1>` utama (menggunakan `<p class="judul-situs">` untuk branding atas), serta menyelaraskan narasi pemesanan & refleksi di `index.html`, `produk.html`, `kontak.html`, dan `biodata.html`.
8. **Pembersihan, Pencarian Aksesibel & Keamanan Link:** Menambahkan `<label>` dan `aria-label` pada `#input-cari`, menghapus seluruh *inline style*, menyelaraskan nomor WhatsApp resmi (`0858-0058-9235`) dan email resmi (`canusblt@gmail.com`), menambahkan `rel="noopener noreferrer"` pada link `target="_blank"`, serta menambahkan `loading="lazy"` pada gambar di bawah lipatan layar.

### Perubahan CSS
1. **CSS Variables (`:root`) & Tema Vintage Nusantara:** Memusatkan palet warna tema (`--ivory: #fdfbf7`, `--cream: #fdf6ee`, `--brown: #8B4513`, `--dark-brown: #5d2b12`, `--gold: #d97706`) dengan tipografi *Georgia* pada heading dan *Arial* pada teks/tabel/form.
2. **Layout & Navbar Sticky:** Menggunakan Flexbox pada navbar, kartu produk, kartu tim, dan item keranjang, serta `body > header` agar tidak bentrok dengan `.header-artikel`.
3. **Styling Keranjang, Panel Ringkas & Validasi Inline:** Menambahkan kelas `.panel-ringkas`, `.summary-keranjang`, `.badge-keranjang`, `.daftar-keranjang`, `.item-keranjang`, `.kontrol-jumlah`, `.btn-qty`, `.btn-hapus`, `.kotak-total`, `.konfirmasi-wa`, `.btn-wa`, `.error-inline`, dan `.status-form`.
4. **Media, Micro-Animations & Back to Top:** Menggunakan `aspect-ratio: 9 / 16` pada `.video-box iframe`, kelas `.tombol-ke-atas.tampil`, animasi ringan (`munculHalus`, `bukaDetails`, `denyutBadge`, `putarSpinner`), toast fallback lokal (`.toast-nusantara`), serta `@media (prefers-reduced-motion: reduce)` untuk aksesibilitas.
5. **Aksesibilitas & Responsivitas:** Menambahkan `:focus-visible` (`outline: 3px solid var(--gold)`) serta `@media (max-width: 768px)` agar kartu, item keranjang, tombol aksi, dan teks tetap nyaman di layar smartphone hingga `320px`.

### Perubahan JavaScript
1. **`KATALOG_PRODUK` (Single Source of Truth):** Mendefinisikan 7 varian produk resmi (`CN-BS01`, `CN-BS02`, `CN-KK01`, `CN-KK02`, `CN-MK01`, `CN-US01`, `CN-SB01`) sebagai sumber harga tunggal antara katalog, keranjang, dan total pesanan.
2. **`updateTahun()` & `highlightMenu()`:** Memperbarui tahun copyright footer otomatis dan menandai link halaman aktif (`aria-current="page"`).
3. **`aturMenuMobile()`:** Membuka-tutup menu mobile dengan `aria-expanded`, serta menutup menu otomatis saat pengguna memilih link, menekan `Escape`, atau mengklik di luar `<nav>`.
4. **`aturTombolKeAtas()`:** Menggunakan `{ passive: true }` pada event `scroll` dan toggle class `.tampil` untuk tombol kembali ke atas.
5. **`aturValidasiForm()` (Integrasi Formspree via `fetch()`):** Memvalidasi formulir **Kritik dan Saran** di `kontak.html` secara lokal, mencegah *double submit* dengan menonaktifkan tombol & menampilkan status loading (`Mengirim...`), mengirim `FormData` ke `https://formspree.io/f/xeagnzdd` dengan header `Accept: application/json`, mereset formulir hanya saat server mengonfirmasi berhasil, serta menampilkan pesan error informatif saat server gagal atau terjadi gangguan jaringan.
6. **`aturPencarianTabel()`:** Menyaring baris `#tabel-produk` secara langsung dan menampilkan `#pesan-kosong` bila hasil `0`.
7. **Sistem Keranjang & LocalStorage (`muatKeranjang()`, `simpanKeranjang()`, `tambahKeKeranjang()`, `ubahJumlahItem()`, `hapusItemKeranjang()`, `kosongkanKeranjangPenuh()`, `renderKeranjang()`):**
   - Menambah produk (menggabungkan kuantitas jika kode sudah ada, tidak membuat duplikat).
   - Memvalidasi ketat data `localStorage` (`camilanNusantara_keranjang`) terhadap `KATALOG_PRODUK` dan rentang kuantitas `1–999`, serta menghapus key saat keranjang kosong.
   - Merender DOM item keranjang sepenuhnya memakai `document.createElement()` dan `textContent` (bebas XSS / tanpa `innerHTML`).
9. **Sistem Notifikasi, Micro-Interactions & Error Handling (`tampilkanNotifikasi()`, `mintaKonfirmasi()`, `buatUrlCheckoutWA()`):**
   - Menggunakan SweetAlert2 CDN (`defer`) dengan fallback otomatis ke wadah toast `#wadah-toast` (`aria-live="polite"`) dan `window.confirm()` bila offline.
   - Menangani `LocalStorage` rusak/tidak tersedia tanpa menghapus data valid secara diam-diam, produk tidak ditemukan, batas kuantitas `1–999`, serta fallback tautan manual apabila popup WhatsApp diblokir browser.

---

## Fitur Website

1. **Navigasi Seragam & Menu Aktif Dinamis** dengan penutupan otomatis di mobile (klik link, klik luar menu, atau `Escape`).
2. **Katalog Produk Ringkas dengan Gambar Lokal & Pencarian Instan** dengan pesan umpan balik bila varian tidak ditemukan.
3. **Keranjang Belanja Lokal (`LocalStorage`)** lengkap dengan panel buka-tutup, badge jumlah pesanan lintas halaman, *quantity selector* (`-` / `+`), hapus item, kosongkan keranjang, subtotal per item, total keseluruhan, dan *empty cart state*.
4. **Checkout Terintegrasi WhatsApp Resmi (`0858-0058-9235`) dengan Konfirmasi Aman Pascakirim** yang hanya mengosongkan keranjang setelah pelanggan mengonfirmasi pesan terkirim.
5. **Formulir Kritik dan Saran Terintegrasi Formspree (`https://formspree.io/f/xeagnzdd`):** Pada `kontak.html` dengan validasi inline, status loading tombol, pencegahan *double submit*, dan `aria-live="polite"`.
6. **Penyematan Multimedia (YouTube Shorts & Audio Jingle)**, **Akordeon FAQ**, **Tombol Back-to-Top**, **Pratinjau Laporan PDF**, dan **Profil Kelompok 6**.

---

## Hasil Pengujian

> **Catatan Metodologi Pengujian:** Pengujian logika JavaScript, formulir kritik & saran, serta simulasi alur keranjang/WhatsApp dijalankan melalui *automated test runner* Node.js (`vm` sandbox + mock DOM/LocalStorage), sedangkan verifikasi HTML, link, dan keberadaan 3 gambar lokal dijalankan dengan skrip Python. Pengujian *live rendering* di browser Google Chrome tidak dapat dijalankan karena layanan Chrome DevTools belum aktif (`DevToolsActivePort` tidak tersedia), sehingga aspek visual browser dicatat secara jujur sebagai **NOT TESTED**.

| No. | Skenario Pengujian | Metode Pengujian | Hasil | Status |
|---|---|---|---|---|
| 1 | Pemeriksaan sintaksis JavaScript (`node -c js/main.js`) | CLI Node.js | Tidak ditemukan error sintaksis | **PASS** |
| 2 | Verifikasi 3 path gambar lokal (`basreng.jpg`, `kripikkaca.jpg`, `makaronipedas.jpg`), bebas *inline style*, bebas nomor WA dummy, dan keamanan `target="_blank"` | Skrip Python pada 5 file HTML | Seluruh gambar & aset lokal ditemukan, 0 inline style, 0 nomor dummy, semua `_blank` memiliki `noopener noreferrer` | **PASS** |
| 3 | Konsistensi kode & harga antara `produk.html` dan `KATALOG_PRODUK` di `js/main.js` | Skrip uji otomatis Node.js | Seluruh 7 kode produk & harga eceran identik | **PASS** |
| 4 | Tambah 1 produk, tambah produk sama (kuantitas naik), tambah produk berbeda, ubah jumlah (`+`/`-`), hapus item, dan kosongkan keranjang | Simulasi DOM & LocalStorage di Node.js | Subtotal, total harga, badge, dan empty state berubah akurat | **PASS** |
| 5 | Validasi keamanan `LocalStorage` terhadap JSON korup & manipulasi harga palsu | Simulasi DOM & LocalStorage di Node.js | Harga palsu diabaikan (diambil dari `KATALOG_PRODUK`), JSON rusak mengembalikan array kosong | **PASS** |
| 6 | Checkout valid ke URL WhatsApp + konfirmasi pascakirim ("Ya, Sudah Terkirim" vs "Belum / Batal") | Simulasi DOM & `window.open` di Node.js | Saat WA dibuka keranjang tetap tersimpan; jika klik Batal tetap terjaga; jika klik Ya keranjang & LocalStorage dikosongkan | **PASS** |
| 7 | Formulir Kritik dan Saran (`fetch()` ke Formspree) | Simulasi DOM & mock `fetch()` di Node.js | Validasi lokal bekerja, loading tombol aktif & double submit dicegah, respons sukses mereset form, respons gagal/jaringan menjaga isi form | **PASS** |
| 8 | Pengiriman email langsung ke server Formspree (`https://formspree.io/f/xeagnzdd`) | Request HTTP live ke Formspree | Belum dikirim ke endpoint produksi agar tidak mengotori inbox `canusblt@gmail.com` | **NOT TESTED** |
| 9 | Tahun copyright otomatis (`updateTahun()`) | Simulasi DOM di Node.js | Mengisi tahun berjalan dengan benar | **PASS** |
| 10 | Pengujian visual langsung di browser (1440px, 1366px, 768px, 375px, 320px), *live rendering* 3 gambar lokal, *horizontal overflow*, dan playback audio/video | Browser Chrome DevTools | Koneksi Chrome DevTools gagal (`DevToolsActivePort` tidak ditemukan) | **NOT TESTED** |

---

## Batasan Sistem & Catatan

1. **Tanpa Backend Sendiri:** Website tetap statis tanpa database/backend sendiri. Keranjang disimpan di `LocalStorage`, pesanan dikirim manual via WhatsApp (`https://wa.me/6285800589235`), dan formulir kritik & saran memanfaatkan layanan pihak ketiga **Formspree** (`https://formspree.io/f/xeagnzdd`) menuju `canusblt@gmail.com`.
2. **Ketergantungan Koneksi Internet Formspree:** Pengiriman formulir Kritik dan Saran memerlukan koneksi internet agar `fetch()` ke `https://formspree.io/f/mqpqnloy` dapat diproses.

---

## Kendala dan Solusi

1. **Kendala:** Navigasi pada Tugas 1 tidak responsif di layar ponsel kecil dan sebelumnya belum menutup otomatis saat mengklik area di luar menu.
   - **Solusi:** Menambahkan navigasi mobile berbasis Flexbox dengan tombol hamburger, `aria-expanded`, penutupan via `Escape`, serta klik di luar `<nav>`.

2. **Kendala:** Potensi perbedaan harga antara tampilan katalog, keranjang, dan total pesanan apabila harga ditulis terpisah-pisah.
   - **Solusi:** Memusatkan daftar 7 varian produk pada satu konstanta `KATALOG_PRODUK` di `js/main.js` dan memvalidasi data `LocalStorage` terhadap konstanta tersebut.

3. **Kendala:** Pengiriman pesan WhatsApp berpotensi rusak jika terdapat karakter spasi, baris baru, atau simbol `&` pada catatan pelanggan.
   - **Solusi:** Menyusun teks terstruktur lalu meng-encode seluruh pesan memakai `encodeURIComponent(pesan)`.

4. **Kendala:** Pengujian rendering visual langsung melalui Chrome DevTools tidak dapat terhubung di lingkungan eksekusi saat ini.
   - **Solusi:** Menjalankan verifikasi statis Python & unit/integration test simulasi DOM di Node.js untuk seluruh logika fungsional, serta mencatat pengujian visual browser secara transparan sebagai **NOT TESTED** agar pengguna dapat mengujinya langsung saat membuka `index.html` / `produk.html` di peramban.

---

## Kesimpulan

Pengembangan website **Camilan Nusantara** untuk **Tugas 2** telah diselesaikan dengan mengintegrasikan:
1. **HTML5 Semantik** yang bersih, terstruktur, bebas *inline style*, dan aman pada tautan eksternal.
2. **CSS3 Murni** dengan identitas **Vintage Nusantara** (`#fdfbf7`, `#fdf6ee`, `#8B4513`, `#5d2b12`, `#d97706`) yang responsif dan konsisten lintas halaman.
3. **Vanilla JavaScript Terpusat (`/js/main.js`)** yang mencakup navigasi mobile, pencarian produk, validasi inline formulir, keranjang belanja berbasis `LocalStorage`, dan checkout terintegrasi WhatsApp resmi (`0858-0058-9235`).
4. **Dokumentasi Akademik (`Data.md`)** yang akurat sesuai implementasi dan hasil pengujian aktual.

