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

...
