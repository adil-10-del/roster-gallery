/**
 * AUTO REFILL QUEUE – FIXED VERSION
 */

const fs = require("fs");
const path = require("path");

const queuePath = path.join("data", "queue.json");

// ===== SAFETY INIT =====
let queue = { queue: [] };

// ===== LOAD EXISTING QUEUE =====
if (fs.existsSync(queuePath)) {
  try {
    queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
    if (!queue.queue) queue.queue = [];
  } catch (e) {
    console.error("Queue rusak, reset ulang");
    queue = { queue: [] };
  }
}

// ===== CONFIG =====
const angles = [
  "Tips",
  "Inspirasi",
  "Kesalahan",
  "Perbandingan",
  "Panduan",
  "Estimasi Biaya",
  "Keunggulan",
  "Penerapan"
];

const categories = [
  "Roster Beton",
  "Paving",
  "Genteng",
  "Bata",
  "Walpanel",
  "List Pang",
  "Tiang"
];

// ===== LIMIT BIAR GAK OVERSPAM =====
const MAX_QUEUE = 30;
if (queue.queue.length >= MAX_QUEUE) {
  console.log("🟢 Queue masih cukup:", queue.queue.length);
  process.exit(0);
}

// ===== GENERATE =====
angles.forEach(angle => {
  categories.forEach(category => {
    const topic = `${angle} ${category} untuk Bangunan Modern`;
    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Cegah duplikat
    if (queue.queue.find(q => q.slug === slug)) return;

    queue.queue.push({
      topic,
      category,
      slug,
      tags: [category.toLowerCase().replace(/\s+/g, "-")]
    });
  });
});

// ===== SAVE =====
fs.mkdirSync("data", { recursive: true });
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));

console.log("🚀 Queue berhasil diisi:", queue.queue.length);
