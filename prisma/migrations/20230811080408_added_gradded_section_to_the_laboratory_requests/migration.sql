/*
  Warnings:

  - Added the required column `gradeSectionId` to the `LaboratoryRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laboratoryrequests` ADD COLUMN `gradeSectionId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_gradeSectionId_fkey` FOREIGN KEY (`gradeSectionId`) REFERENCES `GradeSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
