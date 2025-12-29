document.getElementById("formKerjasama").addEventListener("submit", function(e) {
  e.preventDefault();

  const perusahaan = document.getElementById("perusahaan").value;
  const nama = document.getElementById("nama").value;
  const jenis = document.getElementById("jenis").value;
  const alamat = document.getElementById("alamat").value;
  const produk = document.getElementById("produk").value;
  const volume = document.getElementById("volume").value;
  const catatan = document.getElementById("catatan").value;

  const pesan = `
SURAT PERMOHONAN KERJA SAMA

Kepada Yth:
Roster Gallery

Dengan ini kami mengajukan kerja sama pengadaan material bangunan dengan detail sebagai berikut:

Nama Perusahaan : ${perusahaan}
Penanggung Jawab : ${nama}
Jenis Kerja Sama  : ${jenis}
Alamat Proyek    : ${alamat}
Produk Dibutuhkan: ${produk}
Volume/Kuantitas : ${volume}

Catatan Tambahan:
${catatan}

Demikian pengajuan ini kami sampaikan.
Atas perhatian dan kerja samanya kami ucapkan terima kasih.

Hormat Kami,
${nama}
`;

  const nomorWA = "6283872793673";
  const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
});
