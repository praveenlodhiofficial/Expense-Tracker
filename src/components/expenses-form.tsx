'use client'

import { createExpenseAction } from '@/lib/actions'
import React, { useState } from 'react'
import { useActionState } from 'react'

const ExpensesForm = () => {
    const [state, action] = useActionState(createExpenseAction, null)

    return (
        <div>
            <h3 className="text-xl font-bold">Add new Items</h3>
            <form action={action} className="mt-3 flex flex-col gap-4">
                <input
                    type="text"
                    name='title'
                    placeholder='Title'
                    className='border border-zinc-300 p-2'
                />
                <input
                    type="number"
                    name='amount'
                    placeholder='Amount'
                    className='border border-zinc-300 p-2'
                />
                <button
                    type='submit'
                    className='bg-purple-600 p-2 text-white'
                >
                    Add Items
                </button>
            </form>

        </div>
    )
}

export default ExpensesForm