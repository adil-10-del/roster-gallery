const fs = require("fs");
const path = require("path");

const queuePath = path.join("data", "queue.json");

const TOPICS = [
  { topic: "Roster Beton Minimalis untuk Rumah Modern", category: "Roster Beton" },
  { topic: "Keunggulan Paving Block untuk Area Parkir", category: "Paving" },
  { topic: "Genteng Beton Kuat dan Tahan Lama", category: "Genteng" },
  { topic: "Bata Merah Berkualitas untuk Konstruksi", category: "Bata" },
  { topic: "Walpanel Beton untuk Dinding Modern", category: "Walpanel" },
  { topic: "List Pang Beton untuk Finishing Bangunan", category: "List Pang" },
  { topic: "Tiang Beton Kokoh untuk Bangunan", category: "Tiang" }
];

let queue = { queue: [] };
if (fs.existsSync(queuePath)) {
  queue = JSON.parse(fs.readFileSync(queuePath));
}

if (queue.queue.length >= 5) {
  console.log("Queue masih cukup.");
  process.exit(0);
}

TOPICS.forEach(item => {
  const slug = item.topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  queue.queue.push({
    topic: item.topic,
    slug,
    category: item.category,
    tags: slug.split("-")
  });
});

fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
console.log("✅ Queue diisi otomatis");
