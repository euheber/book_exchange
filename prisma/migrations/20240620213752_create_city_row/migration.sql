/*
  Warnings:

  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tracking_code" TEXT,
    "city" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "name", "tracking_code") SELECT "email", "id", "name", "tracking_code" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_tracking_code_key" ON "User"("tracking_code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
