"use client";

import { Expense, Limit } from "@/lib/types";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  expenses: Expense[];
}

const calculateCategoryTotals = (
  expenses: Expense[]
): Record<string, number> => {
  return expenses.reduce((totals, expense) => {
    totals[expense.category] =
      (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {} as Record<string, number>);
};

const BudgetStatus = ({ expenses }: Props) => {
  const [limits, setLimits] = useState<Limit[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // LocalStorage'dan limitleri yükle
  useEffect(() => {
    const storedLimits = localStorage.getItem("expenseLimits");
    if (storedLimits) {
      setLimits(JSON.parse(storedLimits));
    }
  }, []);

  // Geçerli ayın giderlerini filtrele
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  // Kategori bazlı harcamaları hesapla
  const categoryTotals = calculateCategoryTotals(currentMonthExpenses);

  // Limit kontrolü, uyarılar ve tasarruf önerileri
  useEffect(() => {
    const warningCategories = limits
      .filter((limit) => {
        const total = categoryTotals[limit.category] || 0;
        return total >= limit.limit * 0.8 || total > limit.limit; // %80 veya limit aşımı kontrolü
      })
      .map((limit) => limit.category);

    // Only update state if there is a change in warnings
    if (
      warningCategories.length !== warnings.length ||
      !warningCategories.every((cat, index) => cat === warnings[index])
    ) {
      setWarnings(warningCategories);
    }

    const newSuggestions: string[] = [];
    limits.forEach((limit) => {
      const total = categoryTotals[limit.category] || 0;
      if (total > limit.limit) {
        newSuggestions.push(
          `${limit.category} kategorisinde bütçe limitinizi aştınız. Harcamalarınızı gözden geçirin.`
        );
      } else if (total >= limit.limit * 0.8) {
        newSuggestions.push(
          `${limit.category} kategorisinde harcamalarınız limitinize yaklaşıyor. Tasarruf edebilirsiniz.`
        );
      }
    });

    // Only update suggestions if there's a change
    if (
      newSuggestions.length !== suggestions.length ||
      !newSuggestions.every(
        (suggestion, index) => suggestion === suggestions[index]
      )
    ) {
      setSuggestions(newSuggestions);
    }
  }, [limits, categoryTotals, warnings, suggestions]); // Add warnings and suggestions as dependencies to prevent unnecessary re-renders

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="flex flex-col gap-4 p-4 border rounded shadow w-full bg-secondary">
      <h1 className="text-2xl font-bold">Bütçe Durumu</h1>
      <h2 className="text-xl">Bu Ayki Harcamalar</h2>
      <ul className="list-disc pl-6">
        {Object.entries(categoryTotals).map(([category, total]) => (
          <li key={category}>
            <strong>{category}:</strong> {total} TL
          </li>
        ))}
      </ul>
      <div>
        <h2 className="text-xl font-bold text-red-600">Uyarılar</h2>
        {warnings.length > 0 ? (
          <ul className="list-disc pl-6">
            {warnings.map((category, index) => (
              <li key={index} className="text-red-500">
                {`${category} kategorisinde bütçe limitine yaklaşıyorsunuz!`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">Bütçe kontrol altında.</p>
        )}
      </div>

      {/* Tasarruf Önerileri */}
      <div>
        <h2 className="text-xl font-bold text-green-600">
          Tasarruf Önerileri
        </h2>
        {suggestions.length > 0 ? (
          <ul className="list-disc pl-6">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-yellow-500">
                {suggestion}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">
            Tasarruf için belirgin bir alan yok.
          </p>
        )}
      </div>
    </section>
  );
};

export default BudgetStatus;
