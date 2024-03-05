-- CreateTable
CREATE TABLE `InventoryTransactions` (
    `id` VARCHAR(191) NOT NULL,
    `schoolYearId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionType` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `equipmentId` VARCHAR(191) NULL,
    `materialId` VARCHAR(191) NULL,
    `reagentId` VARCHAR(191) NULL,
    `quantityBeforeChange` DOUBLE NOT NULL,
    `quantityAfterChange` DOUBLE NOT NULL,
    `quantityOfChange` DOUBLE NOT NULL,
    `units` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InventoryTransactions` ADD CONSTRAINT `InventoryTransactions_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryTransactions` ADD CONSTRAINT `InventoryTransactions_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `InventoryOfEquipment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryTransactions` ADD CONSTRAINT `InventoryTransactions_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `InventoryOfMaterials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryTransactions` ADD CONSTRAINT `InventoryTransactions_reagentId_fkey` FOREIGN KEY (`reagentId`) REFERENCES `InventoryOfReagents`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
