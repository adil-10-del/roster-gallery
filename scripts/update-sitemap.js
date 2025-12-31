const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const blogDataPath = path.join(ROOT, "data/blog.json");
const sitemapPath = path.join(ROOT, "sitemap.xml");

const SITE_URL = "https://adil-10-del.github.io/roster-gallery";

/**
 * HALAMAN STATIS WEBSITE
 * (WAJIB SESUAI STRUKTUR ASLI)
 */
const staticPages = [
  "/",
  "/index.html",
  "/blog.html",
  "/katalog.html",
  "/layanan.html",
  "/form-kerjasama.html",
  "/priview-surat.html",
  "/kontak.html"
];

let urls = staticPages.map(p => `${SITE_URL}${p}`);

if (fs.existsSync(blogDataPath)) {
  const blogData = JSON.parse(fs.readFileSync(blogDataPath, "utf8"));
  blogData.posts.forEach(post => {
    urls.push(`${SITE_URL}/blog/${post.slug}.html`);
  });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join("")}
</urlset>
`;

fs.writeFileSync(sitemapPath, xml.trim());
console.log("Sitemap lengkap berhasil dibuat");
