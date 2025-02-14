-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_courseId_fkey";

-- AlterTable
ALTER TABLE "Invitation" ALTER COLUMN "courseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
