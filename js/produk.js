document.addEventListener("DOMContentLoaded", () => {

  const products = [
    {
      nama: "Roster Beton Minimalis",
      deskripsi: "Roster beton kuat dan presisi",
      gambar: "assets/images/produk1.jpg"
    },
    {
      nama: "Roster Ventilasi Klasik",
      deskripsi: "Desain klasik dengan sirkulasi optimal",
      gambar: "assets/images/produk2.jpg"
    }
  ];

  const list = document.getElementById("productList");
  if (!list) return;

  products.forEach(p => {
    list.innerHTML += `
      <div class="product-card">
        <img src="${p.gambar}" alt="${p.nama}" loading="lazy">
        <div class="product-body">
          <h3>${p.nama}</h3>
          <p>${p.deskripsi}</p>
        </div>
      </div>
    `;
  });

});
