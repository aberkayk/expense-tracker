"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Expense, Income } from "@/lib/types";
import { months } from "@/lib/constants";

// Chart.js'yi kayıt ediyoruz
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

interface MainChartProps {
  expenses: Expense[];
  income: Income[];
}

const MainChart: React.FC<MainChartProps> = ({ expenses, income }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Gelir ve gider verilerini aylara göre grupluyoruz
  const groupedData = months.map((_, index) => {
    const totalIncome = income
      .filter((item) => new Date(item.date).getMonth() === index)
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = expenses
      .filter((item) => new Date(item.date).getMonth() === index)
      .reduce((sum, item) => sum + item.amount, 0);

    return { income: totalIncome, expense: totalExpense };
  });

  // Chart.js verisi
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Gelir",
        data: groupedData.map((data) => data.income),
        borderColor: "green",
        tension: 0.4,
      },
      {
        label: "Gider",
        data: groupedData.map((data) => data.expense),
        borderColor: "red",
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="grid gap-6 h-fit w-full">
      <div className="bg-secondary w-full p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold">Gelir ve Gider Grafiği</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default MainChart;
