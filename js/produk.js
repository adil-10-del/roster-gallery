document.addEventListener("DOMContentLoaded", () => {

  const WA_NUMBER = "6283872793673";

  const produkData = [
    { nama: "Roster Beton", folder: "roster", slug: "roster-beton" },
    { nama: "Genteng", folder: "genteng", slug: "genteng" },
    { nama: "Bata", folder: "bata", slug: "bata" },
    { nama: "Walpanel", folder: "walpanel", slug: "walpanel" },
    { nama: "List Pang", folder: "list-pang", slug: "list-pang" },
    { nama: "Tiang", folder: "tiang", slug: "tiang" },
    { nama: "Paving Block", folder: "paving", slug: "paving" }
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

    loadImagesAuto(item, grid, WA_NUMBER);
  });

});

/* ===============================
   AUTO FOTO + LINK OTOMATIS
================================ */
function loadImagesAuto(item, grid, WA_NUMBER) {
  let index = 1;

  const loadNext = () => {
    const img = new Image();
    img.src = `assets/produk/${item.folder}/${index}.jpg`;

    img.onload = () => {
      const productName = `${item.nama} ${index}`;
      const waText = encodeURIComponent(
        `Halo Roster Gallery, saya ingin bertanya harga ${productName}`
      );

      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${img.src}" alt="${productName}" loading="lazy">
        <h3>${productName}</h3>
        <div class="btn-group">
          <a href="https://wa.me/${WA_NUMBER}?text=${waText}" target="_blank" class="btn">
            Tanya Harga
          </a>
          <a href="blog/${item.slug}.html" class="btn outline">
            Lihat Artikel
          </a>
        </div>
      `;

      grid.appendChild(card);
      index++;
      loadNext();
    };

    img.onerror = () => {
      return; // stop kalau foto tidak ada
    };
  };

  loadNext();
}
