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
    container.appendChild(section);

    loadImages(item, section.querySelector(".product-grid"));
  });

});

function loadImages(item, grid) {
  let index = 1;
  const MAX_IMAGE = 20; // Batas aman

  function tryLoad() {
    if (index > MAX_IMAGE) return;

    const img = new Image();
    img.src = `assets/produk/${item.folder}/${index}.jpg`;

    img.onload = () => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${img.src}" loading="lazy" alt="${item.nama} ${index}">
        <h3>${item.nama} ${index}</h3>
        <div class="btn-group">
          <a href="https://wa.me/6283872793673" class="btn">Tanya Harga</a>
          <a href="blog.html" class="btn outline">Lihat Artikel</a>
        </div>
      `;
      grid.appendChild(card);
      index++;
      tryLoad();
    };

    img.onerror = () => {
      // STOP total kalau file tidak ada
      return;
    };
  }

  tryLoad();
}
