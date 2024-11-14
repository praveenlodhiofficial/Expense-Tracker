-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(20) NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
