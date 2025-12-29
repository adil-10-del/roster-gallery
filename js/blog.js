const blogData = [
  {
    title: "Keunggulan Roster Beton untuk Bangunan Modern",
    desc: "Roster beton memberikan sirkulasi udara dan estetika pada bangunan modern.",
    image: "assets/images/blog/roster.jpg",
    link: "blog-detail.html?id=1"
  },
  {
    title: "Tips Memilih Paving Block Berkualitas",
    desc: "Kenali jenis paving block terbaik untuk halaman rumah dan proyek besar.",
    image: "assets/images/blog/paving.jpg",
    link: "blog-detail.html?id=2"
  },
  {
    title: "Perbedaan Bata Tempel dan Bata Ekspos",
    desc: "Mana yang lebih cocok untuk desain bangunan Anda?",
    image: "assets/images/blog/bata.jpg",
    link: "blog-detail.html?id=3"
  },
  {
    title: "Genteng Beton vs Genteng Tanah Liat",
    desc: "Bandingkan kelebihan dan kekurangannya.",
    image: "assets/images/blog/genteng.jpg",
    link: "blog-detail.html?id=4"
  },
  {
    title: "Tips Memilih Material Bangunan Berkualitas",
    desc: "Panduan penting sebelum membeli bahan bangunan.",
    image: "assets/images/blog/material.jpg",
    link: "blog-detail.html?id=5"
  }
];

const container = document.getElementById("blog-list");

blogData.forEach(item => {
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
