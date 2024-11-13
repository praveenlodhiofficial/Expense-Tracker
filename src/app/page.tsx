import ExpensesForm from "@/components/expenses-form";
import { getExpenses } from "@/lib/expenses";

export default async function Home() {
  const expenses = await getExpenses();

  return (
    <section className="py-5">
      <div className="container mx-auto px-4 justify-center items-center">
        <h1 className="font-bold text-3xl text-center">Expenses Tracker</h1>
        <h2 className="text-zinc-500 mt-2 text-center">Using Neon: Serverless Postgres</h2>

        <div className="mt-8 flex items-center justify-between gap-10">
          <div className="grow px-3 py-5 border border-dashed rounded-md tracking-widest border-zinc-300">
            <div className="flex justify-between">
            <h3 className="text-xl font-bold mb-4">Items</h3>
            <h3 className="text-xl font-bold mb-4">Price</h3>
            </div>
            <ul className="flex flex-col">
              {expenses.map((expense) => (
                <li key={expense.id} className="flex p-1 justify-between items-center border-dashed border-b border-t border-slate-200">
                  <span className="text-sm">{expense.title}</span>
                  <span className="text-sm font-semibold text-zinc-700">${expense.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          <ExpensesForm />

        </div>
      </div>
    </section>
  );
}
