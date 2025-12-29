import fs from "fs";

const postsDir = "./blog/posts";
const files = fs.readdirSync(postsDir);
const MAX_ARTICLE_PER_RUN = 2;
const data = files.map(file => {
  return {
    title: file.replace(/-/g, " ").replace(".html", ""),
    url: `/blog/posts/${file}`,
    kategori: "Artikel Produk",
    tanggal: new Date().toISOString().split("T")[0],
    ringkas: "Artikel seputar produk konstruksi Roster Gallery.",
    image: "/assets/images/placeholder.jpg"
  };
});

fs.writeFileSync(
  "./blog/blog-data.json",
  JSON.stringify({ artikel: data }, null, 2)
);

