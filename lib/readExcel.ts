import * as XLSX from "xlsx";

export function readExcel(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result;

        const workbook = XLSX.read(data, {
          type: "array",
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rows: any[] = XLSX.utils.sheet_to_json(sheet);

        const squadre = rows
          .map((r) => String(r["NOME SQUADRA"] || "").trim())
          .filter((nome) => nome.length > 0);

        resolve(squadre);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}