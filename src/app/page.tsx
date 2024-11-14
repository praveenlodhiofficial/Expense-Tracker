import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='p-3'>
      <div className="p-3 justify-center text-center text-3xl underline font-semibold">
      Neon: Serverless Postgres
      </div>

      <div className='container flex my-10 mx-auto flex-col gap-2 text-lg font-medium'>

        {/* Expense Tracker */}
        <Link href='/expense-tracker' className=''>
          1. Expense Tracker
        </Link>

        {/* Expense Tracker */}
        <Link href='/expense-tracker' className=''>
          2. Expense Tracker
        </Link>


      </div>

    </div>
  )

}

export default Home