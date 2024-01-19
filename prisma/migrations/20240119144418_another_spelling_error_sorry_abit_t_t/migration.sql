/*
  Warnings:

  - You are about to drop the column `laboratoryRequestsTeacherApproval` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `laboratoryReservationAdminAnnotation` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `laboratoryReservationAdminApproval` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `laboratoryReservationAdminApproverId` on the `laboratoryrequests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_laboratoryReservationAdminApproverId_fkey`;

-- AlterTable
ALTER TABLE `laboratoryrequests` DROP COLUMN `laboratoryRequestsTeacherApproval`,
    DROP COLUMN `laboratoryReservationAdminAnnotation`,
    DROP COLUMN `laboratoryReservationAdminApproval`,
    DROP COLUMN `laboratoryReservationAdminApproverId`,
    ADD COLUMN `laboratoryReservationsAdminAnnotation` TEXT NULL,
    ADD COLUMN `laboratoryReservationsAdminApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `laboratoryReservationsAdminApproverId` VARCHAR(191) NULL,
    ADD COLUMN `laboratoryReservationsTeacherApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_laboratoryReservationsAdminApproverId_fkey` FOREIGN KEY (`laboratoryReservationsAdminApproverId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
