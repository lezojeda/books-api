/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `bookId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
ADD COLUMN     "bookId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id");
