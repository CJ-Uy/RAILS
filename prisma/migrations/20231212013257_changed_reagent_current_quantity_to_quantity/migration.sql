/*
  Warnings:

  - You are about to drop the column `currentQuantity` on the `inventoryofreagents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inventoryofreagents` DROP COLUMN `currentQuantity`,
    ADD COLUMN `quantity` DOUBLE NULL;
