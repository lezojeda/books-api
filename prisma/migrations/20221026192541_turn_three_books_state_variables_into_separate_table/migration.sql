/*
  Warnings:

  - You are about to drop the column `booksRead` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `currentlyReading` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `wantsToRead` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "booksRead",
DROP COLUMN "currentlyReading",
DROP COLUMN "wantsToRead";

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "readState" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
