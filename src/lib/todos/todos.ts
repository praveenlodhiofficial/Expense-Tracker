import prisma from '@/lib/prisma'

export async function getTodos() {
    return await prisma.todo.findMany()
} 

export async function createTodos(
    data: {
        title: string,
        description: string,
    }) {
    return await prisma.todo.create({
        data
    })
}