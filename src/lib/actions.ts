'use server'

import { revalidatePath } from "next/cache"
import { createExpenses } from '@/lib/expenses'

export async function createExpenseAction(state: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries())

    const title = data.title as string
    if ( typeof title !== 'string' ) {
        throw new Error ('Title must be a String.')
    } 

    const amount = parseFloat( data.amount as string )
    if ( isNaN ( amount )) {
        throw new Error ('Amount must be a Number.')
    }

    await createExpenses ({ title, amount})
    revalidatePath('/')
}