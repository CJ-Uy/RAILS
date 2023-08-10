/*
  Warnings:

  - You are about to drop the column `schoolYear` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `controlNumberCounter` on the `schoolyear` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inventoryofequpiment` ADD COLUMN `schoolYearId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `inventoryofreagents` ADD COLUMN `schoolYearId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `laboratoryrequests` DROP COLUMN `schoolYear`,
    ADD COLUMN `schoolYearId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `schoolyear` DROP COLUMN `controlNumberCounter`,
    ADD COLUMN `laboratoryRequestControlNumberCounter` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `materialEquipmentRequestControlNumberCounter` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `reagentRequestControlNumberCounter` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `InventoryOfEqupiment` ADD CONSTRAINT `InventoryOfEqupiment_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfReagents` ADD CONSTRAINT `InventoryOfReagents_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
