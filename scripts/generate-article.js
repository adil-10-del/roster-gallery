/**
 * AUTO ARTICLE + IMAGE FINAL VERSION
 * Business Mode Ready
 */

const fs = require("fs");
const https = require("https");
const path = require("path");

// ===== PATH =====
const QUEUE_PATH = "data/queue.json";
const BLOG_INDEX_PATH = "data/blog.json";
const BLOG_DIR = "blog";
const IMAGE_DIR = "assets/blog";

// ===== CONFIG =====
const MAX_PER_RUN = 2;
const TODAY = new Date().toISOString().split("T")[0];

// ===== IMAGE KEYWORDS =====
const IMAGE_KEYWORDS = {
  "Roster Beton": ["concrete roster", "ventilation block", "roster wall"],
  "Paving": ["paving block", "driveway paving", "interlock paving"],
  "Bata": ["brick wall", "red brick house"],
  "Genteng": ["roof tile house", "clay roof"],
  "Walpanel": ["wall panel interior", "modern wall panel"],
  "List Pang": ["building ornament", "house molding"],
  "Tiang": ["concrete column", "pillar architecture"]
};

// ===== LOAD DATA =====
const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
const blogIndex = fs.existsSync(BLOG_INDEX_PATH)
  ? JSON.parse(fs.readFileSync(BLOG_INDEX_PATH, "utf8"))
  : { posts: [] };

if (!queue.queue.length) {
  console.log("🟡 Queue kosong");
  process.exit(0);
}

// ===== ENSURE DIR =====
fs.mkdirSync(BLOG_DIR, { recursive: true });
fs.mkdirSync(IMAGE_DIR, { recursive: true });

// ===== IMAGE DOWNLOAD =====
function downloadImage(keyword, output) {
  const url = `https://source.unsplash.com/1200x900/?${encodeURIComponent(
    keyword + "," + Math.random()
  )}`;

  return new Promise(resolve => {
    const file = fs.createWriteStream(output);
    https.get(url, res => {
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", () => resolve());
  });
}

// ===== MAIN =====
(async () => {
  const publish = queue.queue.splice(0, MAX_PER_RUN);

  for (const item of publish) {
    const slug = item.slug;
    const title = item.topic;
    const category = item.category;

    // ===== IMAGE =====
    const imageName = `${slug}.jpg`;
    const imagePath = path.join(IMAGE_DIR, imageName);

    const keywords =
      IMAGE_KEYWORDS[category] ||
      ["building material", "construction"];

    const randomKeyword =
      keywords[Math.floor(Math.random() * keywords.length)];

    await downloadImage(randomKeyword, imagePath);

    const imageUrl = `/assets/blog/${imageName}`;

    // ===== CONTENT =====
    const paragraphs = `
<p><strong>${title}</strong> menjadi pilihan favorit dalam dunia konstruksi modern karena kekuatan dan nilai estetikanya.</p>
<p>Penggunaan ${category.toLowerCase()} sangat fleksibel, cocok untuk hunian pribadi maupun proyek komersial.</p>
<p>Dari segi desain, material ini mampu memberikan kesan modern sekaligus fungsional.</p>
<p>Selain tahan lama, perawatannya relatif mudah dan tidak memerlukan biaya besar.</p>
<p>Pemilihan ${category.toLowerCase()} yang tepat dapat meningkatkan nilai jual bangunan secara signifikan.</p>
<p>Oleh karena itu, memahami karakteristik material ini sangat penting sebelum digunakan.</p>
`;

    const excerpt = `Panduan lengkap ${category.toLowerCase()} untuk bangunan modern, kuat, estetik, dan bernilai investasi.`;

    // ===== SCHEMA =====
    const schema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${title}",
  "image": "https://adil-10-del.github.io/roster-gallery${imageUrl}",
  "datePublished": "${TODAY}",
  "dateModified": "${TODAY}",
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

    // ===== HTML =====
    const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>${title} | Roster Gallery</title>
<meta name="description" content="${excerpt}">
<link rel="canonical" href="https://adil-10-del.github.io/roster-gallery/blog/${slug}.html">
<meta property="og:title" content="${title}">
<meta property="og:image" content="https://adil-10-del.github.io/roster-gallery${imageUrl}">
<meta property="og:type" content="article">
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/blog.css">
${schema}
</head>

<body>

<section class="article-hero">
  <img src="${imageUrl}" alt="${title}" loading="lazy">
</section>

<section class="article-content">
<h1>${title}</h1>
${paragraphs}
</section>

<a href="../blog.html">← Kembali ke Blog</a>

</body>
</html>`;

    fs.writeFileSync(`${BLOG_DIR}/${slug}.html`, html);

    // ===== BLOG INDEX =====
    blogIndex.posts.unshift({
      slug,
      title,
      category,
      date: TODAY,
      image: imageUrl,
      excerpt
    });

    console.log("✅ Artikel publish:", slug);
  }

  fs.writeFileSync(BLOG_INDEX_PATH, JSON.stringify(blogIndex, null, 2));
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));

  console.log("🚀 AUTO ARTICLE SELESAI");
})();
