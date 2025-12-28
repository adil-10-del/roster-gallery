// Topik Pilihan
const topikWrap = document.getElementById("topik-pilihan");
BLOG_DATA.topikPilihan.forEach(t => {
  topikWrap.innerHTML += `
    <a href="${t.url}" class="topik-card">${t.title}</a>
  `;
});

// Artikel
const artikelWrap = document.getElementById("artikel-list");
BLOG_DATA.artikel.forEach(a => {
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

// Paling Dicari
const dicariWrap = document.getElementById("paling-dicari");
BLOG_DATA.palingDicari.forEach(d => {
  dicariWrap.innerHTML += `<li><a href="#">${d}</a></li>`;
});

// Kategori
const kategoriWrap = document.getElementById("kategori-list");
BLOG_DATA.kategori.forEach(k => {
  kategoriWrap.innerHTML += `<li><a href="#">${k}</a></li>`;
});

