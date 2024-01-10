/*
  Warnings:

  - Added the required column `ranged` to the `LaboratoryReservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laboratoryreservations` ADD COLUMN `ranged` BOOLEAN NOT NULL;
