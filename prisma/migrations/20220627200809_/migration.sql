-- AlterTable
ALTER TABLE "users" ADD COLUMN     "booksRead" TEXT[],
ADD COLUMN     "currentlyReading" TEXT[],
ADD COLUMN     "wantsToRead" TEXT[];
