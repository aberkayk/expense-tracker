"use client";
import React, { useState, useRef } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Income } from "@/lib/types";
import { Button } from "./ui/button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { months } from "@/lib/constants";

// Chart.js'yi kayıt ediyoruz
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);

interface Expense {
  amount: number;
  date: string;
}

interface MonthChartProps {
  expenses: Expense[];
  income: Income[];
}

const MonthChart: React.FC<MonthChartProps> = ({ expenses, income }) => {
  // Grafik türü state'i
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">(
    "line"
  );

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
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "green",
        borderWidth: 1,
        tension: 0.4,
      },
      {
        label: "Gider",
        data: groupedData.map((data) => data.expense),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "red",
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  // Pasta grafiği için sadece toplam gelir ve gider
  const totalIncome = groupedData.reduce(
    (sum, data) => sum + data.income,
    0
  );
  const totalExpense = groupedData.reduce(
    (sum, data) => sum + data.expense,
    0
  );

  const pieData = {
    labels: ["Gelir", "Gider"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["green", "red"],
        borderColor: ["white", "white"],
        borderWidth: 1,
      },
    ],
  };

  // Reference to the chart container
  const chartRef = useRef<HTMLDivElement | null>(null);

  // Function to export the chart as PDF
  const exportToPDF = () => {
    if (chartRef.current) {
      // Use html2canvas to capture the chart
      html2canvas(chartRef.current).then((canvas) => {
        // Create a PDF using jsPDF
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");

        // Add the image (chart) to the PDF
        pdf.addImage(imgData, "PNG", 10, 10, 180, 160);
        pdf.save("chart.pdf");
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 h-fit w-full">
      <div className="bg-secondary w-full p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-4">
          Gelir ve Gider Grafiği{" "}
          <span className="text-muted-foreground text-sm">(Aylık)</span>
        </h2>
        {/* Grafik Türü Seçimi */}
        <div className="flex gap-4 mb-4">
          <Button
            variant={chartType === "line" ? "green" : "default"}
            onClick={() => setChartType("line")}
          >
            Çizgi Grafik
          </Button>
          <Button
            variant={chartType === "bar" ? "green" : "default"}
            onClick={() => setChartType("bar")}
          >
            Çubuk Grafik
          </Button>
          <Button
            variant={chartType === "pie" ? "green" : "default"}
            onClick={() => setChartType("pie")}
          >
            Pasta Grafik
          </Button>
        </div>
        {/* Seçilen Grafiği Göster */}
        <div className="w-full" ref={chartRef}>
          {chartType === "line" && <Line data={chartData} />}
          {chartType === "bar" && <Bar data={chartData} />}
          {chartType === "pie" && <Pie data={pieData} />}
        </div>
        {/* Download PDF Button */}
        <Button onClick={exportToPDF} className="mt-4">
          PDF İndir
        </Button>
      </div>
    </div>
  );
};

export default MonthChart;
