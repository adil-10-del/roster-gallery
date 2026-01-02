document.getElementById("formKontak").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const telepon = document.getElementById("telepon").value;
  const kategori = document.getElementById("kategori").value;
  const pesan = document.getElementById("pesan").value;

  const text = `
Halo Roster Gallery 👋
Saya ingin konsultasi / pemesanan.

Nama: ${nama}
No WA: ${telepon}
Produk: ${kategori}
Pesan: ${pesan}
`;

  const waUrl = `https://wa.me/6283872793673?text=${encodeURIComponent(text)}`;
  window.open(waUrl, "_blank");
});

