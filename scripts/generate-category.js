import fs from "fs";

const categories = JSON.parse(
  fs.readFileSync("./scripts/data/categories.json")
);

const dir = "./blog/category";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

categories.forEach(cat => {
  const html = `
<!DOCTYPE html>
<html lang="id">
<head>
  <title>${cat.name} | Blog Roster Gallery</title>
  <meta name="description" content="Artikel seputar ${cat.name} terbaru dari Roster Gallery">
</head>
<body>
  <h1>${cat.name}</h1>
  <div id="artikel-list"></div>
  <script src="/blog/blog.js"></script>
</body>
</html>
`;
  fs.writeFileSync(`${dir}/${cat.slug}.html`, html);
});
