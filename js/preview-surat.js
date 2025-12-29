const data = JSON.parse(localStorage.getItem("dataKerjasama"));

document.getElementById("pPerusahaan").innerText = data.perusahaan;
document.getElementById("pNama").innerText = data.nama;
document.getElementById("pJenis").innerText = data.jenis;
document.getElementById("pAlamat").innerText = data.alamat;
document.getElementById("pProduk").innerText = data.produk;
document.getElementById("pVolume").innerText = data.volume;
document.getElementById("pNamaTtd").innerText = data.nama;

function kirimWA() {
  const pesan = `
SURAT PERMOHONAN KERJA SAMA

Nama Perusahaan : ${data.perusahaan}
Penanggung Jawab : ${data.nama}
Jenis Kerja Sama  : ${data.jenis}
Alamat            : ${data.alamat}
Produk            : ${data.produk}
Volume            : ${data.volume}

Demikian permohonan ini kami sampaikan.
Terima kasih.
`;

  const wa = "6283872793673";
  window.open(`https://wa.me/${wa}?text=${encodeURIComponent(pesan)}`, "_blank");
}
