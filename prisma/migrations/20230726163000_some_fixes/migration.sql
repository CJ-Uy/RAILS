/*
  Warnings:

  - You are about to drop the column `dateAdded` on the `laboratorylocations` table. All the data in the column will be lost.
  - You are about to drop the column `dateRemoved` on the `laboratorylocations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `laboratorylocations` DROP COLUMN `dateAdded`,
    DROP COLUMN `dateRemoved`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `removedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `units` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
