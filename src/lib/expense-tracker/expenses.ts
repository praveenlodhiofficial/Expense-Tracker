import prisma from "@/lib/prisma";

export async function getExpenses() {
    return await prisma.expense.findMany()
}

export async function createExpenses(
    data: {
        title: string,
        quantity: number,
        price: number;
    }) {
    return await prisma.expense.create({
        data
    })
}