-- CreateEnum
CREATE TYPE "BatchInvitationCreationStatus" AS ENUM ('PENDING', 'COMPLETE');

-- CreateTable
CREATE TABLE "BatchInvitationCreation" (
    "id" TEXT NOT NULL,
    "status" "BatchInvitationCreationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchInvitationCreation_pkey" PRIMARY KEY ("id")
);
