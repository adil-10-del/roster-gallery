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
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("Helvetica");
  doc.setFontSize(12);

  let y = 20;
  doc.text("SURAT PERMOHONAN KERJA SAMA", 105, y, { align: "center" });

  y += 15;
  doc.text(`Nama Perusahaan : ${data.perusahaan}`, 20, y);
  y += 8;
  doc.text(`Penanggung Jawab : ${data.nama}`, 20, y);
  y += 8;
  doc.text(`Jenis Kerja Sama : ${data.jenis}`, 20, y);
  y += 8;
  doc.text(`Alamat : ${data.alamat}`, 20, y);
  y += 8;
  doc.text(`Produk : ${data.produk}`, 20, y);
  y += 8;
  doc.text(`Volume : ${data.volume}`, 20, y);

  y += 15;
  doc.text("Demikian surat permohonan ini kami sampaikan.", 20, y);
  y += 15;
  doc.text("Hormat Kami,", 20, y + 10);
  doc.text(data.nama, 20, y + 20);

  doc.save("Surat-Kerja-Sama.pdf");
}
