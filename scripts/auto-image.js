import fs from "fs";
import fetch from "node-fetch";

const UNSPLASH = "https://source.unsplash.com/800x800/?";

export async function downloadImage(keyword, slug){
  const res = await fetch(`${UNSPLASH}${encodeURIComponent(keyword)}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(`assets/blog/${slug}.jpg`, Buffer.from(buffer));
}
