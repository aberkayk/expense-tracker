"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { addTransaction } from "../actions/income-expense"; // actions'dan import

interface Expense {
  description: string;
  amount: number;
  date: string; // ISO format
  type: "income" | "expense";
}

export default function ExpenseForm() {
  const [formData, setFormData] = useState<Expense>({
    description: "",
    amount: 0,
    date: "",
    type: "income",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleTypeChange = (value: "income" | "expense") => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addTransaction(formData); // actions içindeki fonksiyonu çağır
      setSuccess(true);
      setFormData({
        description: "",
        amount: 0,
        date: "",
        type: "income",
      });
    } catch (err: any) {
      setError(err.message || "Failed to save expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="font-bold" htmlFor="type">
            Tür
          </Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              handleTypeChange(value as "income" | "expense")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Gelir</SelectItem>
              <SelectItem value="expense">Gider</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold" htmlFor="description">
            Açıklama
          </Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold" htmlFor="amount">
            Miktar
          </Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold" htmlFor="date">
            Tarih
          </Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          className="max-w-lg w-full self-center"
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Ekle"}
        </Button>
        {success && <p className="text-green-500">Başarıyla eklendi!</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
}
