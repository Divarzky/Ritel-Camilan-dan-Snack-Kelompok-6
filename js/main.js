/**
 * ==============================================================================
 * JAVASCRIPT UTAMA (TUGAS 2 - UI POLISH & ERROR HANDLING) - KELOMPOK 6
 * Website: Camilan Nusantara
 * Fitur: Notifikasi (SweetAlert2 + fallback lokal), navigasi responsif,
 *        Formspree, pencarian produk, keranjang LocalStorage, & checkout WhatsApp.
 * ==============================================================================
 */

// Kontak & endpoint layanan resmi Camilan Nusantara
const NOMOR_WA_RESMI = "6285800589235";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqpqnloy"; // jgn diubah!

// Kunci penyimpanan keranjang pada LocalStorage browser
const KUNCI_KERANJANG = "camilanNusantara_keranjang";

// Satu sumber data katalog produk agar harga konsisten di seluruh website
const KATALOG_PRODUK = {
  "CN-BS01": { kode: "CN-BS01", nama: "Basreng Daun Jeruk (Pouch 100g)", harga: 8000 },
  "CN-BS02": { kode: "CN-BS02", nama: "Basreng Daun Jeruk (Zipper 250g)", harga: 18000 },
  "CN-KK01": { kode: "CN-KK01", nama: "Keripik Kaca Pedas (Pouch 100g)", harga: 7500 },
  "CN-KK02": { kode: "CN-KK02", nama: "Keripik Kaca Pedas (Zipper 250g)", harga: 16500 },
  "CN-MK01": { kode: "CN-MK01", nama: "Makaroni Pedas Daun Jeruk (Zipper 250g)", harga: 14000 },
  "CN-US01": { kode: "CN-US01", nama: "Usus Crispy Gurih (Pouch 150g)", harga: 15000 },
  "CN-SB01": { kode: "CN-SB01", nama: "Kerupuk Seblak Kering (Pouch 120g)", harga: 10000 }
};

// State keranjang belanja dan status konfirmasi pascakirim WhatsApp
let keranjangBelanja = [];
let menungguKonfirmasiWA = false;
let pernahTinggalkanTab = false;
let sudahPeringatkanStorage = false;

/**
 * Menginisialisasi seluruh fitur website setelah struktur DOM siap.
 * Memastikan tidak ada duplikasi inisialisasi saat halaman dimuat.
 */
document.addEventListener("DOMContentLoaded", function () {
  siapkanWadahNotifikasi();
  updateTahun();
  highlightMenu();
  aturMenuMobile();
  aturTombolKeAtas();
  aturValidasiForm();
  aturPencarianTabel();
  aturPemesananWhatsApp();
});

/**
 * Membuat elemen live region dan wadah toast lokal sebagai fallback
 * apabila CDN SweetAlert2 gagal dimuat atau untuk aksesibilitas screen reader.
 */
function siapkanWadahNotifikasi() {
  if (!document.body || typeof document.body.appendChild !== "function") return;

  if (!document.getElementById("wadah-toast")) {
    const wadah = document.createElement("div");
    wadah.id = "wadah-toast";
    wadah.className = "wadah-toast";
    wadah.setAttribute("aria-live", "polite");
    wadah.setAttribute("aria-atomic", "true");
    document.body.appendChild(wadah);
  }
}

/**
 * Menampilkan notifikasi toast kepada pengguna berdasarkan status proses.
 * Menggunakan SweetAlert2 bila tersedia, dengan fallback toast lokal Vintage Nusantara.
 * @param {string} type - Jenis notifikasi: "success", "error", "warning", atau "info".
 * @param {string} message - Pesan singkat dan manusiawi untuk pengguna.
 */
function tampilkanNotifikasi(type, message) {
  if (!message) return;

  const tipeValid = ["success", "error", "warning", "info"].includes(type) ? type : "info";
  const ikonTeks = {
    success: "[✓]",
    error: "[✕]",
    warning: "[!]",
    info: "[i]"
  }[tipeValid];

  // Gunakan SweetAlert2 Toast jika CDN berhasil dimuat
  if (typeof window.Swal !== "undefined" && typeof window.Swal.fire === "function") {
    window.Swal.fire({
      toast: true,
      position: "bottom",
      icon: tipeValid,
      title: message,
      showConfirmButton: false,
      timer: 3200,
      timerProgressBar: true,
      background: "#fffdf9",
      color: "#2d241e",
      didOpen: function (toastEl) {
        toastEl.addEventListener("mouseenter", window.Swal.stopTimer);
        toastEl.addEventListener("mouseleave", window.Swal.resumeTimer);
      }
    });
  } else {
    // Fallback ke toast lokal apabila CDN offline/gagal dimuat
    const wadah = document.getElementById("wadah-toast");
    if (wadah) {
      const itemToast = document.createElement("div");
      itemToast.className = "toast-nusantara " + tipeValid;
      itemToast.setAttribute("role", tipeValid === "error" ? "alert" : "status");
      itemToast.textContent = ikonTeks + " " + message;
      wadah.appendChild(itemToast);

      setTimeout(function () {
        if (itemToast.parentNode) {
          itemToast.parentNode.removeChild(itemToast);
        }
      }, 3400);
    }
  }
}

/**
 * Menampilkan dialog konfirmasi sebelum aksi penting seperti mengosongkan keranjang.
 * Menggunakan SweetAlert2 jika tersedia, atau fallback ke window.confirm().
 * @param {string} judul - Judul singkat pertanyaan konfirmasi.
 * @param {string} teks - Penjelasan dampak tindakan kepada pengguna.
 * @param {string} teksSetuju - Label tombol konfirmasi positif.
 * @returns {Promise<boolean>} Bernilai true jika pengguna menyetujui tindakan.
 */
function mintaKonfirmasi(judul, teks, teksSetuju) {
  if (typeof window.Swal !== "undefined" && typeof window.Swal.fire === "function") {
    return window.Swal.fire({
      title: judul,
      text: teks,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: teksSetuju || "Ya, Lanjutkan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#8B4513",
      cancelButtonColor: "#6b635b",
      background: "#fffdf9",
      color: "#2d241e"
    }).then(function (result) {
      return Boolean(result && result.isConfirmed);
    });
  }

  // Fallback dialog browser standar jika SweetAlert2 tidak tersedia
  return Promise.resolve(window.confirm(judul + "\n" + teks));
}

/**
 * Memperbarui angka tahun hak cipta pada footer secara otomatis.
 */
function updateTahun() {
  const elTahun = document.getElementById("tahun");
  if (elTahun) {
    elTahun.textContent = new Date().getFullYear();
  }
}

/**
 * Menandai menu navigasi yang sedang aktif berdasarkan halaman yang dibuka.
 */
function highlightMenu() {
  const menuLinks = document.querySelectorAll("nav .nav-links a");
  if (!menuLinks.length) return;

  let halamanSaatIni = window.location.pathname.split("/").pop();
  if (halamanSaatIni === "" || halamanSaatIni === "/") {
    halamanSaatIni = "index.html";
  }

  menuLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === halamanSaatIni) {
      link.classList.add("aktif");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("aktif");
      link.removeAttribute("aria-current");
    }
  });
}

/**
 * Mengatur menu navigasi mobile agar dapat dibuka-tutup melalui tombol hamburger,
 * tautan menu, klik di luar area navigasi, serta tombol Escape untuk aksesibilitas.
 */
function aturMenuMobile() {
  const nav = document.querySelector("nav");
  const tombolMenu = document.getElementById("tombol-menu");
  const daftarMenu = document.getElementById("daftar-menu");
  if (!nav || !tombolMenu || !daftarMenu) return;

  function tutupMenu() {
    daftarMenu.classList.remove("tampil");
    tombolMenu.setAttribute("aria-expanded", "false");
  }

  tombolMenu.addEventListener("click", function () {
    const terbuka = daftarMenu.classList.toggle("tampil");
    tombolMenu.setAttribute("aria-expanded", terbuka ? "true" : "false");
  });

  daftarMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", tutupMenu);
  });

  document.addEventListener("click", function (event) {
    if (daftarMenu.classList.contains("tampil") && !nav.contains(event.target)) {
      tutupMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && daftarMenu.classList.contains("tampil")) {
      tutupMenu();
      tombolMenu.focus();
    }
  });
}

/**
 * Menampilkan tombol kembali ke atas saat halaman digulir melewati batas tertentu
 * dan menggulirkan halaman kembali ke atas secara halus saat diklik.
 */
function aturTombolKeAtas() {
  const tombolKeAtas = document.getElementById("tombol-ke-atas");
  if (!tombolKeAtas) return;

  window.addEventListener("scroll", function () {
    tombolKeAtas.classList.toggle("tampil", window.scrollY > 250);
  }, { passive: true });

  tombolKeAtas.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * Memformat nilai angka menjadi string mata uang Rupiah Indonesia.
 * @param {number} angka - Nilai nominal harga yang akan diformat.
 * @returns {string} String berformat Rupiah, misalnya "Rp18.000".
 */
function formatRupiah(angka) {
  const nilai = Number(angka);
  if (Number.isNaN(nilai)) return "Rp0";
  return "Rp" + nilai.toLocaleString("id-ID");
}

/**
 * Memeriksa apakah format nomor telepon masuk akal setelah membersihkan spasi dan tanda hubung.
 * @param {string} teks - Nomor telepon yang diinput pengguna.
 * @returns {boolean} True jika terdiri dari 9 hingga 15 digit angka yang valid.
 */
function cekFormatTelepon(teks) {
  const bersih = String(teks || "").replace(/[\s-]/g, "");
  return /^\+?\d{9,15}$/.test(bersih);
}

/**
 * Menampilkan atau menghapus pesan error inline pada elemen input tertentu.
 * Memanfaatkan textContent agar aman dari injeksi HTML.
 * @param {HTMLElement|null} inputEl - Elemen input yang divalidasi.
 * @param {string} pesan - Pesan error yang ditampilkan, atau string kosong untuk menghapus.
 */
function aturErrorInput(inputEl, pesan) {
  if (!inputEl) return;

  let elError = document.getElementById("err-" + inputEl.id);
  if (!elError && typeof inputEl.insertAdjacentElement === "function") {
    elError = document.createElement("span");
    elError.id = "err-" + inputEl.id;
    elError.className = "error-inline";
    inputEl.insertAdjacentElement("afterend", elError);
  }

  if (pesan) {
    inputEl.classList.add("input-error");
    inputEl.setAttribute("aria-invalid", "true");
    if (elError) elError.textContent = "! " + pesan;
  } else {
    inputEl.classList.remove("input-error");
    inputEl.removeAttribute("aria-invalid");
    if (elError) elError.textContent = "";
  }
}

/**
 * Menampilkan status proses pada panel formulir beserta simbol aksesibel non-warna.
 * @param {HTMLElement|null} elStatus - Elemen penampung status.
 * @param {string} pesan - Isi pesan status, atau string kosong untuk menyembunyikan.
 * @param {string} tipe - Kategori status: "error", "warning", "info", atau "success".
 */
function tampilkanStatusForm(elStatus, pesan, tipe) {
  if (!elStatus) return;

  if (!pesan) {
    elStatus.hidden = true;
    elStatus.textContent = "";
    elStatus.className = "status-form";
    return;
  }

  const tipeValid = ["error", "warning", "info", "success"].includes(tipe) ? tipe : "info";
  const awalan = {
    error: "✕ ",
    warning: "! ",
    info: "✓ ",
    success: "✓ "
  }[tipeValid];

  elStatus.textContent = awalan + pesan;
  elStatus.className = "status-form " + tipeValid;
  elStatus.hidden = false;
}

/**
 * Mengatur validasi inline dan pengiriman formulir Kritik & Saran ke Formspree
 * menggunakan fetch(), dilengkapi state loading, pencegahan double submit,
 * serta penanganan error jaringan dan server tanpa menghapus ketikan pengguna saat gagal.
 */
function aturValidasiForm() {
  const form = document.getElementById("form-kontak");
  if (!form) return;

  const statusKontak = document.getElementById("status-kontak");
  const btnSubmit = document.getElementById("btn-kirim-kontak") || form.querySelector('button[type="submit"]');
  const elNama = document.getElementById("nama");
  const elEmail = document.getElementById("email");
  const elTopik = document.getElementById("topik-pesan");
  const elPesan = document.getElementById("pesan");
  const elSetuju = document.getElementById("persetujuan-kontak");
  let sedangMengirim = false;

  [elNama, elEmail, elTopik, elPesan].forEach(function (el) {
    if (el) {
      const tipeEvent = el.tagName === "SELECT" ? "change" : "input";
      el.addEventListener(tipeEvent, function () {
        aturErrorInput(el, "");
        tampilkanStatusForm(statusKontak, "", "");
      });
    }
  });

  if (elSetuju) {
    elSetuju.addEventListener("change", function () {
      tampilkanStatusForm(statusKontak, "", "");
    });
  }

  form.addEventListener("reset", function () {
    [elNama, elEmail, elTopik, elPesan].forEach(function (el) {
      aturErrorInput(el, "");
    });
    tampilkanStatusForm(statusKontak, "", "");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (sedangMengirim) return;

    tampilkanStatusForm(statusKontak, "", "");
    aturErrorInput(elEmail, "");
    aturErrorInput(elTopik, "");
    aturErrorInput(elPesan, "");

    const email = elEmail ? elEmail.value.trim() : "";
    const topik = elTopik ? elTopik.value : "";
    const pesan = elPesan ? elPesan.value.trim() : "";

    let fokusPertama = null;

    if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      aturErrorInput(elEmail, "Format email tidak valid (kosongkan jika tidak ingin mengisi).");
      fokusPertama = elEmail;
    }

    if (elTopik && topik === "") {
      aturErrorInput(elTopik, "Pilih topik kritik atau saran.");
      if (!fokusPertama) fokusPertama = elTopik;
    }

    if (pesan === "") {
      aturErrorInput(elPesan, "Isi kritik atau saran wajib diisi.");
      if (!fokusPertama) fokusPertama = elPesan;
    }

    if (fokusPertama) {
      tampilkanStatusForm(statusKontak, "Mohon lengkapi atau perbaiki isian yang ditandai merah.", "error");
      tampilkanNotifikasi("warning", "Periksa kembali isian formulir Anda.");
      fokusPertama.focus();
      return;
    }

    if (elSetuju && !elSetuju.checked) {
      tampilkanStatusForm(statusKontak, "Harap centang kotak persetujuan evaluasi layanan sebelum mengirim.", "warning");
      tampilkanNotifikasi("warning", "Centang persetujuan evaluasi layanan terlebih dahulu.");
      elSetuju.focus();
      return;
    }

    if (typeof fetch !== "function") {
      tampilkanStatusForm(statusKontak, "Peramban Anda tidak mendukung pengiriman otomatis. Silakan hubungi canusblt@gmail.com.", "error");
      return;
    }

    // Masuk ke Loading State & cegah pengiriman ganda
    sedangMengirim = true;
    const teksTombolAsli = btnSubmit ? btnSubmit.textContent : "Kirim";
    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.classList.add("sedang-loading");
      btnSubmit.textContent = "Mengirim...";
    }

    const dataForm = new FormData(form);

    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: dataForm,
      headers: {
        "Accept": "application/json"
      }
    })
      .then(function (response) {
        return response
          .json()
          .catch(function () { return {}; })
          .then(function (hasil) {
            if (response.ok) {
              // Success State: reset hanya setelah server mengonfirmasi berhasil
              form.reset();
              tampilkanStatusForm(statusKontak, "Terima kasih! Kritik dan saran Anda berhasil dikirim.", "success");
              tampilkanNotifikasi("success", "Kritik dan saran berhasil dikirim.");
            } else {
              // Failed State: pertahankan isian agar pengguna dapat mencoba lagi
              let pesanError = "Pengiriman gagal diproses oleh server. Silakan periksa isian Anda dan coba lagi.";
              if (hasil && Array.isArray(hasil.errors) && hasil.errors.length > 0 && hasil.errors[0].message) {
                pesanError = "Gagal mengirim: " + hasil.errors[0].message + ". Silakan coba lagi.";
              }
              tampilkanStatusForm(statusKontak, pesanError, "error");
              tampilkanNotifikasi("error", "Gagal mengirim formulir. Silakan coba lagi.");
            }
          });
      })
      .catch(function () {
        // Network Error State: jangan menghapus data input dan jangan mengklaim berhasil
        tampilkanStatusForm(
          statusKontak,
          "Terjadi gangguan koneksi jaringan. Kritik dan saran Anda belum terkirim, silakan periksa internet lalu coba lagi.",
          "error"
        );
        tampilkanNotifikasi("error", "Koneksi bermasalah. Pesan belum terkirim.");
      })
      .finally(function () {
        sedangMengirim = false;
        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.classList.remove("sedang-loading");
          btnSubmit.textContent = teksTombolAsli;
        }
      });
  });
}

/**
 * Menyaring baris tabel produk secara langsung berdasarkan kata kunci pencarian
 * dan menampilkan pesan ramah apabila tidak ditemukan varian yang cocok.
 */
function aturPencarianTabel() {
  const inputCari = document.getElementById("input-cari");
  const tabel = document.getElementById("tabel-produk");
  const pesanKosong = document.getElementById("pesan-kosong");

  if (!inputCari || !tabel) return;

  inputCari.addEventListener("input", function () {
    const kataKunci = inputCari.value.trim().toLowerCase();
    const barisTabel = tabel.querySelectorAll("tbody tr");
    let jumlahTampil = 0;

    barisTabel.forEach(function (baris) {
      const teksBaris = baris.textContent.toLowerCase();
      if (teksBaris.includes(kataKunci)) {
        baris.style.display = "";
        jumlahTampil++;
      } else {
        baris.style.display = "none";
      }
    });

    if (pesanKosong) {
      pesanKosong.hidden = jumlahTampil > 0;
      if (jumlahTampil === 0 && kataKunci !== "") {
        pesanKosong.textContent = 'Varian "' + inputCari.value.trim() + '" tidak ditemukan. Coba kata kunci lain.';
      } else {
        pesanKosong.textContent = "Varian camilan tidak ditemukan.";
      }
    }
  });
}

/**
 * Membaca dan memvalidasi data keranjang dari LocalStorage secara aman.
 * Menolak data korup atau kode produk yang tidak terdaftar di KATALOG_PRODUK
 * serta menjaga data yang masih valid agar tidak hilang secara diam-diam.
 * @returns {Array<Object>} Daftar item keranjang yang valid.
 */
function muatKeranjang() {
  try {
    const mentah = localStorage.getItem(KUNCI_KERANJANG);
    if (!mentah) return [];

    const data = JSON.parse(mentah);
    if (!Array.isArray(data)) {
      tampilkanNotifikasi("warning", "Data keranjang tersimpan tidak valid dan perlu dimuat ulang.");
      return [];
    }

    const hasilValid = [];
    let adaDataTidakValid = false;

    data.forEach(function (item) {
      if (
        item &&
        typeof item.kode === "string" &&
        KATALOG_PRODUK[item.kode] &&
        Number.isInteger(item.jumlah) &&
        item.jumlah >= 1 &&
        item.jumlah <= 999
      ) {
        const produk = KATALOG_PRODUK[item.kode];
        hasilValid.push({
          kode: produk.kode,
          nama: produk.nama,
          harga: produk.harga,
          jumlah: item.jumlah
        });
      } else {
        adaDataTidakValid = true;
      }
    });

    if (adaDataTidakValid) {
      tampilkanNotifikasi("warning", "Sebagian item keranjang yang tidak valid tidak dapat dimuat.");
    }

    return hasilValid;
  } catch (err) {
    if (!sudahPeringatkanStorage) {
      sudahPeringatkanStorage = true;
      tampilkanNotifikasi("warning", "Keranjang sebelumnya tidak dapat dibaca. Anda tetap dapat memilih produk baru.");
    }
    return [];
  }
}

/**
 * Menyimpan daftar kode dan jumlah keranjang ke LocalStorage secara aman.
 * @param {Array<Object>} keranjang - Daftar item keranjang saat ini.
 * @returns {boolean} True jika berhasil menyimpan atau menghapus, false jika storage gagal.
 */
function simpanKeranjang(keranjang) {
  try {
    if (keranjang.length === 0) {
      localStorage.removeItem(KUNCI_KERANJANG);
      return true;
    }
    const dataRingkas = keranjang.map(function (item) {
      return { kode: item.kode, jumlah: item.jumlah };
    });
    localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(dataRingkas));
    return true;
  } catch (err) {
    if (!sudahPeringatkanStorage) {
      sudahPeringatkanStorage = true;
      tampilkanNotifikasi("warning", "Penyimpanan lokal peramban tidak aktif; keranjang hanya tersimpan selama halaman terbuka.");
    }
    return false;
  }
}

/**
 * Menghitung total kuantitas seluruh item di dalam keranjang.
 * @param {Array<Object>} keranjang - Daftar item keranjang.
 * @returns {number} Jumlah total pcs pesanan.
 */
function hitungTotalItem(keranjang) {
  let total = 0;
  keranjang.forEach(function (item) {
    total += item.jumlah;
  });
  return total;
}

/**
 * Menghitung total harga keseluruhan pesanan dalam Rupiah.
 * @param {Array<Object>} keranjang - Daftar item keranjang.
 * @returns {number} Nominal total pesanan.
 */
function hitungTotalHarga(keranjang) {
  let total = 0;
  keranjang.forEach(function (item) {
    total += item.harga * item.jumlah;
  });
  return total;
}

/**
 * Memicu animasi denyut singkat pada elemen badge saat jumlah item berubah.
 * @param {HTMLElement|null} el - Elemen badge yang akan dianimasikan.
 */
function animasikanBadge(el) {
  if (!el || !el.classList) return;
  el.classList.remove("berubah");
  // Memaksa reflow agar animasi CSS dapat diputar ulang pada perubahan berikutnya
  void el.offsetWidth;
  el.classList.add("berubah");
}

/**
 * Memperbarui badge jumlah pesanan pada navbar, header panel keranjang, dan total header.
 * @param {Array<Object>} keranjang - Daftar item keranjang.
 * @param {boolean} [pakaiAnimasi=false] - Menandakan apakah badge perlu berdenyut.
 */
function perbaruiBadgeKeranjang(keranjang, pakaiAnimasi) {
  const totalItem = hitungTotalItem(keranjang);
  const totalHarga = formatRupiah(hitungTotalHarga(keranjang));

  const badgePanel = document.getElementById("badge-keranjang");
  if (badgePanel) {
    badgePanel.textContent = totalItem + " item";
    if (pakaiAnimasi) animasikanBadge(badgePanel);
  }

  const totalHeader = document.getElementById("ringkasan-total-header");
  if (totalHeader) {
    totalHeader.textContent = totalHarga;
  }

  const linkProduk = document.querySelector('nav .nav-links a[href="produk.html"]');
  if (!linkProduk) return;

  let badgeNav = linkProduk.querySelector(".badge-keranjang");
  if (totalItem > 0) {
    if (!badgeNav) {
      badgeNav = document.createElement("span");
      badgeNav.className = "badge-keranjang";
      linkProduk.appendChild(badgeNav);
    }
    badgeNav.textContent = totalItem;
    if (pakaiAnimasi) animasikanBadge(badgeNav);
  } else if (badgeNav) {
    badgeNav.remove();
  }
}

/**
 * Menambahkan produk ke keranjang berdasarkan kode produk resmi,
 * atau menambah kuantitas jika produk sudah ada di keranjang.
 * @param {string} kodeProduk - Kode produk dari KATALOG_PRODUK.
 * @returns {boolean} True jika berhasil ditambahkan.
 */
function tambahKeKeranjang(kodeProduk) {
  const produk = KATALOG_PRODUK[kodeProduk];
  if (!produk) {
    tampilkanNotifikasi("error", "Produk tidak ditemukan di katalog. Silakan muat ulang halaman.");
    return false;
  }

  const itemAda = keranjangBelanja.find(function (item) {
    return item.kode === kodeProduk;
  });

  if (itemAda) {
    if (itemAda.jumlah >= 999) {
      tampilkanNotifikasi("warning", "Jumlah maksimal per varian (999 pcs) telah tercapai.");
      return false;
    }
    itemAda.jumlah += 1;
  } else {
    keranjangBelanja.push({
      kode: produk.kode,
      nama: produk.nama,
      harga: produk.harga,
      jumlah: 1
    });
  }

  simpanKeranjang(keranjangBelanja);
  renderKeranjang(true);
  tampilkanNotifikasi("success", produk.nama + " ditambahkan ke keranjang.");
  return true;
}

/**
 * Mengubah jumlah item keranjang (+1 atau -1) dan menghapus item jika kurang dari 1.
 * @param {string} kodeProduk - Kode produk yang diubah jumlahnya.
 * @param {number} selisih - Perubahan jumlah (+1 atau -1).
 */
function ubahJumlahItem(kodeProduk, selisih) {
  const index = keranjangBelanja.findIndex(function (item) {
    return item.kode === kodeProduk;
  });

  if (index === -1 || typeof selisih !== "number" || Number.isNaN(selisih)) {
    tampilkanNotifikasi("error", "Gagal memperbarui jumlah item karena produk tidak ditemukan.");
    return;
  }

  const namaProduk = keranjangBelanja[index].nama;
  const jumlahBaru = keranjangBelanja[index].jumlah + selisih;

  if (jumlahBaru < 1) {
    keranjangBelanja.splice(index, 1);
    simpanKeranjang(keranjangBelanja);
    renderKeranjang(true);
    tampilkanNotifikasi("info", namaProduk + " dihapus dari keranjang.");
    return;
  }

  if (jumlahBaru > 999) {
    tampilkanNotifikasi("warning", "Jumlah maksimal per varian adalah 999 pcs.");
    return;
  }

  keranjangBelanja[index].jumlah = jumlahBaru;
  simpanKeranjang(keranjangBelanja);
  renderKeranjang(true);
  tampilkanNotifikasi("info", "Jumlah " + namaProduk + " diperbarui menjadi " + jumlahBaru + " pcs.");
}

/**
 * Menghapus satu item produk dari keranjang pesanan.
 * @param {string} kodeProduk - Kode produk yang akan dihapus.
 */
function hapusItemKeranjang(kodeProduk) {
  const itemDihapus = keranjangBelanja.find(function (item) {
    return item.kode === kodeProduk;
  });
  if (!itemDihapus) return;

  keranjangBelanja = keranjangBelanja.filter(function (item) {
    return item.kode !== kodeProduk;
  });

  simpanKeranjang(keranjangBelanja);
  renderKeranjang(true);
  tampilkanNotifikasi("info", itemDihapus.nama + " dihapus dari keranjang.");
}

/**
 * Mengosongkan seluruh isi keranjang dan menghapus data dari LocalStorage.
 */
function kosongkanKeranjangPenuh() {
  keranjangBelanja = [];
  simpanKeranjang(keranjangBelanja);
  renderKeranjang(true);
}

/**
 * Merender daftar item keranjang ke DOM secara aman tanpa menggunakan innerHTML.
 * @param {boolean} [pakaiAnimasiBadge=false] - Memicu animasi pada badge jika true.
 */
function renderKeranjang(pakaiAnimasiBadge) {
  perbaruiBadgeKeranjang(keranjangBelanja, pakaiAnimasiBadge);

  const elKosong = document.getElementById("keranjang-kosong");
  const wadah = document.getElementById("wadah-keranjang");
  const kotakTotal = document.getElementById("kotak-total");
  const elTotalItem = document.getElementById("total-item");
  const elTotalHarga = document.getElementById("total-harga");

  if (!elKosong || !wadah || !kotakTotal) return;

  wadah.textContent = "";

  if (keranjangBelanja.length === 0) {
    elKosong.hidden = false;
    wadah.hidden = true;
    kotakTotal.hidden = true;
    return;
  }

  elKosong.hidden = true;
  wadah.hidden = false;
  kotakTotal.hidden = false;

  keranjangBelanja.forEach(function (item) {
    const baris = document.createElement("div");
    baris.className = "item-keranjang";

    const info = document.createElement("div");
    info.className = "info-item";

    const judul = document.createElement("h4");
    judul.textContent = item.nama;

    const detail = document.createElement("p");
    detail.textContent = "Kode: " + item.kode + " | Harga: " + formatRupiah(item.harga);

    info.appendChild(judul);
    info.appendChild(detail);

    const aksi = document.createElement("div");
    aksi.className = "aksi-item";

    const kontrol = document.createElement("div");
    kontrol.className = "kontrol-jumlah";

    const btnKurang = document.createElement("button");
    btnKurang.type = "button";
    btnKurang.className = "btn-qty";
    btnKurang.textContent = "-";
    btnKurang.setAttribute("aria-label", "Kurangi jumlah " + item.nama);
    btnKurang.addEventListener("click", function () {
      ubahJumlahItem(item.kode, -1);
    });

    const nilai = document.createElement("span");
    nilai.className = "nilai-qty";
    nilai.textContent = item.jumlah;

    const btnTambah = document.createElement("button");
    btnTambah.type = "button";
    btnTambah.className = "btn-qty";
    btnTambah.textContent = "+";
    btnTambah.setAttribute("aria-label", "Tambah jumlah " + item.nama);
    btnTambah.addEventListener("click", function () {
      ubahJumlahItem(item.kode, 1);
    });

    kontrol.appendChild(btnKurang);
    kontrol.appendChild(nilai);
    kontrol.appendChild(btnTambah);

    const subtotal = document.createElement("span");
    subtotal.className = "subtotal-item";
    subtotal.textContent = formatRupiah(item.harga * item.jumlah);

    const btnHapus = document.createElement("button");
    btnHapus.type = "button";
    btnHapus.className = "btn-hapus";
    btnHapus.textContent = "Hapus";
    btnHapus.setAttribute("aria-label", "Hapus " + item.nama);
    btnHapus.addEventListener("click", function () {
      hapusItemKeranjang(item.kode);
    });

    aksi.appendChild(kontrol);
    aksi.appendChild(subtotal);
    aksi.appendChild(btnHapus);

    baris.appendChild(info);
    baris.appendChild(aksi);
    wadah.appendChild(baris);
  });

  if (elTotalItem) elTotalItem.textContent = hitungTotalItem(keranjangBelanja);
  if (elTotalHarga) elTotalHarga.textContent = formatRupiah(hitungTotalHarga(keranjangBelanja));
}

/**
 * Menyusun pesan teks WhatsApp yang rapi dari isi keranjang dan data pelanggan.
 * @param {Array<Object>} keranjang - Daftar produk yang dipesan.
 * @param {Object} pelanggan - Data nama, telepon, alamat, dan catatan pelanggan.
 * @returns {string} Teks pesanan siap encode untuk tautan WhatsApp.
 */
function buatPesanWhatsApp(keranjang, pelanggan) {
  const barisPesan = [
    "Halo Camilan Nusantara!",
    "",
    "Saya ingin melakukan pemesanan:",
    ""
  ];

  keranjang.forEach(function (item, urutan) {
    const subtotal = item.harga * item.jumlah;
    barisPesan.push((urutan + 1) + ". " + item.nama + " [" + item.kode + "]");
    barisPesan.push("   Jumlah: " + item.jumlah);
    barisPesan.push("   Harga: " + formatRupiah(item.harga));
    barisPesan.push("   Subtotal: " + formatRupiah(subtotal));
    barisPesan.push("");
  });

  barisPesan.push("Total Pesanan: " + formatRupiah(hitungTotalHarga(keranjang)));
  barisPesan.push("");
  barisPesan.push("Nama: " + pelanggan.nama);
  barisPesan.push("No. Telepon: " + pelanggan.telepon);
  barisPesan.push("Alamat: " + pelanggan.alamat);

  if (pelanggan.catatan !== "") {
    barisPesan.push("Catatan: " + pelanggan.catatan);
  }

  barisPesan.push("");
  barisPesan.push("Mohon konfirmasi ketersediaan produk dan total pembayaran.");
  barisPesan.push("Terima kasih!");

  return barisPesan.join("\n");
}

/**
 * Membentuk URL WhatsApp ter-encode dengan pemeriksaan kesalahan encoding.
 * @param {string} pesan - Teks pesan WhatsApp mentah.
 * @returns {string|null} URL WhatsApp lengkap, atau null jika gagal dibentuk.
 */
function buatUrlCheckoutWA(pesan) {
  try {
    if (!pesan || typeof pesan !== "string") return null;
    return "https://wa.me/" + NOMOR_WA_RESMI + "?text=" + encodeURIComponent(pesan);
  } catch (err) {
    return null;
  }
}

/**
 * Mengatur interaksi tombol tambah produk, keranjang, checkout WhatsApp,
 * serta konfirmasi aman pengosongan keranjang setelah pelanggan kembali dari WhatsApp.
 */
function aturPemesananWhatsApp() {
  keranjangBelanja = muatKeranjang();
  renderKeranjang(false);

  const statusCheckout = document.getElementById("status-checkout");
  const panelKonfirmasiWA = document.getElementById("konfirmasi-wa");
  const formCheckout = document.getElementById("form-checkout-wa");

  function beriUmpanBalikTombol(tombol) {
    const teksAsli = tombol.textContent;
    tombol.textContent = "✓ Ditambahkan";
    setTimeout(function () {
      tombol.textContent = teksAsli;
    }, 900);
  }

  function selesaikanPesananWA() {
    menungguKonfirmasiWA = false;
    pernahTinggalkanTab = false;
    kosongkanKeranjangPenuh();
    if (panelKonfirmasiWA) panelKonfirmasiWA.hidden = true;
    if (formCheckout) formCheckout.reset();
    tampilkanStatusForm(
      statusCheckout,
      "Terima kasih! Pesanan Anda telah dikonfirmasi terkirim dan keranjang dikosongkan.",
      "success"
    );
    tampilkanNotifikasi("success", "Keranjang berhasil dikosongkan.");
  }

  function batalkanKonfirmasiWA() {
    menungguKonfirmasiWA = false;
    pernahTinggalkanTab = false;
    if (panelKonfirmasiWA) panelKonfirmasiWA.hidden = true;
    tampilkanStatusForm(
      statusCheckout,
      "Keranjang Anda tetap dipertahankan agar pesanan tidak hilang. Silakan kirim ulang bila sudah siap.",
      "warning"
    );
    tampilkanNotifikasi("info", "Keranjang tetap disimpan.");
  }

  document.querySelectorAll(".btn-tambah").forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      const kode = tombol.getAttribute("data-kode");
      if (tambahKeKeranjang(kode)) {
        tampilkanStatusForm(statusCheckout, "", "");
        if (panelKonfirmasiWA) panelKonfirmasiWA.hidden = true;
        beriUmpanBalikTombol(tombol);
      }
    });
  });

  document.querySelectorAll(".btn-tambah-kartu").forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      const idSelect = tombol.getAttribute("data-select");
      const selectEl = document.getElementById(idSelect);
      if (!selectEl) {
        tampilkanNotifikasi("error", "Pilihan kemasan produk tidak ditemukan.");
        return;
      }
      if (tambahKeKeranjang(selectEl.value)) {
        tampilkanStatusForm(statusCheckout, "", "");
        if (panelKonfirmasiWA) panelKonfirmasiWA.hidden = true;
        beriUmpanBalikTombol(tombol);
      }
    });
  });

  const btnKosongkan = document.getElementById("btn-kosongkan");
  if (btnKosongkan) {
    btnKosongkan.addEventListener("click", function () {
      if (keranjangBelanja.length === 0) return;

      mintaKonfirmasi(
        "Kosongkan Keranjang?",
        "Semua produk dalam keranjang belanja akan dihapus.",
        "Ya, Kosongkan"
      ).then(function (setuju) {
        if (setuju) {
          kosongkanKeranjangPenuh();
          if (panelKonfirmasiWA) panelKonfirmasiWA.hidden = true;
          tampilkanStatusForm(statusCheckout, "Keranjang pesanan telah dikosongkan.", "info");
          tampilkanNotifikasi("info", "Keranjang berhasil dikosongkan.");
        }
      });
    });
  }

  const btnWASukses = document.getElementById("btn-wa-sukses");
  if (btnWASukses) {
    btnWASukses.addEventListener("click", selesaikanPesananWA);
  }

  const btnWABatal = document.getElementById("btn-wa-batal");
  if (btnWABatal) {
    btnWABatal.addEventListener("click", batalkanKonfirmasiWA);
  }

  // Meminta konfirmasi hanya setelah pelanggan benar-benar berpindah ke tab WhatsApp lalu kembali
  document.addEventListener("visibilitychange", function () {
    if (!menungguKonfirmasiWA) return;
    if (document.hidden) {
      pernahTinggalkanTab = true;
    } else if (pernahTinggalkanTab) {
      menungguKonfirmasiWA = false;
      pernahTinggalkanTab = false;
      mintaKonfirmasi(
        "Konfirmasi Pengiriman WhatsApp",
        "Apakah pesanan sudah berhasil dikirim melalui WhatsApp?",
        "Ya, Sudah Terkirim"
      ).then(function (sudahKirim) {
        if (sudahKirim) {
          selesaikanPesananWA();
        } else {
          batalkanKonfirmasiWA();
        }
      });
    }
  });

  if (!formCheckout) return;

  const elNama = document.getElementById("wa-nama");
  const elTelepon = document.getElementById("wa-telepon");
  const elAlamat = document.getElementById("wa-alamat");
  const elCatatan = document.getElementById("wa-catatan");

  [elNama, elTelepon, elAlamat].forEach(function (el) {
    if (el) {
      el.addEventListener("input", function () {
        aturErrorInput(el, "");
        tampilkanStatusForm(statusCheckout, "", "");
      });
    }
  });

  formCheckout.addEventListener("submit", function (event) {
    event.preventDefault();
    tampilkanStatusForm(statusCheckout, "", "");
    aturErrorInput(elNama, "");
    aturErrorInput(elTelepon, "");
    aturErrorInput(elAlamat, "");

    if (keranjangBelanja.length === 0) {
      tampilkanStatusForm(
        statusCheckout,
        "Keranjang masih kosong. Tambahkan minimal 1 produk sebelum melanjutkan ke WhatsApp.",
        "warning"
      );
      tampilkanNotifikasi("warning", "Keranjang belanja Anda masih kosong.");
      return;
    }

    const nama = elNama ? elNama.value.trim() : "";
    const telepon = elTelepon ? elTelepon.value.trim() : "";
    const alamat = elAlamat ? elAlamat.value.trim() : "";
    const catatan = elCatatan ? elCatatan.value.trim() : "";

    let fokusPertama = null;

    if (nama === "") {
      aturErrorInput(elNama, "Nama lengkap pelanggan wajib diisi.");
      fokusPertama = elNama;
    }

    if (!cekFormatTelepon(telepon)) {
      aturErrorInput(elTelepon, "Masukkan nomor telepon/WhatsApp yang valid (9-15 digit angka).");
      if (!fokusPertama) fokusPertama = elTelepon;
    }

    if (alamat === "") {
      aturErrorInput(elAlamat, "Alamat lengkap pengiriman wajib diisi.");
      if (!fokusPertama) fokusPertama = elAlamat;
    }

    if (fokusPertama) {
      tampilkanStatusForm(statusCheckout, "Mohon lengkapi data pengiriman yang masih kosong atau belum valid.", "error");
      tampilkanNotifikasi("warning", "Data pengiriman belum lengkap.");
      fokusPertama.focus();
      return;
    }

    const pesan = buatPesanWhatsApp(keranjangBelanja, {
      nama: nama,
      telepon: telepon,
      alamat: alamat,
      catatan: catatan
    });

    const urlWhatsApp = buatUrlCheckoutWA(pesan);
    if (!urlWhatsApp) {
      tampilkanStatusForm(statusCheckout, "Gagal membentuk tautan pesanan WhatsApp. Periksa kembali catatan Anda dan coba lagi.", "error");
      tampilkanNotifikasi("error", "Gagal menyiapkan tautan WhatsApp.");
      return;
    }

    const jendelaWA = window.open(urlWhatsApp, "_blank", "noopener,noreferrer");

    menungguKonfirmasiWA = true;
    pernahTinggalkanTab = false;

    if (panelKonfirmasiWA) {
      panelKonfirmasiWA.hidden = false;
    }

    if (!jendelaWA) {
      // Tangani bila browser memblokir popup dengan menyediakan link manual yang aman
      tampilkanStatusForm(
        statusCheckout,
        "Popup WhatsApp diblokir oleh peramban. Silakan klik tombol di bawah untuk membuka WhatsApp secara manual: ",
        "warning"
      );
      if (statusCheckout) {
        const linkManual = document.createElement("a");
        linkManual.href = urlWhatsApp;
        linkManual.target = "_blank";
        linkManual.rel = "noopener noreferrer";
        linkManual.textContent = "Buka WhatsApp Sekarang";
        statusCheckout.appendChild(linkManual);
      }
      tampilkanNotifikasi("warning", "Popup diblokir. Gunakan tautan manual untuk membuka WhatsApp.");
      return;
    }

    tampilkanStatusForm(
      statusCheckout,
      "WhatsApp telah dibuka dengan rincian pesanan. Setelah menekan Kirim di WhatsApp, silakan konfirmasi status pengiriman di bawah ini.",
      "info"
    );
  });
}
