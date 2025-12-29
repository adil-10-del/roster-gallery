import fs from "fs";

const baseUrl = "https://adil-10-del.github.io/roster-gallery";

let urls = [
  "/",
  "/katalog.html",
  "/blog/"
];

const posts = fs.readdirSync("./blog/posts");
posts.forEach(p => {
  urls.push(`/blog/posts/${p}`);
});

const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `
  <url>
    <loc>${baseUrl}${u}</loc>
  </url>
`).join("")}
</urlset>
`;

fs.writeFileSync("./sitemap.xml", sitemap.trim());
