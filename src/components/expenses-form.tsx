'use client'

import { createExpenseAction } from '@/lib/actions'
import React from 'react'
import { useActionState } from 'react'
import { Button } from './ui/button'

const ExpensesForm = () => {
    const [state, action] = useActionState(createExpenseAction, null)

    return (
        <div className='border px-3 py-5 rounded-md border-dashed'>

            <h3 className="text-xl font-bold text-center uppercase">Add new Items</h3>

            <form action={action} className="mt-3 flex flex-col gap-4">
                <input
                    type="text"
                    name='title'
                    placeholder='Title'
                    className='text-center border border-dashed rounded-md tracking-widest border-zinc-300 p-2'
                />
                <input
                    type="number"
                    name='amount'
                    placeholder='Amount ($)'
                    className='text-center border border-dashed rounded-md tracking-widest border-zinc-300 p-2'
                />
                <Button type='submit' className='uppercase'>Add Items</Button>
            </form>

        </div>
    )
}

export default ExpensesForm