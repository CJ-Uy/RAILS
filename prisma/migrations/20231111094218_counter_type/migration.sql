/*
  Warnings:

  - You are about to drop the column `quantity` on the `inventoryofequpiment` table. All the data in the column will be lost.
  - You are about to drop the column `borrowed` on the `inventoryofmaterials` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `inventoryofmaterials` table. All the data in the column will be lost.
  - You are about to drop the column `maxQuantity` on the `inventoryofreagents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inventoryofequpiment` DROP COLUMN `quantity`,
    ADD COLUMN `maxQuantity` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `inventoryofmaterials` DROP COLUMN `borrowed`,
    DROP COLUMN `quantity`,
    ADD COLUMN `maxQuantity` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `inventoryofreagents` DROP COLUMN `maxQuantity`;
