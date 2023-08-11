/*
  Warnings:

  - You are about to drop the column `controlNumber` on the `laboratoryrequests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `laboratoryrequests` DROP COLUMN `controlNumber`,
    ADD COLUMN `equipmentRequestedControlNumber` VARCHAR(191) NULL,
    ADD COLUMN `materialsRequestedControlNumber` VARCHAR(191) NULL,
    ADD COLUMN `reagentsRequestedControlNumber` VARCHAR(191) NULL;
