/*
  Warnings:

  - You are about to drop the column `isSignedByAdmin` on the `equipmentrequests` table. All the data in the column will be lost.
  - You are about to drop the column `isSignedByTeacher` on the `equipmentrequests` table. All the data in the column will be lost.
  - You are about to drop the column `signedAdminId` on the `equipmentrequests` table. All the data in the column will be lost.
  - You are about to drop the column `signedTeacherId` on the `equipmentrequests` table. All the data in the column will be lost.
  - You are about to drop the column `adminAnnotation` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `adminsId` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `teacherAnnotation` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `teachersId` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `isSignedByAdmin` on the `materialrequests` table. All the data in the column will be lost.
  - You are about to drop the column `isSignedByTeacher` on the `materialrequests` table. All the data in the column will be lost.
  - You are about to drop the column `signedAdminId` on the `materialrequests` table. All the data in the column will be lost.
  - You are about to drop the column `signedTeacherId` on the `materialrequests` table. All the data in the column will be lost.
  - You are about to drop the column `isSignedByAdmin` on the `reagentrequests` table. All the data in the column will be lost.
  - You are about to drop the column `isSignedByTeacher` on the `reagentrequests` table. All the data in the column will be lost.
  - You are about to drop the column `signedAdminId` on the `reagentrequests` table. All the data in the column will be lost.
  - You are about to drop the column `signedTeacherId` on the `reagentrequests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `equipmentrequests` DROP FOREIGN KEY `EquipmentRequests_signedAdminId_fkey`;

-- DropForeignKey
ALTER TABLE `equipmentrequests` DROP FOREIGN KEY `EquipmentRequests_signedTeacherId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_adminsId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_teachersId_fkey`;

-- DropForeignKey
ALTER TABLE `materialrequests` DROP FOREIGN KEY `MaterialRequests_signedAdminId_fkey`;

-- DropForeignKey
ALTER TABLE `materialrequests` DROP FOREIGN KEY `MaterialRequests_signedTeacherId_fkey`;

-- DropForeignKey
ALTER TABLE `reagentrequests` DROP FOREIGN KEY `ReagentRequests_signedAdminId_fkey`;

-- DropForeignKey
ALTER TABLE `reagentrequests` DROP FOREIGN KEY `ReagentRequests_signedTeacherId_fkey`;

-- AlterTable
ALTER TABLE `equipmentrequests` DROP COLUMN `isSignedByAdmin`,
    DROP COLUMN `isSignedByTeacher`,
    DROP COLUMN `signedAdminId`,
    DROP COLUMN `signedTeacherId`;

-- AlterTable
ALTER TABLE `laboratoryrequests` DROP COLUMN `adminAnnotation`,
    DROP COLUMN `adminsId`,
    DROP COLUMN `teacherAnnotation`,
    DROP COLUMN `teachersId`,
    ADD COLUMN `equipmentRequestsAdminAnnotation` TEXT NULL,
    ADD COLUMN `equipmentRequestsAdminApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `equipmentRequestsAdminApproverId` VARCHAR(191) NULL,
    ADD COLUMN `equipmentRequestsTeacherAnnotation` TEXT NULL,
    ADD COLUMN `equipmentRequestsTeacherApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `materialRequestsAdminAnnotation` TEXT NULL,
    ADD COLUMN `materialRequestsAdminApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `materialRequestsAdminApproverId` VARCHAR(191) NULL,
    ADD COLUMN `materialRequestsTeacherAnnotation` TEXT NULL,
    ADD COLUMN `materialRequestsTeacherApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `reagentRequestsAdminAnnotation` TEXT NULL,
    ADD COLUMN `reagentRequestsAdminApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `reagentRequestsAdminApproverId` VARCHAR(191) NULL,
    ADD COLUMN `reagentRequestsTeacherAnnotation` TEXT NULL,
    ADD COLUMN `reagentRequestsTeacherApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `materialrequests` DROP COLUMN `isSignedByAdmin`,
    DROP COLUMN `isSignedByTeacher`,
    DROP COLUMN `signedAdminId`,
    DROP COLUMN `signedTeacherId`;

-- AlterTable
ALTER TABLE `reagentrequests` DROP COLUMN `isSignedByAdmin`,
    DROP COLUMN `isSignedByTeacher`,
    DROP COLUMN `signedAdminId`,
    DROP COLUMN `signedTeacherId`;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_equipmentRequestsAdminApproverId_fkey` FOREIGN KEY (`equipmentRequestsAdminApproverId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_materialRequestsAdminApproverId_fkey` FOREIGN KEY (`materialRequestsAdminApproverId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_reagentRequestsAdminApproverId_fkey` FOREIGN KEY (`reagentRequestsAdminApproverId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
