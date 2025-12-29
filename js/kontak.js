document.getElementById("formKontak").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const telp = document.getElementById("telepon").value;
  const kategori = document.getElementById("kategori").value;
  const pesan = document.getElementById("pesan").value;

  const text = `Halo Roster Gallery,%0A
Nama: ${nama}%0A
No HP: ${telp}%0A
Kategori Produk: ${kategori}%0A
Pesan: ${pesan}`;

  const url = `https://wa.me/6283872793673?text=${text}`;
  window.open(url, "_blank");
});
