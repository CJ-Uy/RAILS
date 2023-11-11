/*
  Warnings:

  - You are about to drop the column `maxQuantity` on the `inventoryofequpiment` table. All the data in the column will be lost.
  - You are about to drop the column `maxQuantity` on the `inventoryofmaterials` table. All the data in the column will be lost.
  - You are about to drop the column `currentQuantity` on the `inventoryofreagents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inventoryofequpiment` DROP COLUMN `maxQuantity`,
    ADD COLUMN `quantity` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `inventoryofmaterials` DROP COLUMN `maxQuantity`,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `inventoryofreagents` DROP COLUMN `currentQuantity`,
    ADD COLUMN `quantity` DOUBLE NULL;
