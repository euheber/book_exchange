/*
  Warnings:

  - A unique constraint covering the columns `[verification_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "verification_code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_verification_code_key" ON "User"("verification_code");
