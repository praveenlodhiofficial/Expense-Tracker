# Expense Calculator with Prisma and Neon
This project demonstrates a Next.js application using Prisma as an ORM and Neon as the database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js and npm (or yarn) installed.
* A Neon account (for database access).  You'll need to obtain a `DATABASE_URL` environment variable from your Neon project.

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <project_name>
   ```
   
2. **Install dependencies:**

   ```bash
   npm install
   ```
      
3. **Set up environment variables:**
    - Create a .env file (or use your preferred environment variable management method) and add your Neon database URL:

       ```bash
       DATABASE_URL=<your_neon_database_url>
       ```
         
4. **Run the development server:**
    - A Neon account (for database access).  You'll need to obtain a `DATABASE_URL` environment variable from your Neon project.

       ```bash
       npm run dev
       ```

## Prisma with Neon Serverless Setup
This project uses Prisma as an Object-Relational Mapper (ORM) to interact with the Neon database for a Next.js application.

### 1. **Create a New Next.js Application**

   ```bash
    npx create-next-app@latest .
   ```
 
### 2. **Set Up Prisma ORM:** 
- Run the following command to initialize Prisma in your project:

   ```bash
    npx prisma init
   ```
    
#### 2.1. **Set Up Neon Driver Adapter:**
- To use the Neon driver, configure Prisma to use a different database driver with the driverAdapters feature.
- Open your prisma/schema.prisma file and add the following to enable the Neon driver:

    ```bash
        generator client {
        provider = "prisma-client-js"
        previewFeatures = ["driverAdapters"]
        }
        
        datasource db {
        provider = "postgresql" // Neon uses PostgreSQL
        url = env("DATABASE_URL")
        }
    ```

#### 2.2. **Install Required Packages:**
- Install the Prisma adapter, Neon serverless driver, and WebSocket:

    ```bash
        npm install @prisma/adapter-neon @neondatabase/serverless ws
        npm install -D @types/ws
    ```
     
#### 2.3. **Install Prisma Client:**
- Install the Prisma Client to interact with your database:

    ```bash
        npm install @prisma/client
    ```

#### 2.4. **Configure Prisma with Neon:**
- Create a lib/prisma.ts file to set up your Prisma client:

    ```bash
        import ws from 'ws';
        import { PrismaClient } from '@prisma/client';
        import { PrismaNeon } from '@prisma/adapter-neon';
        import { Pool, neonConfig } from '@neondatabase/serverless';

        const prismaClientSingleton = () => {
        neonConfig.webSocketConstructor = ws;
        const connectionString = `${process.env.DATABASE_URL}`;
        
        const pool = new Pool({ connectionString });
        const adapter = new PrismaNeon(pool);
        const prisma = new PrismaClient({ adapter });

        return prisma;
        };

        declare const globalThis: {
        prismaGlobal: ReturnType<typeof prismaClientSingleton>;
        } & typeof global;

        const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

        if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

        export default prisma;
    ```

- This code configures Prisma to use the Neon serverless driver instead of the default one.

- For more details, refer to the official Prisma and Neon docs:
    - [Prisma with Next.js Docs](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution)
    - [Neon Docs: Update Your Prisma Client Instance](https://neon.tech/docs/guides/prisma)
     
#### 2.5. **Install Additional Dependency for WebSockets:**
- Install the bufferutil package as a development dependency:

    ```bash
        npm install bufferutil --save-dev
    ```
    
 
### 3. **Create the Database Schema**

#### 3.1. **Define the Expense Model:**
- In your prisma/schema.prisma, define the Expense model:

    ```bash
        model Expense {
        id        String   @id @default(uuid())
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt
        title     String   @db.VarChar(255)
        amount    Int
        }
    ```

#### 3.2. **Apply Migrations:**
- Run the following command to apply migrations to your database:

    ```bash
        npx prisma migrate dev --name init
    ```

- This command will:
    - Create a new SQL migration file.
    - Apply the migration to the database.
    - Regenerate the Prisma Client.

- If the client isn’t generated automatically, run:

    ```bash
        npx prisma generate
    ```

#### 3.3. **Launch Prisma Studio:**
- You can use Prisma Studio to visually interact with your database:

    ```bash
        npx prisma studio
    ```

## Additional Notes

### 1. **bufferutil:** 
- The bufferutil package is required by the Neon adapter and is included in the package.json.

### 2. **Error Handling:** 
- Remember to add proper error handling to your Prisma queries in your Next.js application.

### 3. **Preview Features:** 
- The driverAdapters preview feature is enabled in schema.prisma. Be aware of potential instability associated with preview features.