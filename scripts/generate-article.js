/**
 * AUTO ARTICLE GENERATOR + IMAGE LEVEL 2
 * Author: Roster Gallery Automation
 */

const fs = require("fs");
const https = require("https");
const sharp = require("sharp");

// ===== PATH CONFIG =====
const queuePath = "data/queue.json";
const blogIndexPath = "data/blog.json";
const BLOG_DIR = "blog";
const ASSET_DIR = "assets/blog";

// ===== LIMIT =====
const MAX_PER_RUN = 2;
const today = new Date().toISOString().split("T")[0];

// ===== IMAGE KEYWORDS =====
const IMAGE_KEYWORDS = {
  "Roster Beton": "concrete,roster,architecture",
  "Paving": "paving,block,road",
  "Bata": "brick,wall,construction",
  "Genteng": "roof,tiles,house",
  "Walpanel": "wall,interior,modern",
  "List Pang": "ornament,building",
  "Tiang": "pillar,column,architecture"
};

// ===== LOAD DATA =====
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));

const blogIndex = fs.existsSync(blogIndexPath)
  ? JSON.parse(fs.readFileSync(blogIndexPath, "utf8"))
  : { posts: [] };

if (!queue.queue.length) {
  console.log("🟡 Queue kosong, tidak ada artikel dibuat");
  process.exit(0);
}

// ===== ENSURE DIR =====
fs.mkdirSync(BLOG_DIR, { recursive: true });
fs.mkdirSync(ASSET_DIR, { recursive: true });

// ===== IMAGE DOWNLOADER =====
function downloadAndResizeImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        if (res.statusCode !== 200) {
          return reject(new Error("Image download failed"));
        }

        const transformer = sharp()
          .resize(1200, 630, { fit: "cover" })
          .jpeg({ quality: 80 });

        const fileStream = fs.createWriteStream(outputPath);
        res.pipe(transformer).pipe(fileStream);

        fileStream.on("finish", resolve);
        fileStream.on("error", reject);
      })
      .on("error", reject);
  });
}

// ===== MAIN PROCESS =====
(async () => {
  const publishItems = queue.queue.splice(0, MAX_PER_RUN);

  for (const item of publishItems) {
    const title = item.topic;
    const slug = item.slug;
    const imageName = `${slug}.jpg`;
    const localImagePath = `${ASSET_DIR}/${imageName}`;

    // ===== IMAGE SOURCE =====
    const keywords =
      IMAGE_KEYWORDS[item.category] || "building,construction";

    const unsplashUrl = `https://source.unsplash.com/1600x900/?${encodeURIComponent(
      keywords
    )}`;

    try {
      await downloadAndResizeImage(unsplashUrl, localImagePath);
      console.log("🖼 Image saved:", imageName);
    } catch (err) {
      console.warn("⚠️ Image failed, article continues:", err.message);
    }

    const imageUrl = `https://adil-10-del.github.io/roster-gallery/assets/blog/${imageName}`;

    // ===== CONTENT =====
    const content = `
<p><strong>${title}</strong> merupakan salah satu solusi material bangunan yang banyak digunakan pada proyek modern.</p>
<p>Material ini dikenal kuat, tahan lama, serta mudah diaplikasikan.</p>
<p>Penggunaan ${item.category.toLowerCase()} sangat cocok untuk rumah tinggal maupun bangunan komersial.</p>
<p>Dari sisi biaya, material ini relatif efisien karena umur pakainya panjang.</p>
<p>Tampilan modernnya mampu meningkatkan nilai estetika bangunan.</p>
<p>Dengan perawatan minimal, ${title.toLowerCase()} menjadi investasi jangka panjang.</p>
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
  }
}
</script>
`;

    // ===== HTML =====
    const html = `
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>${title} | Roster Gallery</title>
<meta name="description" content="${title}">
<meta property="og:title" content="${title}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:type" content="article">
<link rel="canonical" href="https://adil-10-del.github.io/roster-gallery/blog/${slug}.html">
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/blog.css">
${schema}
</head>

<body>
<section class="article-hero">
  <img src="${imageUrl}" alt="${title}" loading="lazy">
</section>

<div class="article-content">
${content}
</div>

<a href="../blog.html">← Kembali ke Blog</a>
</body>
</html>
`;

    // ===== SAVE FILE =====
    fs.writeFileSync(`${BLOG_DIR}/${slug}.html`, html);

    blogIndex.posts.unshift({
      slug,
      title,
      date: today,
      image: `assets/blog/${imageName}`
    });

    console.log("✅ Publish:", slug);
  }

  // ===== SAVE DATA =====
  fs.writeFileSync(blogIndexPath, JSON.stringify(blogIndex, null, 2));
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));

  console.log("🚀 Auto publish selesai");
})();

