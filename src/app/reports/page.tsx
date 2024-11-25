import { getExpenses, getIncome } from "@/actions/income-expense";
import BudgetStatus from "@/components/budget-status";
import MonthChart from "@/components/month-chart";
import YearChart from "@/components/year-chart";
import React from "react";

const Reports = async () => {
  const [expenses, income] = await Promise.all([
    getExpenses(),
    getIncome(),
  ]);

  if (!expenses || !income)
    return <div className="w-full flex justify-center">Loading...</div>;

  return (
    <div className="w-full space-y-6">
      <BudgetStatus expenses={expenses} />
      <MonthChart expenses={expenses} income={income} />
      <YearChart expenses={expenses} income={income} />
    </div>
  );
};

export default Reports;
