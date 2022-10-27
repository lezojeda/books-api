/*
  Warnings:

  - A unique constraint covering the columns `[userId,bookId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Book_userId_bookId_key" ON "Book"("userId", "bookId");
