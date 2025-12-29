import fs from "fs";
import path from "path";

const products = JSON.parse(
  fs.readFileSync("./scripts/data/products.json")
);

const keywords = JSON.parse(
  fs.readFileSync("./scripts/data/keywords.json")
);

const outputDir = "./blog/posts";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

products.forEach(product => {
  const slug = product.keyword.replace(/\s+/g, "-");
  const title = `${product.name} ${random(keywords)}`;

  const content = `
<h1>${title}</h1>
<p>${product.name} adalah salah satu produk unggulan Roster Gallery yang banyak digunakan untuk kebutuhan konstruksi modern.</p>

<h2>Kegunaan ${product.name}</h2>
<p>Produk ini cocok digunakan untuk rumah tinggal, pagar, ventilasi, dan bangunan komersial.</p>

<h2>Keunggulan</h2>
<ul>
  <li>Kuat dan tahan lama</li>
  <li>Desain estetis</li>
  <li>Mudah diaplikasikan</li>
</ul>

<p>Hubungi Roster Gallery untuk pemesanan ${product.keyword}.</p>
`;

  fs.writeFileSync(
    `${outputDir}/${slug}.html`,
    content
  );
});

