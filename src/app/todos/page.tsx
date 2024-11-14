import TodoForm from "@/components/todo-form/todo-form";
import { getTodos } from "@/lib/todos/todos";
import Link from "next/link";

export default async function Todos() {
    const todos = await getTodos();

    return (
        <section className="py-5 tracking-wider">
            <div className="container mx-auto px-4 justify-center items-center">

                {/* Title */}
                <div className="text-center uppercase">
                    <h1 className="font-bold text-3xl text-center underline-offset-8 underline">Todos Tracker</h1>
                    <Link href='/' className="text-zinc-800 font-semibold mt-2 text-center text-[10px] ">Using Neon: Serverless Postgres</Link>
                </div>

                {/* Content */}
                <div className="mt-8 flex-wrap-reverse flex items-end justify-center gap-10">

                    {/* Items & Prices */}
                    <div className="grow px-3 py-3 border-t border-dashed rounded-md border-zinc-400 w-3/5">
                        <ul>
                            {todos.map((todo) => {
                                return (
                                    <li key={todo.id} className="flex flex-col border-b py-3">
                                        <div className="flex items-center justify-between uppercase">
                                            <span className="text-2xl font-bold">{todo.title}</span>
                                            <div className="flex flex-col justify-between font-semibold items-center">
                                                <span className="text-[10px] ">{todo.createdAt.toLocaleDateString()}</span>
                                                <span className="text-[10px] ">{todo.createdAt.toLocaleTimeString()}</span>
                                            </div>
                                        </div>
                                        <span className="text-sm px-1 mr-40">{todo.description}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Form */}
                    <TodoForm />

                </div>
            </div>
        </section>
    );
}
