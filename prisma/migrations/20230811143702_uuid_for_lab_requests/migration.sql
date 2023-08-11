/*
  Warnings:

  - The primary key for the `laboratoryrequests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `laboratoryReservationId` on the `laboratoryrequests` table. All the data in the column will be lost.
  - Added the required column `laboratoryRequestId` to the `LaboratoryReservations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `inventoryofequpiment` DROP FOREIGN KEY `InventoryOfEqupiment_requestId_fkey`;

-- DropForeignKey
ALTER TABLE `inventoryofmaterials` DROP FOREIGN KEY `InventoryOfMaterials_requestId_fkey`;

-- DropForeignKey
ALTER TABLE `inventoryofreagents` DROP FOREIGN KEY `InventoryOfReagents_requestId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_laboratoryReservationId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_signedAdminId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_signedTeacherId_fkey`;

-- AlterTable
ALTER TABLE `inventoryofequpiment` MODIFY `requestId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `inventoryofmaterials` MODIFY `requestId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `inventoryofreagents` MODIFY `requestId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `laboratoryrequests` DROP PRIMARY KEY,
    DROP COLUMN `laboratoryReservationId`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `signedTeacherId` VARCHAR(191) NULL,
    MODIFY `signedAdminId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `laboratoryreservations` ADD COLUMN `laboratoryRequestId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `LaboratoryReservations` ADD CONSTRAINT `LaboratoryReservations_laboratoryRequestId_fkey` FOREIGN KEY (`laboratoryRequestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfMaterials` ADD CONSTRAINT `InventoryOfMaterials_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfEqupiment` ADD CONSTRAINT `InventoryOfEqupiment_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfReagents` ADD CONSTRAINT `InventoryOfReagents_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_signedTeacherId_fkey` FOREIGN KEY (`signedTeacherId`) REFERENCES `Teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_signedAdminId_fkey` FOREIGN KEY (`signedAdminId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
