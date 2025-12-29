let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
  index = (index + 1) % slides.length;
}

setInterval(showSlide, 4000);
showSlide();

// Blog preview data
const blogData = [
  {
    title: "Keunggulan Roster Beton untuk Bangunan Modern",
    desc: "Roster beton menjadi solusi estetis dan fungsional untuk bangunan modern.",
    link: "blog/artikel-1.html"
  },
  {
    title: "Perbedaan Bata Tempel dan Bata Ekspos",
    desc: "Kenali perbedaan dan keunggulan masing-masing jenis bata.",
    link: "blog/artikel-2.html"
  },
  {
    title: "Tips Memilih Paving Block Berkualitas",
    desc: "Panduan memilih paving block agar awet dan kuat.",
    link: "blog/artikel-3.html"
  }
];

const blogContainer = document.getElementById("blog-container");
blogData.forEach(item => {
  const div = document.createElement("div");
  div.className = "box";
  div.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.desc}</p>
    <a href="${item.link}" class="btn primary">Baca</a>
  `;
  blogContainer.appendChild(div);
});

