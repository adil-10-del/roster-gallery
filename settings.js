document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const sideMenu = document.getElementById("sideMenu");
  const closeBtn = document.querySelector(".close-btn");

  if (toggleBtn && sideMenu && closeBtn) {
    // buka menu
    toggleBtn.addEventListener("click", () => {
      sideMenu.classList.add("show");
    });

    // tutup menu via tombol X
    closeBtn.addEventListener("click", () => {
      sideMenu.classList.remove("show");
    });
  } else {
    console.error("Elemen menu tidak ditemukan!");
  }
});
// --- safe DOM refs (tidak error jika null) ---
const sideMenu = document.getElementById("sideMenu");
const toggleBtn = document.querySelector(".menu-toggle");
const closeBtn = document.querySelector(".close-btn");

// side menu toggle (cek eksistensi)
if (toggleBtn && sideMenu) {
  toggleBtn.addEventListener("click", () => {
    sideMenu.style.left = "0";
  });
}
if (closeBtn && sideMenu) {
  closeBtn.addEventListener("click", () => {
    sideMenu.style.left = "-260px";
  });
}

// --- filter produk ---
const motifInput = document.getElementById("filterMotif");
const hargaSelect = document.getElementById("filterHarga");
const productGrid = document.querySelector(".product-grid");
let products = Array.from(document.querySelectorAll(".product-card"));

// buat elemen "no results" sekali
const noResults = document.createElement("div");
noResults.className = "no-results hidden";
noResults.textContent = "Produk tidak ditemukan.";

// helper normalisasi
function norm(v) {
  return String(v || "").toLowerCase().trim();
}

function filterProduk() {
  const motifVal = motifInput ? norm(motifInput.value) : "";
  const hargaVal = hargaSelect ? norm(hargaSelect.value) : "";

  let anyVisible = false;

  products.forEach(p => {
    // Pastikan data attribute ada
    const motif = norm(p.dataset.motif);
    const harga = norm(p.dataset.harga);

    const matchMotif = motif.includes(motifVal); // partial match
    const matchHarga = (hargaVal === "" || harga === hargaVal);

    if (matchMotif && matchHarga) {
      p.classList.remove("hidden");
      anyVisible = true;
    } else {
      p.classList.add("hidden");
    }
  });

  // tampilkan atau sembunyikan pesan 'no results'
  if (!anyVisible) {
    noResults.classList.remove("hidden");
    if (productGrid && !productGrid.contains(noResults)) productGrid.appendChild(noResults);
  } else {
    noResults.classList.add("hidden");
    if (productGrid && productGrid.contains(noResults)) productGrid.removeChild(noResults);
  }
}

// tambahkan event listener hanya bila elemen ada
if (motifInput) motifInput.addEventListener("input", filterProduk);
if (hargaSelect) hargaSelect.addEventListener("change", filterProduk);

// jalankan filter awal (agar tampilan sesuai default)
document.addEventListener("DOMContentLoaded", () => {
  // refresh list produk (re-read in case dynamic)
  products = Array.from(document.querySelectorAll(".product-card"));
  filterProduk();
});
