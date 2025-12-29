import fs from "fs";
import path from "path";

const MAX_ARTICLE_PER_RUN = 5; // ganti 3–5 sesuai mau

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

const mainPrompt = fs.readFileSync("./scripts/ai/prompt-main.txt", "utf8");
const variants = [
  "prompt-variasi-a.txt",
  "prompt-variasi-b.txt",
  "prompt-variasi-c.txt"
];

const randomVariant =
  variants[Math.floor(Math.random() * variants.length)];

const variantPrompt = fs.readFileSync(`./scripts/ai/${randomVariant}`, "utf8");

const finalPrompt = mainPrompt + "\n\n" + variantPrompt;


<p>Hubungi Roster Gallery untuk pemesanan ${product.keyword}.</p>
`;

  fs.writeFileSync(
    `${outputDir}/${slug}.html`,
    content
  );
});

for (let i = 0; i < MAX_ARTICLE_PER_RUN; i++) {
  generateArticle();
}
