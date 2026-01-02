const fs = require("fs");

const queuePath = "data/queue.json";

const TOPICS = [
  { topic: "Roster Beton Minimalis untuk Rumah Modern", category: "Roster Beton" },
  { topic: "Harga Roster Beton per Meter Terbaru", category: "Roster Beton" },
  { topic: "Paving Block Kuat untuk Area Parkir", category: "Paving" },
  { topic: "Bata Merah Berkualitas untuk Bangunan", category: "Bata" },
  { topic: "Genteng Beton Tahan Lama untuk Rumah", category: "Genteng" }
];

let queue = { queue: [] };
if (fs.existsSync(queuePath)) {
  queue = JSON.parse(fs.readFileSync(queuePath));
}

if (queue.queue.length >= 10) process.exit(0);

TOPICS.forEach(item => {
  const slug = item.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  queue.queue.push({
    topic: item.topic,
    slug,
    category: item.category,
    tags: slug.split("-")
  });
});

fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
console.log("✅ Queue terisi");
