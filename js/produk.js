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

products.forEach(p => {
  list.innerHTML += `
    <div class="product-card">
      <img src="${p.gambar}" alt="${p.nama}">
      <div class="product-body">
        <h3>${p.nama}</h3>
        <p>${p.deskripsi}</p>
      </div>
    </div>
  `;
});
