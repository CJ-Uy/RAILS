/*
  Warnings:

  - You are about to alter the column `maxQuantity` on the `inventoryofreagents` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `inventoryofreagents` ADD COLUMN `currentQuantity` DOUBLE NULL,
    ADD COLUMN `unit` VARCHAR(191) NULL,
    MODIFY `maxQuantity` DOUBLE NULL;
