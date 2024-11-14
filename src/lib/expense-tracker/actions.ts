'use server'

import { revalidatePath } from "next/cache"
import { createExpenses } from "./expenses"

export async function createExpenseAction(state: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries())

    const title = data.title as string
    if (typeof title !== 'string') {
        throw new Error('Title must be a String.')
    }

    const price = parseFloat(data.price as string)
    if (isNaN(price)) {
        throw new Error('price must be a Number.')
    }

    const quantity = parseFloat(data.quantity as string)
    if (isNaN(quantity)) {
        throw new Error('Quantity should be in Number.')
    }

    await createExpenses({ title, price, quantity })
    revalidatePath('/')
}