const fs = require("fs");
const path = "blog";

fs.readdirSync(path).forEach(file => {
  if (!file.endsWith(".html")) return;

  let html = fs.readFileSync(`${path}/${file}`, "utf8");
  if (html.includes("cta-wa")) return;

  const cta = `
<section class="cta-wa">
  <h3>Butuh ${file.replace(".html","").replace(/-/g," ")}?</h3>
  <p>Konsultasi gratis & harga terbaik langsung via WhatsApp</p>
  <a href="https://wa.me/6283872793673" target="_blank">
    💬 Chat WhatsApp Sekarang
  </a>
</section>
`;

  html = html.replace("</article>", `${cta}</article>`);
  fs.writeFileSync(`${path}/${file}`, html);
});
