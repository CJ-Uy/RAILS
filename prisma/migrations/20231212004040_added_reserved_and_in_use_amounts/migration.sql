/*
  Warnings:

  - You are about to drop the column `maxRequestableQuantity` on the `inventoryofreagents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inventoryofequpiment` ADD COLUMN `currentlyInUse` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `inventoryofmaterials` ADD COLUMN `currentlyInUse` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `inventoryofreagents` DROP COLUMN `maxRequestableQuantity`,
    ADD COLUMN `reservedQuantity` DOUBLE NULL;
