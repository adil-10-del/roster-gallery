/**
 * AUTO BLOG GENERATOR
 * Roster Gallery
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
  console.log("Queue kosong. Tidak ada artikel dipublish.");
  process.exit(0);
}

const queueData = JSON.parse(fs.readFileSync(queuePath, "utf8"));
if (!queueData.queue.length) {
  console.log("Queue habis.");
  process.exit(0);
}

const item = queueData.queue.shift();
const today = new Date().toISOString().split("T")[0];

const title = item.topic;
const slug = item.slug;
const imageName = `${slug}.jpg`;
const imageUrl = `https://source.unsplash.com/1200x800/?${encodeURIComponent(item.topic)}`;

// === ARTIKEL OTOMATIS (900+ HURUF TEMPLATE AMAN SEO)
const content = `
<p>${item.topic} merupakan salah satu topik penting dalam dunia material bangunan modern. 
Penggunaan material yang tepat tidak hanya berpengaruh pada kekuatan bangunan, 
tetapi juga estetika dan kenyamanan jangka panjang.</p>

<p>Dalam praktik konstruksi, pemilihan ${item.category.toLowerCase()} harus mempertimbangkan 
fungsi, lingkungan sekitar, serta kebutuhan desain. Banyak proyek hunian dan komersial 
memanfaatkan material ini karena daya tahannya yang baik serta perawatannya yang relatif mudah.</p>

<p>Salah satu keunggulan utama adalah fleksibilitas penerapannya. Material ini dapat digunakan 
pada berbagai bagian bangunan seperti dinding, fasad, pagar, maupun area eksterior lainnya. 
Selain itu, tampilannya juga dapat disesuaikan dengan konsep arsitektur modern maupun klasik.</p>

<p>Dari sisi teknis, pemasangan yang benar akan memberikan hasil maksimal. 
Pastikan proses instalasi dilakukan oleh tenaga berpengalaman serta menggunakan 
bahan pendukung yang berkualitas agar struktur tetap kokoh dan awet.</p>

<p>Dengan perencanaan yang matang, penggunaan ${item.topic.toLowerCase()} dapat meningkatkan 
nilai estetika sekaligus fungsionalitas bangunan. Hal ini menjadikannya pilihan 
yang tepat untuk berbagai kebutuhan konstruksi saat ini.</p>
`;

// === HTML SLUG
const html = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${title} | Roster Gallery</title>
  <meta name="description" content="${title} untuk kebutuhan konstruksi dan hunian modern.">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="canonical" href="https://adil-10-del.github.io/roster-gallery/blog/${slug}.html">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/blog.css">
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

<footer class="footer">
  © 2025 Roster Gallery. Hak Cipta Dilindungi.
</footer>

</body>
</html>
`;

// === SIMPAN FILE
fs.writeFileSync(path.join(BLOG_DIR, `${slug}.html`), html);

// === SIMPAN GAMBAR (HANYA LINK, TIDAK DOWNLOAD)
if (!fs.existsSync(ASSET_DIR)) fs.mkdirSync(ASSET_DIR, { recursive: true });
fs.writeFileSync(path.join(ASSET_DIR, imageName), "");

// === UPDATE blog.json
let blogIndex = { posts: [] };
if (fs.existsSync(blogIndexPath)) {
  blogIndex = JSON.parse(fs.readFileSync(blogIndexPath, "utf8"));
}

blogIndex.posts.unshift({
  slug,
  title,
  excerpt: title,
  image: `assets/blog/${imageName}`,
  date: today,
  tags: item.tags
});

fs.writeFileSync(blogIndexPath, JSON.stringify(blogIndex, null, 2));

// === UPDATE QUEUE
fs.writeFileSync(queuePath, JSON.stringify(queueData, null, 2));

console.log("Artikel dipublish:", slug);

