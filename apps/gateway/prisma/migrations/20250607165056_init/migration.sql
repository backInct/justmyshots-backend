-- CreateTable
CREATE TABLE "users"
(
    "id"           TEXT         NOT NULL,
    "email"        TEXT         NOT NULL,
    "username"     TEXT         NOT NULL,
    "passwordHash" TEXT         NOT NULL,
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMP(3) NOT NULL,
    "deletedAt"    TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions"
(
    "deviceId"       TEXT         NOT NULL,
    "deviceName"     TEXT         NOT NULL,
    "ip"             TEXT         NOT NULL,
    "lastActiveDate" TIMESTAMP(3) NOT NULL,
    "expireAt"       TIMESTAMP(3) NOT NULL,
    "userId"         TEXT         NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("deviceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users" ("username");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userId_key" ON "sessions" ("userId");

-- AddForeignKey
ALTER TABLE "sessions"
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
