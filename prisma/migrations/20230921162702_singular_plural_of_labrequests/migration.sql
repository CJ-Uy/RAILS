/*
  Warnings:

  - You are about to drop the column `laboratoryRequestsId` on the `equipmentrequests` table. All the data in the column will be lost.
  - You are about to drop the column `laboratoryRequestsId` on the `reagentrequests` table. All the data in the column will be lost.
  - Added the required column `laboratoryRequestId` to the `EquipmentRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `laboratoryRequestId` to the `ReagentRequests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `equipmentrequests` DROP FOREIGN KEY `EquipmentRequests_laboratoryRequestsId_fkey`;

-- DropForeignKey
ALTER TABLE `reagentrequests` DROP FOREIGN KEY `ReagentRequests_laboratoryRequestsId_fkey`;

-- AlterTable
ALTER TABLE `equipmentrequests` DROP COLUMN `laboratoryRequestsId`,
    ADD COLUMN `laboratoryRequestId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reagentrequests` DROP COLUMN `laboratoryRequestsId`,
    ADD COLUMN `laboratoryRequestId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `EquipmentRequests` ADD CONSTRAINT `EquipmentRequests_laboratoryRequestId_fkey` FOREIGN KEY (`laboratoryRequestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReagentRequests` ADD CONSTRAINT `ReagentRequests_laboratoryRequestId_fkey` FOREIGN KEY (`laboratoryRequestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
