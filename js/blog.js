const container = document.getElementById("blog-list");
const select = document.getElementById("category");
let blogData = [];

// URL Sheet CSV publik
const sheetURL = "https://docs.google.com/spreadsheets/d/e/.../pub?output=csv";

// Convert CSV ke JSON
function csvToJson(csv){
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");
  for(let i=1;i<lines.length;i++){
    if(!lines[i]) continue;
    const obj = {};
    const currentline = lines[i].split(",");
    headers.forEach((h,index)=>{
      obj[h.trim()] = currentline[index].trim();
    });
    result.push(obj);
  }
  return result;
}

// Fetch CSV
fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    blogData = csvToJson(csv);
    renderBlog(blogData);
  })
  .catch(err => console.error(err));

function renderBlog(data){
  container.innerHTML = "";
  data.forEach(item=>{
    container.innerHTML += `
      <div class="blog-card">
        <img src="${item['Image URL']}">
        <div class="blog-content">
          <h3>${item['Title']}</h3>
          <p>${item['Description']}</p>
          <a href="blog-detail.html?id=${item['ID']}">Baca Selengkapnya →</a>
        </div>
      </div>
    `;
  });
}

// Filter kategori
select.addEventListener("change", function(){
  const category = this.value;
  if(category === "All"){
    renderBlog(blogData);
  } else {
    renderBlog(blogData.filter(item => item['Category'] === category));
  }
});
