export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO format
  type: "income" | "expense";
}

export interface Income extends Expense {}
