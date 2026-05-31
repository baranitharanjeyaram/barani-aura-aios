export function exportToCSV(data: any[], filename: string) {
  if (!data || !data.length) return;
  
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(row => 
    Object.values(row).map(val => {
      // Escape commas and double quotes
      let str = String(val).replace(/"/g, '""');
      if (str.includes(",") || str.includes("\n") || str.includes("\r")) {
        str = `"${str}"`;
      }
      return str;
    }).join(",")
  );
  
  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers, ...rows].join("\r\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function triggerPrint() {
  if (typeof window !== "undefined") {
    window.print();
  }
}
