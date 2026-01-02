const fs = require("fs");
const path = require("path");

const queuePath = "data/queue.json";
const blogIndexPath = "data/blog.json";
const BLOG_DIR = "blog";
const ASSET_DIR = "assets/blog";

const MAX_PER_RUN = 2;
const today = new Date().toISOString().split("T")[0];

let queue = JSON.parse(fs.readFileSync(queuePath));
let blogIndex = fs.existsSync(blogIndexPath)
  ? JSON.parse(fs.readFileSync(blogIndexPath))
  : { posts: [] };

if (!queue.queue.length) process.exit(0);

if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
if (!fs.existsSync(ASSET_DIR)) fs.mkdirSync(ASSET_DIR, { recursive: true });

const publishItems = queue.queue.splice(0, MAX_PER_RUN);

publishItems.forEach(item => {
  const image = `${item.slug}.jpg`;

const content = `
<p>${item.topic} merupakan salah satu solusi material bangunan yang banyak digunakan pada proyek modern.</p>
<p>Material ini dikenal kuat, tahan lama, serta mudah diaplikasikan pada berbagai jenis bangunan.</p>
<p>Penggunaan ${item.category.toLowerCase()} sangat cocok untuk rumah tinggal, gedung komersial, hingga area industri.</p>
<p>Dari sisi biaya, material ini tergolong efisien karena umur pakainya yang panjang.</p>
<p>Selain itu, tampilannya juga mampu meningkatkan nilai estetika bangunan.</p>
<p>Dengan pemasangan yang tepat, ${item.topic.toLowerCase()} menjadi investasi jangka panjang.</p>
`;

/* ========================
   SCHEMA SEO
======================== */
const schema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${title}",
  "image": "https://adil-10-del.github.io/roster-gallery/assets/blog/${imageName}",
  "datePublished": "${today}",
  "dateModified": "${today}",
  "author": {
    "@type": "Organization",
    "name": "Roster Gallery"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Roster Gallery",
    "logo": {
      "@type": "ImageObject",
      "url": "https://adil-10-del.github.io/roster-gallery/assets/images/logo.jpg"
    }
  }
}
</script>
`;

/* ========================
   HTML TEMPLATE
======================== */
const html = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${title} | Roster Gallery</title>
  <meta name="description" content="${title} untuk kebutuhan bangunan dan konstruksi.">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="canonical" href="https://adil-10-del.github.io/roster-gallery/blog/${slug}.html">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/blog.css">

  ${schema}
</head>

<body>

<header class="header-small">
  <div class="navbar">
    <img src="../assets/images/logo.jpg" class="logo">
    <nav>
      <a href="../index.html">Home</a>
      <a href="../katalog.html">Katalog</a>
      <a href="../blog.html" class="active">Blog</a>
      <a href="../kontak.html">Kontak</a>
    </nav>
  </div>
</header>

<section class="article-hero">
  <img src="../assets/blog/${imageName}" alt="${title}">
</section>

<article class="article-container">
  <h1>${title}</h1>

  <div class="article-meta">
    <span>📅 ${today}</span>
    <span>🏷️ ${item.category}</span>
  </div>

  <div class="article-content">
    ${content}
  </div>

  <div class="article-nav">
    <a href="../blog.html">← Kembali ke Blog</a>
  </div>
</article>

<footer class="footer-main">
  <div class="footer-container">

    <div class="footer-col">
      <h3>Roster Gallery</h3>
      <p>Produsen material beton berkualitas untuk kebutuhan konstruksi dan desain bangunan di Purwakarta.</p>
    </div>

    <div class="footer-col">
      <h4>Kontak</h4>
      <p>📍 Purwakarta, Jawa Barat</p>
      <p>📞 0838-7279-3673</p>
      <p>🕘 Senin – Sabtu, 08.00 – 17.00</p>
    </div>

    <div class="footer-col">
      <h4>Menu</h4>
      <a href="index.html">Home</a>
      <a href="katalog.html">Katalog</a>
      <a href="layanan.html">Layanan</a>
      <a href="blog.html">Blog</a>
      <a href="kontak.html">Kontak</a>
    </div>

    <div class="footer-col">
      <h4>Hubungi Kami</h4>
      <a class="btn-wa" href="https://wa.me/6283872793673" target="_blank">
        Chat WhatsApp
      </a>
    </div>

  </div>

  <div class="footer-bottom">
    © 2025 Roster Gallery — All Rights Reserved.
  </div>
</footer>

<a
  href="https://wa.me/6283872793673"
  class="wa-float"
  target="_blank"
  aria-label="Chat WhatsApp"
>
<img src="../assets/images/whatsapp.jpg" alt="WhatsApp">
</a>

</body>
</html>
`;

/* ========================
   SAVE FILE
======================== */
fs.mkdirSync(BLOG_DIR, { recursive: true });
fs.mkdirSync(ASSET_DIR, { recursive: true });

fs.writeFileSync(`${BLOG_DIR}/${item.slug}.html`, html);
fs.writeFileSync(`${ASSET_DIR}/${item.slug}.jpg`, "");

let blogIndex = { posts: [] };
if (fs.existsSync(blogIndexPath)) {
  blogIndex = JSON.parse(fs.readFileSync(blogIndexPath));
}

blogIndex.posts.unshift({
  slug: item.slug,
  title: item.topic,
  date: today,
  image: `assets/blog/${item.slug}.jpg`
});

fs.writeFileSync(blogIndexPath, JSON.stringify(blogIndex, null, 2));
fs.writeFileSync(queuePath, JSON.stringify(queueData, null, 2));

console.log("✅ Artikel publish:", item.slug);
