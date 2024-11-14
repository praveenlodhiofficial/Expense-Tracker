import ExpensesForm from "@/components/expense-tracker/expenses-form";
import { getExpenses } from "@/lib/expense-tracker/expenses";

export default async function ExpenceTracker() {
  const expenses = await getExpenses();

  return (
    <section className="py-5 tracking-wider uppercase">
      <div className="container mx-auto px-4 justify-center items-center">

        {/* Title */}
        <div className="text-center">
          <h1 className="font-bold text-3xl text-center underline-offset-8 underline">Expenses Tracker</h1>
          <h2 className="text-zinc-800 font-semibold mt-2 text-center text-xs">Using Neon: Serverless Postgres</h2>
        </div>

        {/* Content */}
        <div className="mt-8 flex-wrap-reverse flex items-end justify-center gap-10">

          {/* Items & Prices */}
          <div className="grow px-3 py-3 border border-dashed rounded-md border-zinc-400">
            <div className="flex justify-between uppercase text-lg">
              <h3 className="font-bold mb-4">Items</h3>
              <h3 className="font-bold mb-4">Quantity</h3>
              <h3 className="font-bold mb-4">Prices</h3>
            </div>
            <ul className="flex flex-col">
              {expenses.map((expense) => (
                <li key={expense.id} className="flex p-1 justify-between items-center border-dashed border-t border-slate-300">
                  <span className="text-sm w-28">{expense.title}</span>
                  <span className="text-sm w-20">{expense.quantity}</span>
                  <span className="text-sm font-semibold text-zinc-700 w-20 text-end">${expense.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <ExpensesForm />

        </div>
      </div>
    </section>
  );
}
