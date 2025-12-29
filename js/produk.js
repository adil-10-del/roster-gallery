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

produkData.forEach(item => {
  const section = document.createElement("section");

  section.innerHTML = `
    <h2 class="category-title">${item.nama}</h2>

    <div class="product-grid">
      ${Array.from({ length: 10 }, (_, i) => `
        <div class="product-card">
          <img src="assets/produk/${item.folder}/${i + 1}.jpg" alt="${item.nama} ${i + 1}">
          <h3>${item.nama} ${i + 1}</h3>

          <div class="btn-group">
            <a href="https://wa.me/6283872793673" class="btn">Tanya Harga</a>
            <a href="${item.blog}" class="btn outline">Lihat Artikel</a>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  container.appendChild(section);
});
  }

  container.appendChild(section);
});
