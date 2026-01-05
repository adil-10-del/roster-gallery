const fs = require("fs");
const path = require("path");

const queuePath = path.join("data","queue.json");

// ===== SAFE INIT =====
let queue = { queue: [] };
if (fs.existsSync(queuePath)) {
  queue = JSON.parse(fs.readFileSync(queuePath,"utf8"));
}

// ===== LIMIT ANTI SPAM =====
if (queue.queue.length >= 15) {
  console.log("🟡 Queue cukup, tidak refill");
  process.exit(0);
}

// ===== DATA =====
const angles = [
  "Tips","Inspirasi","Kesalahan Umum",
  "Panduan Lengkap","Estimasi Biaya",
  "Keunggulan","Penerapan"
];

const categories = [
  "Roster Beton","Paving","Genteng",
  "Bata","Walpanel","List Pang","Tiang"
];

// ===== RANDOM GENERATOR =====
function random(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

// ===== REFILL (SMART) =====
while (queue.queue.length < 15) {
  const angle = random(angles);
  const category = random(categories);

  const topic = `${angle} ${category} untuk Rumah & Bangunan`;
  const slug = topic.toLowerCase()
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/^-|-$/g,"");

  // ❌ Anti duplikat
  if (queue.queue.find(q=>q.slug===slug)) continue;

  queue.queue.push({
    topic,
    category,
    slug,
    tags:[category.toLowerCase()]
  });
}

// ===== SAVE =====
fs.mkdirSync("data",{recursive:true});
fs.writeFileSync(queuePath, JSON.stringify(queue,null,2));

console.log("✅ Queue siap:", queue.queue.length);

