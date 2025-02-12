-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_invitedById_fkey";

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "role" SET DEFAULT 'GUEST';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'GUEST';
