const fs = require("fs");

const blog = JSON.parse(fs.readFileSync("data/blog.json"));
let rss = `<?xml version="1.0"?>
<rss version="2.0"><channel>
<title>Roster Gallery Blog</title>
<link>https://adil-10-del.github.io/roster-gallery/</link>
`;

blog.posts.forEach(p => {
  rss += `
  <item>
    <title>${p.title}</title>
    <link>https://adil-10-del.github.io/roster-gallery/blog/${p.slug}.html</link>
    <pubDate>${p.date}</pubDate>
  </item>`;
});

rss += "</channel></rss>";
fs.writeFileSync("rss.xml", rss);
console.log("✅ RSS updated");

