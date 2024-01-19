-- AlterTable
ALTER TABLE `laboratoryrequests` ADD COLUMN `laboratoryRequestsAdminAnnotation` TEXT NULL,
    ADD COLUMN `laboratoryRequestsAdminApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `laboratoryRequestsAdminApproverId` VARCHAR(191) NULL,
    ADD COLUMN `laboratoryRequestsTeacherApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_laboratoryRequestsAdminApproverId_fkey` FOREIGN KEY (`laboratoryRequestsAdminApproverId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
