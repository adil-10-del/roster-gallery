document.getElementById("formKerjasama").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    perusahaan: document.getElementById("perusahaan").value,
    nama: document.getElementById("nama").value,
    jenis: document.getElementById("jenis").value,
    alamat: document.getElementById("alamat").value,
    produk: document.getElementById("produk").value,
    volume: document.getElementById("volume").value,
    catatan: document.getElementById("catatan").value
  };

  localStorage.setItem("dataKerjasama", JSON.stringify(data));
  window.location.href = "preview-surat.html";
});

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
const fileInput = document.getElementById("dokumen");

let uploadedFiles = [];

fileInput.addEventListener("change", function () {
  uploadedFiles = Array.from(this.files);
});
+ "\n\n*Catatan:* File pendukung (RAB / gambar) akan dikirim setelah chat terbuka."
const scriptURL = "PASTE_URL_WEB_APP_DISINI";

document.getElementById("formKerjasama").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    perusahaan: document.getElementById("perusahaan").value,
    nama: document.getElementById("nama").value,
    jenis: document.getElementById("jenis").value,
    alamat: document.getElementById("alamat").value,
    produk: document.getElementById("produk").value,
    volume: document.getElementById("volume").value,
    catatan: document.getElementById("catatan").value
  };

  // SIMPAN KE GOOGLE SHEET
  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });

  // SIMPAN KE LOCAL STORAGE
  localStorage.setItem("dataKerjasama", JSON.stringify(data));

  window.location.href = "preview-surat.html";
});
email: document.getElementById("email").value,
