'use client'

import React, { useActionState } from 'react'
import { Button } from '../ui/button'
import { createTodosAction } from '@/lib/todos/action'

const TodoForm = () => {
    const [state, action] = useActionState(createTodosAction, null)

    return (
        <div className='border p-3 rounded-md border-dashed border-slate-400'>

            <h3 className="text-lg font-bold text-center uppercase">Add new Todo</h3>

            <form action={action} className="mt-3 flex flex-col gap-4">
                <input
                    type="text"
                    name='title'
                    placeholder='Title'
                    className='text-center text-sm border border-dashed rounded-md border-zinc-400 p-1'
                />
                <input
                    type="text"
                    name='description'
                    placeholder='Description'
                    className='text-center text-sm border border-dashed rounded-md border-zinc-400 p-1'
                />
                <Button type='submit' className='text-xs uppercase'>Add Todo</Button>
            </form>

        </div>
    )
}

export default TodoForm