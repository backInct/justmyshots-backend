/*
  Warnings:

  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `method` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `email-confirmation` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `sessions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "email-confirmation"
    DROP CONSTRAINT "email-confirmation_userId_fkey";

-- AlterTable
ALTER TABLE "sessions"
    DROP CONSTRAINT "sessions_pkey",
    ADD COLUMN "id" TEXT NOT NULL,
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users"
    DROP COLUMN "method",
    ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ;

-- DropTable
DROP TABLE "email-confirmation";

-- DropEnum
DROP TYPE "AuthMethod";

-- CreateTable
CREATE TABLE "user-email-confirmation"
(
    "id"           TEXT         NOT NULL,
    "expiresAt"    TIMESTAMP(3) NOT NULL,
    "code"         TEXT         NOT NULL,
    "verification" BOOLEAN      NOT NULL DEFAULT false,
    "userId"       TEXT         NOT NULL,
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user-email-confirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user-email-confirmation_code_key" ON "user-email-confirmation" ("code");

-- CreateIndex
CREATE UNIQUE INDEX "user-email-confirmation_userId_key" ON "user-email-confirmation" ("userId");

-- AddForeignKey
ALTER TABLE "user-email-confirmation"
    ADD CONSTRAINT "user-email-confirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
