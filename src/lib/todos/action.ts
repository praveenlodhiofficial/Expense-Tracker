'use server'

import { revalidatePath } from "next/cache"
import { createTodos } from "./todos"

export async function createTodosAction (state:any, formData: FormData) {
    const data = Object.fromEntries(formData.entries())

    const title = data.title as string
    if (typeof title !== 'string') {
        alert('Enter text only')
    }

    const description = data.description as string 
    if (typeof description !== 'string') {
        alert('Enter text only')
    }

    const createdAt = new Date()
    const formattedDate = createdAt.toISOString().split('T')[0]
    console.log(formattedDate)

    await createTodos({ title, description, createdAt } as { title: string; description: string; createdAt: Date })
    revalidatePath('/')
}