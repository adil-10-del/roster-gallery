fetch("data/blog.json")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("blog-list");
    const searchInput = document.getElementById("searchInput");
    const noResult = document.getElementById("no-result");

    function render(posts) {
      list.innerHTML = "";
      noResult.style.display = posts.length ? "none" : "block";

      posts.forEach(p => {
        list.innerHTML += `
          <article class="blog-card">
            <img src="${p.image}" alt="${p.title}">
            <h2><a href="blog/${p.slug}.html">${p.title}</a></h2>
            <p>${p.excerpt}</p>
            <small>${p.date}</small>
          </article>
        `;
      });
    }

    render(data.posts);

    searchInput.addEventListener("input", e => {
      const q = e.target.value.toLowerCase();
      const filtered = data.posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q)
      );
      render(filtered);
    });
  });
