/*
  Warnings:

  - You are about to drop the `_equipmentrequeststoinventoryofequpiment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventoryofequpiment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_equipmentrequeststoinventoryofequpiment` DROP FOREIGN KEY `_EquipmentRequestsToInventoryOfEqupiment_A_fkey`;

-- DropForeignKey
ALTER TABLE `_equipmentrequeststoinventoryofequpiment` DROP FOREIGN KEY `_EquipmentRequestsToInventoryOfEqupiment_B_fkey`;

-- DropForeignKey
ALTER TABLE `inventoryofequpiment` DROP FOREIGN KEY `InventoryOfEqupiment_laboratoriesId_fkey`;

-- DropForeignKey
ALTER TABLE `inventoryofequpiment` DROP FOREIGN KEY `InventoryOfEqupiment_schoolYearId_fkey`;

-- DropForeignKey
ALTER TABLE `inventorytransactions` DROP FOREIGN KEY `InventoryTransactions_equipmentId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratorylocations` DROP FOREIGN KEY `LaboratoryLocations_equipmentId_fkey`;

-- DropTable
DROP TABLE `_equipmentrequeststoinventoryofequpiment`;

-- DropTable
DROP TABLE `inventoryofequpiment`;

-- CreateTable
CREATE TABLE `InventoryOfEquipment` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `code` VARCHAR(191) NULL,
    `equipmentName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `available` BOOLEAN NOT NULL DEFAULT true,
    `serialNumber` VARCHAR(191) NULL,
    `modelNoOrManufacturer` VARCHAR(191) NULL,
    `quantity` INTEGER NULL DEFAULT 1,
    `currentlyInUse` INTEGER NULL DEFAULT 0,
    `unit` VARCHAR(191) NULL,
    `unitCost` DOUBLE NULL,
    `dateReceived` DATETIME(3) NULL,
    `propertyNumber` VARCHAR(191) NULL,
    `acquisitionType` VARCHAR(191) NULL,
    `supplier` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `laboratoriesId` VARCHAR(191) NULL,
    `schoolYearId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EquipmentRequestsToInventoryOfEquipment` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_EquipmentRequestsToInventoryOfEquipment_AB_unique`(`A`, `B`),
    INDEX `_EquipmentRequestsToInventoryOfEquipment_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LaboratoryLocations` ADD CONSTRAINT `LaboratoryLocations_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `InventoryOfEquipment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfEquipment` ADD CONSTRAINT `InventoryOfEquipment_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `Laboratories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfEquipment` ADD CONSTRAINT `InventoryOfEquipment_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryTransactions` ADD CONSTRAINT `InventoryTransactions_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `InventoryOfEquipment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentRequestsToInventoryOfEquipment` ADD CONSTRAINT `_EquipmentRequestsToInventoryOfEquipment_A_fkey` FOREIGN KEY (`A`) REFERENCES `EquipmentRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentRequestsToInventoryOfEquipment` ADD CONSTRAINT `_EquipmentRequestsToInventoryOfEquipment_B_fkey` FOREIGN KEY (`B`) REFERENCES `InventoryOfEquipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
