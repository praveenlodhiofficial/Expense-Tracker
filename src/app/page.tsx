import { getExpenses } from "@/lib/expenses";
import Image from "next/image";

// Define the Expense type
type Expense = {
  id: number;
  title: string;
  amount: number;
};

export default async function Home() {
  const expenses = await getExpenses();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h1 className="font-bold text-3xl">Expenses Tracker</h1>
        <h2 className="text-zinc-500 mt-2">Using Neon: Serverless Postgres</h2>

        <div className="mt-8 flex items-center justify-between gap-10">
          <div className="grow">
            <div className="text-xl font-bold mb-4">Items</div>
            <ul className="flex flex-col gap-3">
              {expenses.map((expense) => (
                <li key={Number(expense.id)} className="flex justify-between items-center">
                  <span className="text-lg">{expense.title}</span>
                  <span className="text-lg font-semibold text-zinc-700">${expense.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
