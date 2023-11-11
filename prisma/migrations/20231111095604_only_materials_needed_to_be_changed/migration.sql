/*
  Warnings:

  - You are about to drop the column `quantity` on the `inventoryofreagents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inventoryofreagents` DROP COLUMN `quantity`,
    ADD COLUMN `currentQuantity` DOUBLE NULL,
    ADD COLUMN `maxRequestableQuantity` DOUBLE NULL;
