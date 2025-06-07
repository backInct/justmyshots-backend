-- CreateEnum
CREATE TYPE "AuthMethod" AS ENUM ('CREDENTIALS', 'OAUTH');

-- DropIndex
DROP INDEX "sessions_userId_key";

-- AlterTable
ALTER TABLE "users"
    ADD COLUMN "method" "AuthMethod" NOT NULL DEFAULT 'CREDENTIALS';

-- CreateTable
CREATE TABLE "email-confirmation"
(
    "id"           TEXT         NOT NULL,
    "expiresAt"    TIMESTAMP(3) NOT NULL,
    "code"         TEXT         NOT NULL,
    "verification" BOOLEAN      NOT NULL DEFAULT false,
    "userId"       TEXT         NOT NULL,
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email-confirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email-confirmation_code_key" ON "email-confirmation" ("code");

-- CreateIndex
CREATE UNIQUE INDEX "email-confirmation_userId_key" ON "email-confirmation" ("userId");

-- AddForeignKey
ALTER TABLE "email-confirmation"
    ADD CONSTRAINT "email-confirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
