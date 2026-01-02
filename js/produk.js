document.addEventListener("DOMContentLoaded", () => {
  const katalog = [
    { nama: "Bata", folder: "bata", total: 8 },
    { nama: "Roster Beton", folder: "roster", total: 10 },
    { nama: "Genteng", folder: "genteng", total: 8 },
    { nama: "Paving", folder: "paving", total: 6 },
    { nama: "Tiang", folder: "tiang", total: 10 },
    { nama: "WalPanel", folder: "walpanel", total: 10 },
    { nama: "List Pang", folder: "list-pang", total: 10 }
  ];

  const container = document.getElementById("productList");
  if (!container) return;

  katalog.forEach(kategori => {
    for (let i = 1; i <= kategori.total; i++) {
      const imgPath = `assets/produk/${kategori.folder}/${i}.jpg`;

      container.innerHTML += `
        <div class="product-card">
          <img src="${imgPath}" alt="${kategori.nama} ${i}" loading="lazy">
          <div class="product-body">
            <h3>${kategori.nama}</h3>
          </div>
        </div>
      `;
    }
  });
});

