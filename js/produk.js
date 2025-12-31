document.addEventListener("DOMContentLoaded", () => {

  const produkData = [
    { nama: "Roster Beton", folder: "roster" },
    { nama: "Genteng", folder: "genteng" },
    { nama: "Bata", folder: "bata" },
    { nama: "Walpanel", folder: "walpanel" },
    { nama: "List Pang", folder: "list-pang" },
    { nama: "Tiang", folder: "tiang" },
    { nama: "Paving", folder: "paving" }
  ];

  const container = document.getElementById("product-container");
  if (!container) return;

  produkData.forEach(item => {
    const section = document.createElement("section");
    section.innerHTML = `
      <h2 class="category-title">${item.nama}</h2>
      <div class="product-grid"></div>
    `;

    const grid = section.querySelector(".product-grid");
    container.appendChild(section);

    loadImagesAuto(item, grid);
  });

});

/* =========================
   AUTO DETECT JUMLAH FOTO
========================= */
function loadImagesAuto(item, grid) {
  let index = 1;

  const tryLoad = () => {
    const img = new Image();
    img.src = `assets/produk/${item.folder}/${index}.jpg`;
    img.loading = "lazy";
    img.decoding = "async";

    img.onload = () => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${img.src}" alt="${item.nama} ${index}">
        <h3>${item.nama} ${index}</h3>
        <div class="btn-group">
          <a href="https://wa.me/6283872793673" class="btn">Tanya Harga</a>
          <a href="blog.html" class="btn outline">Lihat Artikel</a>
        </div>
      `;
      grid.appendChild(card);

      index++;
      tryLoad(); // 🔥 lanjut ke gambar berikutnya
    };

    img.onerror = () => {
      // ❌ STOP kalau gambar tidak ada
      return;
    };
  };

  tryLoad();
}
