document.getElementById("articleForm").addEventListener("submit", e => {
  e.preventDefault();

  const title = title.value;
  const category = category.value;
  const content = content.value;
  const image = image.value || "../assets/images/default.jpg";

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/(^-|-$)/g,"");

  const date = new Date().toISOString().split("T")[0];

  const html = `
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>${title} | Roster Gallery</title>
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/blog.css">
</head>

<body>

<header class="header-small"></header>

<section class="article-hero">
  <img src="${image}" alt="${title}">
</section>

<article class="article-container">
<h1>${title}</h1>

<div class="article-meta">
<span>📅 ${date}</span>
<span>🏷️ ${category}</span>
</div>

<div class="article-content">
${content.split("\n").map(p=>`<p>${p}</p>`).join("")}
</div>

<a href="../blog.html" class="btn">← Kembali ke Blog</a>
</article>

</body>
</html>
`;

  localStorage.setItem("previewArticle", JSON.stringify({
    title, category, content, image, date, slug, html
  }));

  location.href = "preview.html";
});
