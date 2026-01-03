/**
 * GENERATE ARTICLE – FINAL VERSION
 * Stable | Failsafe | GitHub Actions Ready
 */

const fs = require("fs");
const path = require("path");

/* ================= CONFIG ================= */
const QUEUE_PATH = "data/queue.json";
const BLOG_INDEX_PATH = "data/blog.json";
const BLOG_DIR = "blog";
const BLOG_ASSET_DIR = "assets/blog";
const IMAGE_SOURCE_DIR = "assets/image-source";
const FALLBACK_IMAGE = "fallback.jpg";

const MAX_PER_RUN = 2;
const TODAY = new Date().toISOString().split("T")[0];

/* ================= CATEGORY MAP ================= */
const CATEGORY_MAP = {
  "Roster Beton": "roster",
  "Paving": "paving",
  "Bata": "bata",
  "Genteng": "genteng",
  "Walpanel": "walpanel",
  "List Pang": "list",
  "Tiang": "tiang"
};

/* ================= ENSURE DIR ================= */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/* ================= IMAGE HANDLER (FAILSAFE) ================= */
function ensureImage(slug, category) {
  ensureDir(BLOG_ASSET_DIR);
  ensureDir(IMAGE_SOURCE_DIR);

  const targetImage = path.join(BLOG_ASSET_DIR, `${slug}.jpg`);
  if (fs.existsSync(targetImage)) return `${slug}.jpg`;

  const folder = CATEGORY_MAP[category] || "default";
  const sourceFolder = path.join(IMAGE_SOURCE_DIR, folder);

  let sourceImage = null;

  if (fs.existsSync(sourceFolder)) {
    const images = fs
      .readdirSync(sourceFolder)
      .filter(f => f.endsWith(".jpg"));

    if (images.length) {
      sourceImage = path.join(sourceFolder, images[Math.floor(Math.random() * images.length)]);
    }
  }

  // fallback image
  if (!sourceImage) {
    const fallbackPath = path.join(IMAGE_SOURCE_DIR, FALLBACK_IMAGE);
    if (!fs.existsSync(fallbackPath)) {
      fs.writeFileSync(fallbackPath, "");
    }
    sourceImage = fallbackPath;
  }

  fs.copyFileSync(sourceImage, targetImage);
  return `${slug}.jpg`;
}

/* ================= LOAD QUEUE ================= */
if (!fs.existsSync(QUEUE_PATH)) {
  console.log("❌ Queue tidak ditemukan");
  process.exit(0);
}

const queueData = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
if (!queueData.queue || queueData.queue.length === 0) {
  console.log("ℹ️ Queue kosong");
  process.exit(0);
}

/* ================= LOAD BLOG INDEX ================= */
const blogIndex = fs.existsSync(BLOG_INDEX_PATH)
  ? JSON.parse(fs.readFileSync(BLOG_INDEX_PATH, "utf8"))
  : { posts: [] };

ensureDir(BLOG_DIR);

/* ================= PROCESS ================= */
const publishItems = queueData.queue.splice(0, MAX_PER_RUN);

publishItems.forEach(item => {
  const { topic, slug, category } = item;

  const imageFile = ensureImage(slug, category);

  const content = `
<p><strong>${topic}</strong> merupakan salah satu material bangunan yang banyak digunakan pada proyek modern.</p>
<p>Material ini dikenal kuat, tahan lama, dan memiliki nilai estetika tinggi.</p>
<p>${category} sangat cocok digunakan untuk rumah tinggal, ruko, hingga bangunan komersial.</p>
<p>Selain fungsional, desainnya juga meningkatkan tampilan fasad bangunan.</p>
<p>Dari sisi biaya, material ini termasuk efisien untuk jangka panjang.</p>
<p>${topic} menjadi pilihan tepat untuk konstruksi masa kini.</p>
`;

  const schema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${topic}",
  "image": "https://adil-10-del.github.io/roster-gallery/assets/blog/${imageFile}",
  "datePublished": "${TODAY}",
  "dateModified": "${TODAY}",
  "author": {
    "@type": "Organization",
    "name": "Roster Gallery"
  }
}
</script>
`;

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>${topic} | Roster Gallery</title>
<meta name="description" content="${topic}">
<meta property="og:title" content="${topic}">
<meta property="og:image" content="https://adil-10-del.github.io/roster-gallery/assets/blog/${imageFile}">
<meta property="og:type" content="article">
<link rel="canonical" href="https://adil-10-del.github.io/roster-gallery/blog/${slug}.html">
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/blog.css">
${schema}
</head>

<body>
<section class="article-hero">
  <img src="../assets/blog/${imageFile}" alt="${topic}" loading="lazy">
</section>

<main class="article-content">
${content}
</main>

<a href="../blog.html">← Kembali ke Blog</a>
</body>
</html>`;

  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.html`), html);

  blogIndex.posts.unshift({
    slug,
    title: topic,
    date: TODAY,
    category,
    image: `assets/blog/${imageFile}`
  });

  console.log("✅ Publish:", slug);
});

/* ================= SAVE ================= */
fs.writeFileSync(BLOG_INDEX_PATH, JSON.stringify(blogIndex, null, 2));
fs.writeFileSync(QUEUE_PATH, JSON.stringify(queueData, null, 2));

console.log("🚀 Publish selesai");


