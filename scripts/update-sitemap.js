const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const blogDataPath = path.join(ROOT, "data/blog.json");
const sitemapPath = path.join(ROOT, "sitemap.xml");

const SITE_URL = "https://adil-10-del.github.io/roster-gallery";
const today = new Date().toISOString().split("T")[0];

/**
 * HALAMAN STATIS WEBSITE
 */
const staticPages = [
  { path: "/", priority: "1.0" },
  { path: "/index.html", priority: "1.0" },
  { path: "/blog.html", priority: "0.9" },
  { path: "/katalog.html", priority: "0.9" },
  { path: "/layanan.html", priority: "0.8" },
  { path: "/form-kerjasama.html", priority: "0.8" },
  { path: "/priview-surat.html", priority: "0.6" },
  { path: "/kontak.html", priority: "0.8" }
];

let urls = [];

// halaman statis
staticPages.forEach(p => {
  urls.push(`
  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p.priority}</priority>
  </url>`);
});

// artikel blog
if (fs.existsSync(blogDataPath)) {
  const blogData = JSON.parse(fs.readFileSync(blogDataPath, "utf8"));

  blogData.posts.forEach(post => {
    urls.push(`
  <url>
    <loc>${SITE_URL}/blog/${post.slug}.html</loc>
    <lastmod>${post.date || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>
`;

fs.writeFileSync(sitemapPath, xml.trim());
console.log("✅ Sitemap SEO-friendly berhasil dibuat");
