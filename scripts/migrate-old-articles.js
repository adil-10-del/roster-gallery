/**
 * AUTO MIGRATE OLD ARTICLES
 * Inject header, footer, wrapper, floating WA
 * Author: Roster Gallery Automation
 */

const fs = require("fs");
const path = require("path");

const BLOG_DIR = path.join(__dirname, "../blog");

const HEADER = `
<header class="header-small">
  <div class="navbar">
    <img src="../assets/images/logo.jpg" class="logo" alt="Roster Gallery">
    <nav>
      <a href="../index.html">Home</a>
      <a href="../katalog.html">Katalog</a>
      <a href="../blog.html" class="active">Blog</a>
      <a href="../kontak.html">Kontak</a>
    </nav>
  </div>
</header>
`;

const FOOTER = `
<footer class="footer-main">
  <p>© ${new Date().getFullYear()} Roster Gallery. All rights reserved.</p>
</footer>
`;

const FLOATING_WA = `
<a href="https://wa.me/6283872793673" class="wa-float" target="_blank">
  <img src="../assets/images/whatsapp.jpg" alt="WhatsApp">
</a>
`;

function migrateFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");

  // skip jika sudah migrate
  if (html.includes("header-small") && html.includes("wa-float")) {
    console.log("⏭ Skip:", path.basename(filePath));
    return;
  }

  // pastikan css ada
  if (!html.includes("blog.css")) {
    html = html.replace(
      "</head>",
      `<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/blog.css">
</head>`
    );
  }

  // bungkus konten body
  html = html.replace(
    /<body[^>]*>/i,
    `<body>
${HEADER}
`
  );

  html = html.replace(
    "</body>",
    `
${FLOATING_WA}
${FOOTER}
</body>`
  );

  fs.writeFileSync(filePath, html, "utf8");
  console.log("✅ Migrated:", path.basename(filePath));
}

// RUN
fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith(".html"))
  .forEach(file => migrateFile(path.join(BLOG_DIR, file)));

console.log("🚀 MIGRATION SELESAI — SEMUA ARTIKEL LAMA SUDAH RAPI");
