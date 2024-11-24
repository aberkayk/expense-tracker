import { getExpenses, getIncome } from "@/actions/income-expense";
import MainChart from "@/components/main-chart";

export default async function Home() {
  // Gelir ve gider verilerini paralel şekilde alıyoruz
  const [expenses, income] = await Promise.all([
    getExpenses(),
    getIncome(),
  ]);

  return (
    <section>
      <MainChart expenses={expenses} income={income} />
    </section>
  );
}
