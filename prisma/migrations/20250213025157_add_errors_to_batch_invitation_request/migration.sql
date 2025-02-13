/*
  Warnings:

  - You are about to drop the `BatchInvitationCreation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `invitedById` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "invitedById" TEXT NOT NULL;

-- DropTable
DROP TABLE "BatchInvitationCreation";

-- CreateTable
CREATE TABLE "BatchInvitationRequest" (
    "id" TEXT NOT NULL,
    "status" "BatchInvitationCreationStatus" NOT NULL DEFAULT 'PENDING',
    "errors" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchInvitationRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
