"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const expenseCategories = [
  "Yemek",
  "Kira",
  "Elektrik",
  "Ulaşım",
  "Alışveriş",
  "Sağlık",
  "Eğlence",
  "Sigorta",
];

interface Limit {
  category: string;
  limit: number;
}

export default function LimitForm() {
  const [limits, setLimits] = useState<Limit[]>([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState<number | "">("");

  // LocalStorage'dan mevcut limitleri yükle
  useEffect(() => {
    const storedLimits = localStorage.getItem("expenseLimits");
    if (storedLimits) {
      setLimits(JSON.parse(storedLimits));
    }
  }, []);

  // Yeni limit kaydet
  const handleSave = () => {
    if (!category || !limit) {
      alert("Lütfen bir kategori ve limit belirleyin.");
      return;
    }

    const newLimit: Limit = { category, limit: Number(limit) };
    const updatedLimits = [
      ...limits.filter((item) => item.category !== category),
      newLimit,
    ];

    setLimits(updatedLimits);
    localStorage.setItem("expenseLimits", JSON.stringify(updatedLimits));

    setCategory("");
    setLimit("");
  };

  return (
    <section className="flex flex-col md:flex-row items-center md:items-start w-full gap-10">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <h1 className="text-2xl font-bold">Gider Limiti Belirleme</h1>
        <label className="font-bold">Kategori Seç</label>
        <select
          className="p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Kategori seçin</option>
          {expenseCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label className="font-bold">Limit Belirle</label>
        <input
          className="p-2 border rounded"
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value) || "")}
          placeholder="Limit girin"
        />

        <Button
          className="p-2  rounded hover:bg-blue-600"
          onClick={handleSave}
        >
          Kaydet
        </Button>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold">Belirlenen Limitler </h2>
        <p className="text-xs block text-muted-foreground">
          (Limitler aylık olarak belirlenir ve aşım hesaplaması
          bulunduğumuz aya göre yapılır)
        </p>
        <ul className="list-disc pl-6">
          {limits.map((item, index) => (
            <li key={index}>
              <strong>{item.category}:</strong> {item.limit} TL
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
