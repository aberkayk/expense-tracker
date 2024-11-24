import { revalidateTag } from "next/cache";

interface Expense {
  description: string;
  amount: number;
  date: string; // ISO format
  type: "income" | "expense";
}

export const addTransaction = async (transaction: Expense) => {
  try {
    const endpoint = transaction.type === "income" ? "income" : "expenses";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add ${transaction.type}`);
    }

    // İlgili tüm tag'leri revalidate et
    revalidateTag("income");
    revalidateTag("expense");

    const newTransaction = await response.json();
    return newTransaction;
  } catch (error) {
    console.error("Error in addTransaction:", error);
    throw error;
  }
};

export const getExpenses = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/expenses`,
      {
        method: "GET",
        next: { tags: ["expense"] },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch expenses");
    }

    const expenses = await response.json();
    return expenses;
  } catch (error) {
    console.error("Error in getExpenses:", error);
    throw error;
  }
};

export const getIncome = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/income`,
      {
        method: "GET",
        next: { tags: ["income"] },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch income");
    }

    const income = await response.json();
    return income;
  } catch (error) {
    console.error("Error in getIncome:", error);
    throw error;
  }
};
