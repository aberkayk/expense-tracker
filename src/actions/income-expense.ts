import { IExpense } from "@/lib/types";
import { revalidateTag } from "next/cache";

export const addTransaction = async (transaction: IExpense) => {
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
        next: { tags: ["expense"], revalidate: 0 },
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
        next: { tags: ["income"], revalidate: 0 },
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

// Gider silme fonksiyonu
export const deleteExpense = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/expenses/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete expense");
    }

    revalidateTag("expense");
    return true;
  } catch (error) {
    console.error("Error in deleteExpense:", error);
    throw error;
  }
};

// Gelir silme fonksiyonu
export const deleteIncome = async (id: string) => {
  console.log("DELETE INCOME");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/income/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete income");
    }

    revalidateTag("income");
    return true;
  } catch (error) {
    console.error("Error in deleteIncome:", error);
    throw error;
  }
};
