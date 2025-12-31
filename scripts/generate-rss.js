const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const blogPath = path.join(ROOT, "data/blog.json");
const rssPath = path.join(ROOT, "rss.xml");

const SITE_URL = "https://adil-10-del.github.io/roster-gallery";
const SITE_TITLE = "Roster Gallery Blog";
const SITE_DESC = "Artikel dan edukasi material bangunan: roster beton, paving block, genteng, bata, dan tips konstruksi.";

if (!fs.existsSync(blogPath)) {
  console.log("blog.json belum ada");
  process.exit(0);
}

const blog = JSON.parse(fs.readFileSync(blogPath, "utf8"));

const items = blog.posts.slice(0, 20).map(post => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${SITE_URL}/blog/${post.slug}.html</link>
    <guid>${SITE_URL}/blog/${post.slug}.html</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description><![CDATA[${post.excerpt}]]></description>
  </item>
`).join("");

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${SITE_TITLE}</title>
  <link>${SITE_URL}</link>
  <description>${SITE_DESC}</description>
  <language>id-ID</language>
  ${items}
</channel>
</rss>
`;

fs.writeFileSync(rssPath, rss.trim());
console.log("RSS feed dibuat");
