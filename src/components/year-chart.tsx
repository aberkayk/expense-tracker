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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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

interface YearChartProps {
  expenses: Expense[];
  income: Income[];
}

const YearChart: React.FC<YearChartProps> = ({ expenses, income }) => {
  // Grafik türü state'i
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">(
    "line"
  );
  // Yıl aralığını tutan state
  const [startYear, setStartYear] = useState<number>(
    new Date().getFullYear() - 9
  );
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());

  // Yılları oluştur
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  // Gelir ve gider verilerini yıllara göre grupluyoruz
  const groupedData = years.map((year) => {
    const totalIncome = income
      .filter((item) => new Date(item.date).getFullYear() === year)
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = expenses
      .filter((item) => new Date(item.date).getFullYear() === year)
      .reduce((sum, item) => sum + item.amount, 0);

    return { income: totalIncome, expense: totalExpense };
  });

  // Chart.js verisi
  const chartData = {
    labels: years,
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
    <div className="grid gap-6 h-fit w-full">
      <div className="bg-secondary w-full p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-4">
          Gelir ve Gider Grafiği{" "}
          <span className="text-muted-foreground text-sm">(Yıllık)</span>
        </h2>
        {/* Yıl Aralığı Seçimi */}
        <div className="flex gap-4 mb-4">
          <div>
            <Label className="text-sm font-medium">Başlangıç Yılı</Label>
            <Input
              type="number"
              value={startYear}
              onChange={(e) => setStartYear(Number(e.target.value))}
              className="mt-3 border-primary"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Bitiş Yılı</Label>
            <Input
              type="number"
              value={endYear}
              onChange={(e) => setEndYear(Number(e.target.value))}
              className="mt-3 border-primary"
            />
          </div>
        </div>
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
        <div ref={chartRef}>
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

export default YearChart;
