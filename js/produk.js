document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productList");
  if (!container) return;

  const produkData = [
    { nama: "Roster Beton", folder: "roster", slug: "roster-beton" },
    { nama: "Genteng", folder: "genteng", slug: "genteng" },
    { nama: "Bata", folder: "bata", slug: "bata" },
    { nama: "Walpanel", folder: "walpanel", slug: "walpanel" },
    { nama: "List Pang", folder: "list-pang", slug: "list-pang" },
    { nama: "Tiang", folder: "tiang", slug: "tiang" },
    { nama: "Paving", folder: "paving", slug: "paving" }
  ];

  produkData.forEach(item => {
    const section = document.createElement("section");
    let cards = ""; // ✅ WAJIB ADA

    for (let i = 1; i <= 10; i++) {
      const imgPath = `assets/produk/${item.folder}/${i}.jpg`;

      cards += `
        <div class="product-card">
          <img src="${imgPath}" alt="${item.nama} ${i}" loading="lazy">
          <h3>${item.nama} ${i}</h3>
          <div class="btn-group">
            <a href="https://wa.me/6283872793673?text=Halo,%20saya%20ingin%20tanya%20${encodeURIComponent(item.nama + ' ' + i)}"
               class="btn" target="_blank">Tanya Harga</a>
            <a href="blog/${item.slug}.html" class="btn outline">Lihat Artikel</a>
          </div>
        </div>
      `;
    }

    section.innerHTML = `
      <h2 class="category-title">${item.nama}</h2>
      <div class="product-grid">${cards}</div>
    `;

    container.appendChild(section);
  });

  /* 🔥 AUTO HAPUS GAMBAR YANG 404 */
  document.querySelectorAll(".product-card img").forEach(img => {
    img.onerror = () => {
      img.closest(".product-card").remove();
    };
  });
});


