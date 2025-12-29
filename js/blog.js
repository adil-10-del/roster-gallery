const container = document.getElementById("blog-list");
const select = document.getElementById("category");

let blogData = [];

// load JSON
fetch("data/blog.json")
  .then(response => response.json())
  .then(data => {
    blogData = data;
    renderBlog(blogData);
  })
  .catch(err => console.error("Error load JSON:", err));

function renderBlog(data) {
  container.innerHTML = "";
  data.forEach(item => {
    container.innerHTML += `
      <div class="blog-card">
        <img src="${item.image}">
        <div class="blog-content">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <a href="blog-detail.html?id=${item.id}">Baca Selengkapnya →</a>
        </div>
      </div>
    `;
  });
}

// filter berdasarkan kategori
select.addEventListener("change", function() {
  const category = this.value;
  if(category === "All") {
    renderBlog(blogData);
  } else {
    renderBlog(blogData.filter(item => item.category === category));
  }
});
