const angles = [
 "Tips","Inspirasi","Kesalahan","Perbandingan",
 "Panduan","Estimasi Biaya","Keunggulan","Penerapan"
];

const categories = ["Roster Beton","Paving","Genteng","Bata","Walpanel","List Pang","Tiang"];

angles.forEach(a=>{
 categories.forEach(c=>{
   const topic = `${a} ${c} untuk Bangunan Modern`;
   queue.queue.push({
     topic,
     category:c,
     slug: topic.toLowerCase().replace(/[^a-z0-9]+/g,"-"),
     tags:[c.toLowerCase()]
   });
 });
});
