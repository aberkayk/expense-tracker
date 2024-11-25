import { getExpenses, getIncome } from "@/actions/income-expense";
import BudgetStatus from "@/components/budget-status";
import LimitForm from "@/components/limit-form";

export default async function Home() {
  const [expenses, income] = await Promise.all([
    getExpenses(),
    getIncome(),
  ]);

  // Sayfa verisi yüklenmeden önce bir loading durumu ekleyebilirsiniz
  if (!expenses || !income)
    return <div className="w-full flex justify-center">Loading...</div>;

  return (
    <section className="flex flex-col items-center w-full gap-10">
      <LimitForm />
      {/* <BudgetStatus expenses={expenses} /> */}
    </section>
  );
}
