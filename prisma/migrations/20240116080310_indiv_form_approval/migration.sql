/*
  Warnings:

  - You are about to drop the column `isSignedByAdmin` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `isSignedByTeacher` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `signedAdminId` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `signedTeacherId` on the `laboratoryrequests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_signedAdminId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_signedTeacherId_fkey`;

-- AlterTable
ALTER TABLE `equipmentrequests` ADD COLUMN `isSignedByAdmin` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `isSignedByTeacher` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `signedAdminId` VARCHAR(191) NULL,
    ADD COLUMN `signedTeacherId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `laboratoryrequests` DROP COLUMN `isSignedByAdmin`,
    DROP COLUMN `isSignedByTeacher`,
    DROP COLUMN `signedAdminId`,
    DROP COLUMN `signedTeacherId`,
    ADD COLUMN `adminsId` VARCHAR(191) NULL,
    ADD COLUMN `teachersId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `materialrequests` ADD COLUMN `isSignedByAdmin` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `isSignedByTeacher` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `signedAdminId` VARCHAR(191) NULL,
    ADD COLUMN `signedTeacherId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `reagentrequests` ADD COLUMN `isSignedByAdmin` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `isSignedByTeacher` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `signedAdminId` VARCHAR(191) NULL,
    ADD COLUMN `signedTeacherId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `EquipmentRequests` ADD CONSTRAINT `EquipmentRequests_signedTeacherId_fkey` FOREIGN KEY (`signedTeacherId`) REFERENCES `Teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentRequests` ADD CONSTRAINT `EquipmentRequests_signedAdminId_fkey` FOREIGN KEY (`signedAdminId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialRequests` ADD CONSTRAINT `MaterialRequests_signedTeacherId_fkey` FOREIGN KEY (`signedTeacherId`) REFERENCES `Teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialRequests` ADD CONSTRAINT `MaterialRequests_signedAdminId_fkey` FOREIGN KEY (`signedAdminId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReagentRequests` ADD CONSTRAINT `ReagentRequests_signedTeacherId_fkey` FOREIGN KEY (`signedTeacherId`) REFERENCES `Teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReagentRequests` ADD CONSTRAINT `ReagentRequests_signedAdminId_fkey` FOREIGN KEY (`signedAdminId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_adminsId_fkey` FOREIGN KEY (`adminsId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_teachersId_fkey` FOREIGN KEY (`teachersId`) REFERENCES `Teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
