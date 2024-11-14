'use client'

import { createExpenseAction } from '@/lib/expense-tracker/actions'
import React from 'react'
import { useActionState } from 'react'
import { Button } from '../ui/button'

const ExpensesForm = () => {
    const [state, action] = useActionState(createExpenseAction, null)

    return (
        <div className='border p-3 rounded-md border-dashed border-slate-400'>

            <h3 className="text-lg font-bold text-center uppercase">Add new Items</h3>

            <form action={action} className="mt-3 flex flex-col gap-4">
                <input
                    type="text"
                    name='title'
                    placeholder='Title'
                    className='text-center text-sm border border-dashed rounded-md border-zinc-400 p-1'
                />
                <input
                    type="number"
                    name='price'
                    placeholder='Price ($)'
                    className='text-center text-sm border border-dashed rounded-md border-zinc-400 p-1'
                />

                <input
                    type="number"
                    name='quantity'
                    placeholder='Quantity'
                    className='text-center text-sm border border-dashed rounded-md border-zinc-400 p-1'
                />

                <Button type='submit' className='text-xs uppercase'>Add Items</Button>
            </form>

        </div>
    )
}

export default ExpensesForm