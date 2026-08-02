"use client";

type Props = {
  onFileSelect: (file: File) => void;
};

export default function UploadExcel({ onFileSelect }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    onFileSelect(file);
  }

  return (
    <label className="cursor-pointer rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black hover:bg-yellow-400 transition">
      📄 Carica Excel
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
}