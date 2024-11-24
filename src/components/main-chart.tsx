"use client";
import React from "react";
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

interface Expense {
  amount: number;
  date: string;
}

interface MainChartProps {
  expenses: Expense[];
  income: Expense[];
}

const MainChart: React.FC<MainChartProps> = ({ expenses, income }) => {
  // Tüm ayları tanımlıyoruz
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

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

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold">Gelir ve Gider Grafiği</h2>
        <Line data={chartData} />
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold">Bütçe Durumu</h2>
        <p>Bütçenizi verimli yönetmek için harcamalarınızı takip edin.</p>
      </div>
    </div>
  );
};

export default MainChart;
