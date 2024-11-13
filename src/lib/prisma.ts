// prisma.ts ----- or ----- db.ts

import ws from 'ws'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'

const prismaClientSingleton = () => {
  // Set up WebSocket connection for Neon database
  neonConfig.webSocketConstructor = ws
  const connectionString = `${process.env.DATABASE_URL}`

  // Create a connection pool and Prisma adapter for Neon
  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool)
  const prisma = new PrismaClient({ adapter })

  return prisma
}

// Store the Prisma client instance in the global object during local development
// to avoid creating a new instance on every hot module reload.
// This prevents exhausting the connection pool by reusing the client across reloads.

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export default prisma
