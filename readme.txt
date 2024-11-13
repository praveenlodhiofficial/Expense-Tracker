1. Create next application: npx create-next-app@latest .

2. Using Prisma (ORM): npx prisma init

2.a To setup prisma with the neion driver, use the prisma drive adapter. this adapter allow you to choose a different database driver than prisma default driver for communicating with your database.

2.b Enable the bold(driveAdapters) Preview feature flag in bold(prisma/schema.prisma) file

'''bash
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}
'''

2.c Install the prisma adapter, Neon serverless driver, and websocket (ws)

'''bash
npm install @prisma/adapter-neon @neondatabase/serverless ws
npm install -D @types/ws
'''

2.d Install the bold(prisma client)
'''bash 
npm i @prisma/client
'''

2.e  Install prisma client that is tailored according to our specific database schema which makes it easy to run the typesafe queries and access the different tables & different functions that are accesisbke through prisma client.

so to instantiate the prisma client in bold(lib/prisma.ts):

add this page link 'prisma docs - prisma with nextjs': https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution

add this page link 'neon docs update you prisma client instance': https://neon.tech/docs/guides/prisma

with this step we have combined to tell prisma to use neon serverless driver instead of prisma default driver

...bash
import ws from 'ws'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'

const prismaClientSingleton = () => {
  neonConfig.webSocketConstructor = ws
  const connectionString = `${process.env.DATABASE_URL}`

  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool)
  const prisma = new PrismaClient({ adapter })

  return prisma
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export default prisma

...

2.f npm i bufferutil --save-dev


3. Creating a database Schema

3.1 Create an Expence model in prisma/schema.prisma

...bash
model Expense {
    id        String    @id @default(uuid())
    createdAt DateTime  @default(now())
    updatedAt DateTime  @updatedAt
    title     String    @db.VarChar(255)
    amount    Int
}
...

3.2 To map your data model to the database schema, you need to use the prisma migrate commands:

...bash
npx prisma migrate dev --name init
...

this command does three things:

    - it creates a new Sql migration file for this migration

    - It runs on SQL migration file against the database

    - runs the generate command to generate the priam client, if not generated use command

    ...bash
    npx prisma generate
    ...

3.3 run prisma studio to see a visual interface for interacting with your database, where you can view and edit your data.

...bash
npx prisma studio
...


