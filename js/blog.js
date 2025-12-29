const blogData = [
  {
    id: 1,
    title: "Keunggulan Roster Beton untuk Bangunan Modern",
    desc: "Roster beton memberikan sirkulasi udara dan estetika pada bangunan modern.",
    image: "assets/images/blog/roster.jpg",
    category: "Roster Beton",
    link: "blog-detail.html?id=1"
  },
  {
    id: 2,
    title: "Tips Memilih Paving Block Berkualitas",
    desc: "Kenali jenis paving block terbaik untuk halaman rumah dan proyek besar.",
    image: "assets/images/blog/paving.jpg",
    category: "Paving Block",
    link: "blog-detail.html?id=2"
  },
  {
    id: 3,
    title: "Perbedaan Bata Tempel dan Bata Ekspos",
    desc: "Mana yang lebih cocok untuk desain bangunan Anda?",
    image: "assets/images/blog/bata.jpg",
    category: "Bata",
    link: "blog-detail.html?id=3"
  },
  {
    id: 4,
    title: "Genteng Beton vs Genteng Tanah Liat",
    desc: "Bandingkan kelebihan dan kekurangannya.",
    image: "assets/images/blog/genteng.jpg",
    category: "Genteng",
    link: "blog-detail.html?id=4"
  },
  {
    id: 5,
    title: "Tips Memilih Material Bangunan Berkualitas",
    desc: "Panduan penting sebelum membeli bahan bangunan.",
    image: "assets/images/blog/material.jpg",
    category: "General",
    link: "blog-detail.html?id=5"
  }
];

const container = document.getElementById("blog-list");
const select = document.getElementById("category");

function renderBlog(data) {
  container.innerHTML = "";
  data.forEach(item => {
    container.innerHTML += `
      <div class="blog-card">
        <img src="${item.image}">
        <div class="blog-content">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <a href="${item.link}">Baca Selengkapnya →</a>
        </div>
      </div>
    `;
  });
}

// render awal semua artikel
renderBlog(blogData);

// filter saat ganti kategori
select.addEventListener("change", function() {
  const category = this.value;
  if(category === "All") {
    renderBlog(blogData);
  } else {
    renderBlog(blogData.filter(item => item.category === category));
  }
});

