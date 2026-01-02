const fs = require("fs");

const files = fs.readdirSync("blog").filter(f => f.endsWith(".html"));

files.forEach(file => {
  let html = fs.readFileSync(`blog/${file}`, "utf8");
  if (html.includes("cta-wa")) return;

  const cta = `
<div class="cta-wa">
  <h3>Butuh ${file.replace(".html","").replace(/-/g," ")}?</h3>
  <p>Konsultasi GRATIS & harga langsung dari produsen.</p>
  <a href="https://wa.me/6283872793673" target="_blank">
    📲 Chat WhatsApp Sekarang
  </a>
</div>
`;

  html = html.replace("</article>", cta + "\n</article>");
  fs.writeFileSync(`blog/${file}`, html);
});

