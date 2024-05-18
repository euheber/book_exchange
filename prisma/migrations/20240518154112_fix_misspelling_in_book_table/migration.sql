/*
  Warnings:

  - You are about to drop the column `publiser` on the `Books` table. All the data in the column will be lost.
  - Added the required column `publisher` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Books" (
    "book_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    CONSTRAINT "Books_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Books" ("book_id", "name", "userId") SELECT "book_id", "name", "userId" FROM "Books";
DROP TABLE "Books";
ALTER TABLE "new_Books" RENAME TO "Books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
