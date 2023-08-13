/*
  Warnings:

  - Added the required column `controlNumber` to the `LaboratoryReservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laboratoryreservations` ADD COLUMN `controlNumber` VARCHAR(191) NOT NULL,
    MODIFY `startTime` VARCHAR(191) NOT NULL,
    MODIFY `endTime` VARCHAR(191) NOT NULL;
