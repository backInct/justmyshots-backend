/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdAt` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "lastActiveDate" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "expireAt" SET DATA TYPE TIMESTAMPTZ;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_deviceId_key" ON "sessions"("deviceId");
