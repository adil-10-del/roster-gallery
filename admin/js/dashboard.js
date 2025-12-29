const sheetURL = "PASTE_CSV_URL_GOOGLE_SHEET";

fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    const tbody = document.querySelector("#dataTable tbody");

    rows.forEach(row => {
      const col = row.split(",");
      if (col.length > 3) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${col[0]}</td>
          <td>${col[1]}</td>
          <td>${col[2]}</td>
          <td>${col[5]}</td>
          <td><a href="https://wa.me/6283872793673" target="_blank">Chat</a></td>
        `;
        tbody.appendChild(tr);
      }
    });
  });

// Search
document.getElementById("search").addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();
  document.querySelectorAll("#dataTable tbody tr").forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(keyword) ? "" : "none";
  });
});
