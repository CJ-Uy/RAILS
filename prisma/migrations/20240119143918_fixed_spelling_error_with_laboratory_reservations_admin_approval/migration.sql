/*
  Warnings:

  - You are about to drop the column `laboratoryRequestsAdminAnnotation` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `laboratoryRequestsAdminApproval` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `laboratoryRequestsAdminApproverId` on the `laboratoryrequests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_laboratoryRequestsAdminApproverId_fkey`;

-- AlterTable
ALTER TABLE `laboratoryrequests` DROP COLUMN `laboratoryRequestsAdminAnnotation`,
    DROP COLUMN `laboratoryRequestsAdminApproval`,
    DROP COLUMN `laboratoryRequestsAdminApproverId`,
    ADD COLUMN `laboratoryReservationAdminAnnotation` TEXT NULL,
    ADD COLUMN `laboratoryReservationAdminApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `laboratoryReservationAdminApproverId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_laboratoryReservationAdminApproverId_fkey` FOREIGN KEY (`laboratoryReservationAdminApproverId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
