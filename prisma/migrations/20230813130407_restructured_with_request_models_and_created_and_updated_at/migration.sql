/*
  Warnings:

  - You are about to drop the column `requestId` on the `inventoryofequpiment` table. All the data in the column will be lost.
  - You are about to drop the column `requestId` on the `inventoryofmaterials` table. All the data in the column will be lost.
  - You are about to drop the column `requestId` on the `inventoryofreagents` table. All the data in the column will be lost.
  - You are about to drop the column `removedAt` on the `laboratorylocations` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `GradeSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InventoryOfEqupiment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InventoryOfMaterials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InventoryOfReagents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Laboratories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LaboratoryLocations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LaboratoryRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LaboratoryReservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Units` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `inventoryofequpiment` DROP FOREIGN KEY `InventoryOfEqupiment_requestId_fkey`;

-- DropForeignKey
ALTER TABLE `inventoryofmaterials` DROP FOREIGN KEY `InventoryOfMaterials_requestId_fkey`;

-- DropForeignKey
ALTER TABLE `inventoryofreagents` DROP FOREIGN KEY `InventoryOfReagents_requestId_fkey`;

-- AlterTable
ALTER TABLE `gradesection` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `inventoryofequpiment` DROP COLUMN `requestId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `inventoryofmaterials` DROP COLUMN `requestId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `schoolYearId` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `inventoryofreagents` DROP COLUMN `requestId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `laboratories` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `laboratorylocations` DROP COLUMN `removedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `laboratoryrequests` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `laboratoryreservations` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `students` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `units` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `EquipmentRequests` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `modelNoOrManufacturer` VARCHAR(191) NULL,
    `laboratoryRequestsId` VARCHAR(191) NOT NULL,
    `schoolYearId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialRequests` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `laboratoryRequestId` VARCHAR(191) NOT NULL,
    `schoolYearId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReagentRequests` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `laboratoryRequestsId` VARCHAR(191) NOT NULL,
    `schoolYearId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InventoryOfMaterialsToMaterialRequests` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_InventoryOfMaterialsToMaterialRequests_AB_unique`(`A`, `B`),
    INDEX `_InventoryOfMaterialsToMaterialRequests_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InventoryOfReagentsToReagentRequests` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_InventoryOfReagentsToReagentRequests_AB_unique`(`A`, `B`),
    INDEX `_InventoryOfReagentsToReagentRequests_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EquipmentRequestsToInventoryOfEqupiment` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_EquipmentRequestsToInventoryOfEqupiment_AB_unique`(`A`, `B`),
    INDEX `_EquipmentRequestsToInventoryOfEqupiment_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InventoryOfMaterials` ADD CONSTRAINT `InventoryOfMaterials_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentRequests` ADD CONSTRAINT `EquipmentRequests_laboratoryRequestsId_fkey` FOREIGN KEY (`laboratoryRequestsId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentRequests` ADD CONSTRAINT `EquipmentRequests_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialRequests` ADD CONSTRAINT `MaterialRequests_laboratoryRequestId_fkey` FOREIGN KEY (`laboratoryRequestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialRequests` ADD CONSTRAINT `MaterialRequests_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReagentRequests` ADD CONSTRAINT `ReagentRequests_laboratoryRequestsId_fkey` FOREIGN KEY (`laboratoryRequestsId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReagentRequests` ADD CONSTRAINT `ReagentRequests_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InventoryOfMaterialsToMaterialRequests` ADD CONSTRAINT `_InventoryOfMaterialsToMaterialRequests_A_fkey` FOREIGN KEY (`A`) REFERENCES `InventoryOfMaterials`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InventoryOfMaterialsToMaterialRequests` ADD CONSTRAINT `_InventoryOfMaterialsToMaterialRequests_B_fkey` FOREIGN KEY (`B`) REFERENCES `MaterialRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InventoryOfReagentsToReagentRequests` ADD CONSTRAINT `_InventoryOfReagentsToReagentRequests_A_fkey` FOREIGN KEY (`A`) REFERENCES `InventoryOfReagents`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InventoryOfReagentsToReagentRequests` ADD CONSTRAINT `_InventoryOfReagentsToReagentRequests_B_fkey` FOREIGN KEY (`B`) REFERENCES `ReagentRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentRequestsToInventoryOfEqupiment` ADD CONSTRAINT `_EquipmentRequestsToInventoryOfEqupiment_A_fkey` FOREIGN KEY (`A`) REFERENCES `EquipmentRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentRequestsToInventoryOfEqupiment` ADD CONSTRAINT `_EquipmentRequestsToInventoryOfEqupiment_B_fkey` FOREIGN KEY (`B`) REFERENCES `InventoryOfEqupiment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
