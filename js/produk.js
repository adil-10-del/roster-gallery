const produkData = [
  { nama: "Roster Beton", folder: "roster" },
  { nama: "Genteng", folder: "genteng" },
  { nama: "Bata", folder: "bata" },
  { nama: "Wall Panel", folder: "wall-panel" },
  { nama: "List Pang", folder: "list-pang" },
  { nama: "Tiang", folder: "tiang" },
  { nama: "Paving", folder: "paving" }
];

const container = document.getElementById("product-container");

produkData.forEach(kategori => {
  const section = document.createElement("section");
  section.innerHTML = `<h2 class="category-title">${kategori.nama}</h2>
                       <div class="product-grid"></div>`;
  const grid = section.querySelector(".product-grid");

  for (let i = 1; i <= 10; i++) {
    const img = new Image();
    img.src = `assets/produk/${kategori.folder}/${i}.jpg`;

    img.onload = () => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${img.src}" alt="${kategori.nama} ${i}">
        <h3>${kategori.nama} ${i}</h3>
        <a href="https://wa.me/6283872793673" class="btn">Tanya Harga</a>
      `;
      grid.appendChild(card);
    };
  }

  container.appendChild(section);
});
