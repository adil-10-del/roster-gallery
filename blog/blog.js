// ========================
// TOPIK PILIHAN
// ========================
const topikWrap = document.getElementById("topik-pilihan");
BLOG_DATA.topikPilihan.forEach(t => {
  topikWrap.innerHTML += `
    <a href="${t.url}" class="topik-card">${t.title}</a>
  `;
});

// ========================
// PALING BANYAK DICARI
// ========================
const dicariWrap = document.getElementById("paling-dicari");
BLOG_DATA.palingDicari.forEach(d => {
  dicariWrap.innerHTML += `<li><a href="#">${d}</a></li>`;
});

// ========================
// KATEGORI
// ========================
const kategoriWrap = document.getElementById("kategori-list");
BLOG_DATA.kategori.forEach(k => {
  kategoriWrap.innerHTML += `<li><a href="#">${k}</a></li>`;
});

// ========================
// UTIL: SHUFFLE (ACAK)
// ========================
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// ========================
// ARTIKEL ACAK + RENDER
// ========================
const artikelWrap = document.getElementById("artikel-list");
let artikelData = shuffleArray([...BLOG_DATA.artikel]);

function renderArtikel(data) {
  artikelWrap.innerHTML = "";

  data.forEach(a => {
    artikelWrap.innerHTML += `
      <article class="artikel-item">
        <img src="${a.image}" alt="${a.title}">
        <div>
          <h3><a href="${a.url}">${a.title}</a></h3>
          <p class="meta">${a.kategori} • ${a.tanggal}</p>
          <p>${a.ringkas}</p>
        </div>
      </article>
    `;
  });
}

// render pertama kali
renderArtikel(artikelData);

// ========================
// SEARCH FILTER
// ========================
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();

    const filtered = artikelData.filter(a =>
      a.title.toLowerCase().includes(keyword) ||
      a.kategori.toLowerCase().includes(keyword) ||
      a.ringkas.toLowerCase().includes(keyword)
    );

    renderArtikel(filtered);
  });
}
