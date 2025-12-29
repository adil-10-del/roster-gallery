function exportExcel() {
  const table = document.getElementById("dataTable");
  let csv = [];

  for (let row of table.rows) {
    let cols = Array.from(row.cells).map(td => `"${td.innerText}"`);
    csv.push(cols.join(","));
  }

  const blob = new Blob([csv.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data-kerjasama.csv";
  a.click();
}
