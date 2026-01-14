/**
 * AUTO ARTICLE GENERATOR + AUTO IMAGE + FULL TEMPLATE
 * FINAL PRODUCTION VERSION
 */

const fs = require("fs");
const https = require("https");
const sharp = require("sharp");

// ================= CONFIG =================
const queuePath = "data/queue.json";
const blogIndexPath = "data/blog.json";

const BLOG_DIR = "blog";
const ASSET_DIR = "assets/blog";

const MAX_PER_RUN = 2;
const today = new Date().toISOString().split("T")[0];

// ================= IMAGE KEYWORDS =================
const IMAGE_KEYWORDS = {
  "Roster Beton": "concrete,roster,architecture",
  "Paving": "paving,block,parking",
  "Bata": "brick,wall,construction",
  "Genteng": "roof,tiles,house",
  "Walpanel": "interior,wall,modern",
  "List Pang": "ornament,building",
  "Tiang": "pillar,column,architecture"
};

// ================= LOAD DATA =================
if (!fs.existsSync(queuePath)) {
  console.log("❌ queue.json tidak ditemukan");
  process.exit(0);
}

const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const blogIndex = fs.existsSync(blogIndexPath)
  ? JSON.parse(fs.readFileSync(blogIndexPath, "utf8"))
  : { posts: [] };

if (!queue.queue.length) {
  console.log("🟡 Queue kosong");
  process.exit(0);
}

// ================= ENSURE DIR =================
fs.mkdirSync(BLOG_DIR, { recursive: true });
fs.mkdirSync(ASSET_DIR, { recursive: true });

// ================= IMAGE DOWNLOAD =================
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode !== 200) {
        reject(new Error("Image download failed"));
        return;
      }

      const transformer = sharp()
        .resize(1200, 630, { fit: "cover" })
        .jpeg({ quality: 80 });

      const stream = fs.createWriteStream(outputPath);
      res.pipe(transformer).pipe(stream);

      stream.on("finish", resolve);
      stream.on("error", reject);
    }).on("error", reject);
  });
}

// ================= MAIN =================
(async () => {
  const publishItems = queue.queue.splice(0, MAX_PER_RUN);

  for (const item of publishItems) {
    const title = item.topic;
    const slug = item.slug;
    const category = item.category;

    const imageName = `${slug}.jpg`;
    const imageLocal = `${ASSET_DIR}/${imageName}`;
    const imageUrl = `https://adil-10-del.github.io/roster-gallery/assets/blog/${imageName}`;

    // ===== IMAGE SOURCE (UNSPLASH RANDOM PER CATEGORY)
    const keywords = IMAGE_KEYWORDS[category] || "building,construction";
    const imageSource = `https://source.unsplash.com/1600x900/?${encodeURIComponent(
      keywords
    )}`;

    try {
      await downloadImage(imageSource, imageLocal);
      console.log("🖼 Image OK:", imageName);
    } catch {
      console.warn("⚠️ Gagal download image, lanjut publish");
    }

    // ===== ARTICLE CONTENT =====
    const content = `
<p><strong>${title}</strong> merupakan salah satu material bangunan yang banyak digunakan pada proyek modern.</p>
<p>Material ini dikenal memiliki daya tahan tinggi, kuat terhadap cuaca, dan mudah diaplikasikan.</p>
<p>Penggunaan ${category.toLowerCase()} sangat cocok untuk rumah tinggal, bangunan komersial, maupun area industri.</p>
<p>Dari sisi biaya, material ini tergolong efisien karena umur pakainya yang panjang.</p>
<p>Tampilannya mampu meningkatkan nilai estetika dan fungsi bangunan secara keseluruhan.</p>
<p>Dengan pemasangan yang tepat, ${title.toLowerCase()} menjadi solusi jangka panjang.</p>
`;

    // ===== SCHEMA =====
    const schema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${title}",
  "image": "${imageUrl}",
  "datePublished": "${today}",
  "dateModified": "${today}",
  "author": {
    "@type": "Organization",
    "name": "Roster Gallery"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Roster Gallery"
  }
}
</script>
`;

    // ===== FULL HTML TEMPLATE =====
    const html = `
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>${title} | Roster Gallery</title>
<meta name="description" content="${title} - solusi material bangunan berkualitas">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="canonical" href="https://adil-10-del.github.io/roster-gallery/blog/${slug}.html">

<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/blog.css">

<meta property="og:title" content="${title}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:type" content="article">

${schema}
</head>

<body>

<header class="header-small">
  <div class="navbar">
    <img src="../assets/images/logo.jpg" class="logo" alt="Roster Gallery">
    <nav>
      <a href="../index.html">Home</a>
      <a href="../katalog.html">Katalog</a>
      <a href="../layanan.html">Layanan</a>
      <a href="../blog.html" class="active">Blog</a>
      <a href="../kontak.html">Kontak</a>
    </nav>
  </div>
</header>

<section class="article-hero">
  <img src="../assets/blog/${imageName}" alt="${title}" loading="lazy">
</section>

<article class="article-container">
  <h1>${title}</h1>

  <div class="article-meta">
    <span>📅 ${today}</span>
    <span>🏷️ ${category}</span>
  </div>

  <div class="article-content">
    ${content}
  </div>

  <div class="article-nav">
    <a href="../blog.html">← Kembali ke Blog</a>
  </div>
  <section class="related-articles">
  <h2>Orang lain juga melihat ini</h2>
  <div id="relatedList" class="related-grid"></div>
</section>
</article>

<footer class="footer-main">
  <div class="footer-container">
    <div class="footer-col">
      <h3>Roster Gallery</h3>
      <p>Produsen material beton berkualitas untuk kebutuhan konstruksi.</p>
    </div>

    <div class="footer-col">
      <h4>Kontak</h4>
      <p>📍 Purwakarta, Jawa Barat</p>
      <p>📞 0838-7279-3673</p>
    </div>

    <div class="footer-col">
      <h4>Menu</h4>
      <a href="../index.html">Home</a>
      <a href="../katalog.html">Katalog</a>
      <a href="../blog.html">Blog</a>
      <a href="../kontak.html">Kontak</a>
    </div>
  </div>

  <div class="footer-bottom">
    © 2025 Roster Gallery — All Rights Reserved.
  </div>
</footer>

<a href="https://wa.me/6283872793673" class="wa-float" target="_blank">
  <img src="../assets/images/whatsapp.jpg" alt="WhatsApp">
</a>
<script>
fetch("../data/blog.json")
  .then(res => res.json())
  .then(data => {
    const currentSlug = location.pathname.split("/").pop().replace(".html", "");
    const currentCategory = document
      .querySelector(".article-meta span:last-child")
      ?.innerText.replace("🏷️","").trim();

    // Pisahkan kategori sama & lainnya
    const sameCategory = data.posts.filter(p =>
      p.slug !== currentSlug && p.category === currentCategory
    );

    const randomOthers = data.posts.filter(p =>
      p.slug !== currentSlug && p.category !== currentCategory
    );

    const combined = [...sameCategory, ...randomOthers].slice(0, 4);

    const relatedHTML = relatedArticles.map(item => `
  <div class="related-card">
    <a href="${item.url}">
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
    </a>
  </div>
`).join("");

    document.getElementById("relatedList").innerHTML = html;
  });
</script>
</body>
</html>
`;

    // ===== SAVE FILE =====
    fs.writeFileSync(`${BLOG_DIR}/${slug}.html`, html);

    blogIndex.posts.unshift({
      slug,
      title,
      date: today,
      category,
      image: `assets/blog/${imageName}`
    });

    console.log("✅ Artikel publish:", slug);
  }

  fs.writeFileSync(blogIndexPath, JSON.stringify(blogIndex, null, 2));
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));

  console.log("🚀 AUTO PUBLISH SELESAI (FINAL)");
})();

