export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO format
  type: "income" | "expense";
}

export interface Income extends Expense {}

export type Option = {
  label: string;
  value: any;
  icon?: React.ComponentType<{ className?: string }>;
};

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
  operator?: "like" | "gt" | "gte" | "lt" | "lte" | "in";
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
  type?: "select" | "date";
}
