document.getElementById("articleForm").addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const content = document.getElementById("content").value;
  const imageFile = document.getElementById("image").files[0];

  if (!imageFile) {
    alert("Silakan upload gambar artikel");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const imageBase64 = reader.result;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const date = new Date().toISOString().split("T")[0];

    const html = `
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>${title} | Roster Gallery</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/blog.css">
</head>

<body>

<header class="header-small">
  <div class="navbar">
    <img src="../assets/images/logo.jpg" class="logo">
    <nav>
      <a href="../index.html">Home</a>
      <a href="../blog.html">Blog</a>
    </nav>
  </div>
</header>

<section class="article-hero">
  <img src="${imageBase64}" alt="${title}">
</section>

<article class="article-container">
  <h1>${title}</h1>

  <div class="article-meta">
    <span>📅 ${date}</span>
    <span>🏷️ ${category}</span>
  </div>

  <div class="article-content">
    ${content
      .split("\n")
      .map(p => `<p>${p}</p>`)
      .join("")}
  </div>

  <a href="../blog.html" class="btn">← Kembali ke Blog</a>
</article>

</body>
</html>
`;

    localStorage.setItem("previewArticle", JSON.stringify({
      title,
      category,
      date,
      slug,
      image: imageBase64,
      html
    }));

    location.href = "preview.html";
  };

  reader.readAsDataURL(imageFile);
});

