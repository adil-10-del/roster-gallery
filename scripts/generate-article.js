/**
 * AUTO BLOG GENERATOR – ROSTER GALLERY
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "blog");
const DATA_DIR = path.join(ROOT, "data");
const ASSET_DIR = path.join(ROOT, "assets/blog");

const queuePath = path.join(DATA_DIR, "queue.json");
const blogIndexPath = path.join(DATA_DIR, "blog.json");

if (!fs.existsSync(queuePath)) {
  console.log("Queue kosong.");
  process.exit(0);
}

const queueData = JSON.parse(fs.readFileSync(queuePath, "utf8"));
if (!queueData.queue.length) {
  console.log("Tidak ada artikel untuk dipublish.");
  process.exit(0);
}

const item = queueData.queue.shift();
const today = new Date().toISOString().split("T")[0];

const title = item.topic;
const slug = item.slug;
const imageName = `${slug}.jpg`;

/* ========================
   ARTIKEL CONTENT (900+)
======================== */
const content = `
<p>${item.topic} merupakan salah satu topik penting dalam dunia material bangunan modern. 
Material ini banyak digunakan karena kekuatan, daya tahan, serta tampilannya yang fleksibel.</p>

<p>Dalam penerapannya, ${item.category.toLowerCase()} sering digunakan pada bangunan hunian,
komersial, hingga proyek berskala besar. Penggunaan yang tepat dapat meningkatkan nilai estetika
dan fungsi bangunan secara keseluruhan.</p>

<p>Keunggulan lainnya adalah kemudahan perawatan serta umur pakai yang panjang. 
Hal ini menjadikan material ini sebagai solusi jangka panjang bagi pemilik bangunan.</p>

<p>Selain itu, pemilihan material yang sesuai juga membantu efisiensi biaya pembangunan 
tanpa mengurangi kualitas dan kekuatan struktur.</p>

<p>Dengan perencanaan yang matang dan pemasangan profesional, 
${item.topic.toLowerCase()} dapat menjadi investasi jangka panjang untuk properti Anda.</p>
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

<footer class="footer footer-small">
  <div class="footer-inner">
    <div>
      <strong>Roster Gallery</strong><br>
      Material Beton & Ornamen Bangunan
    </div>
    <div>
      📍 Purwakarta, Jawa Barat<br>
      📞 <a href="https://wa.me/6283872793673">WhatsApp</a>
    </div>
  </div>
  <p class="copyright">
    © 2025 Roster Gallery. All Rights Reserved.
  </p>
</footer>

</body>
</html>
`;

/* ========================
   SAVE FILE
======================== */
if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
if (!fs.existsSync(ASSET_DIR)) fs.mkdirSync(ASSET_DIR, { recursive: true });

fs.writeFileSync(path.join(BLOG_DIR, `${slug}.html`), html);

// placeholder image
fs.writeFileSync(path.join(ASSET_DIR, imageName), "");

let blogIndex = { posts: [] };
if (fs.existsSync(blogIndexPath)) {
  blogIndex = JSON.parse(fs.readFileSync(blogIndexPath, "utf8"));
}

blogIndex.posts.unshift({
  slug,
  title,
  image: `assets/blog/${imageName}`,
  date: today,
  tags: item.tags
});

fs.writeFileSync(blogIndexPath, JSON.stringify(blogIndex, null, 2));
fs.writeFileSync(queuePath, JSON.stringify(queueData, null, 2));

console.log("✅ Artikel berhasil dipublish:", slug);
