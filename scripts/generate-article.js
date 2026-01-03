const fs = require("fs");

const queuePath = "data/queue.json";
const blogIndexPath = "data/blog.json";
const BLOG_DIR = "blog";
const ASSET_DIR = "assets/blog";

const MAX_PER_RUN = 2;
const today = new Date().toISOString().split("T")[0];

// ===== LOAD DATA =====
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));

const blogIndex = fs.existsSync(blogIndexPath)
  ? JSON.parse(fs.readFileSync(blogIndexPath, "utf8"))
  : { posts: [] };

if (!queue.queue.length) {
  console.log("Queue kosong");
  process.exit(0);
}

// ===== ENSURE DIR =====
fs.mkdirSync(BLOG_DIR, { recursive: true });
fs.mkdirSync(ASSET_DIR, { recursive: true });

// ===== HELPER =====
function getRandomImage(folder) {
  const dir = `assets/image-source/${folder}`;
  if (!fs.existsSync(dir)) return "default/1.jpg";

  const files = fs.readdirSync(dir).filter(f => f.endsWith(".jpg"));
  if (!files.length) return "default/1.jpg";

  return `${folder}/${files[Math.floor(Math.random() * files.length)]}`;
}

const CATEGORY_MAP = {
  "Roster Beton": "roster",
  "Paving": "paving",
  "Bata": "bata",
  "Genteng": "genteng",
  "Walpanel": "walpanel",
  "List Pang": "list",
  "Tiang": "tiang"
};

// ===== PROCESS QUEUE =====
const publishItems = queue.queue.splice(0, MAX_PER_RUN);

publishItems.forEach(item => {
  const title = item.topic;
  const slug = item.slug;
  const imageName = `${slug}.jpg`;

  const folder = CATEGORY_MAP[item.category] || "default";
  const sourceImage = getRandomImage(folder);

  const content = `
<p>${title} merupakan salah satu solusi material bangunan yang banyak digunakan pada proyek modern.</p>
<p>Material ini dikenal kuat, tahan lama, serta mudah diaplikasikan.</p>
<p>Penggunaan ${item.category.toLowerCase()} cocok untuk rumah dan bangunan komersial.</p>
<p>Dari sisi biaya, material ini efisien karena umur pakainya panjang.</p>
<p>Tampilan modernnya meningkatkan nilai estetika bangunan.</p>
<p>${title.toLowerCase()} adalah investasi jangka panjang.</p>
`;

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
  }
}
</script>
`;

  const html = `
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>${title} | Roster Gallery</title>
<meta name="description" content="${title}">
<meta property="og:title" content="${title}">
<meta property="og:image" content="https://adil-10-del.github.io/roster-gallery/assets/blog/${imageName}">
<meta property="og:type" content="article">
<link rel="canonical" href="https://adil-10-del.github.io/roster-gallery/blog/${slug}.html">
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/blog.css">
${schema}
</head>

<body>
<section class="article-hero">
  <img src="../assets/blog/${imageName}" alt="${title}" loading="lazy">
</section>

<div class="article-content">
${content}
</div>

<a href="../blog.html">← Kembali ke Blog</a>
</body>
</html>
`;

  // write html
  fs.writeFileSync(`${BLOG_DIR}/${slug}.html`, html);

  // copy image
  fs.copyFileSync(
    `assets/image-source/${sourceImage}`,
    `${ASSET_DIR}/${imageName}`
  );

  // update index
  blogIndex.posts.unshift({
    slug,
    title,
    date: today,
    image: `assets/blog/${imageName}`
  });

  console.log("✅ Publish:", slug);
});

// ===== SAVE =====
fs.writeFileSync(blogIndexPath, JSON.stringify(blogIndex, null, 2));
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
