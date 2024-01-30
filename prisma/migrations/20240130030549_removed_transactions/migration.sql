/*
  Warnings:

  - You are about to drop the `inventorytransactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `inventorytransactions` DROP FOREIGN KEY `InventoryTransactions_equipmentId_fkey`;

-- DropForeignKey
ALTER TABLE `inventorytransactions` DROP FOREIGN KEY `InventoryTransactions_materialId_fkey`;

-- DropForeignKey
ALTER TABLE `inventorytransactions` DROP FOREIGN KEY `InventoryTransactions_reagentId_fkey`;

-- DropForeignKey
ALTER TABLE `inventorytransactions` DROP FOREIGN KEY `InventoryTransactions_schoolYearId_fkey`;

-- DropTable
DROP TABLE `inventorytransactions`;
