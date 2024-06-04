-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tracking_code" TEXT,
    "validation" BOOLEAN NOT NULL DEFAULT false,
    "verification_code" TEXT DEFAULT ''
);
INSERT INTO "new_User" ("email", "id", "name", "tracking_code", "validation", "verification_code") SELECT "email", "id", "name", "tracking_code", "validation", "verification_code" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_tracking_code_key" ON "User"("tracking_code");
CREATE UNIQUE INDEX "User_verification_code_key" ON "User"("verification_code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
