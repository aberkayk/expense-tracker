import { getExpenses, getIncome } from "@/actions/income-expense";
import ExpenseForm from "@/components/expense-form";
import React from "react";
import Client from "./components/client";

const IncomeExpense = async () => {
  const [expenses, income] = await Promise.all([
    getExpenses(),
    getIncome(),
  ]);

  return (
    <div className="flex flex-col gap-12">
      <ExpenseForm />
      <Client data={income} isExpense={false} />
      <Client data={expenses} isExpense />
    </div>
  );
};

export default IncomeExpense;
