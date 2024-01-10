/*
  Warnings:

  - You are about to drop the column `endTime` on the `laboratoryreservations` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `laboratoryreservations` table. All the data in the column will be lost.
  - Added the required column `dates` to the `LaboratoryReservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `LaboratoryReservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laboratoryreservations` DROP COLUMN `endTime`,
    DROP COLUMN `startTime`,
    ADD COLUMN `dates` JSON NOT NULL,
    ADD COLUMN `time` JSON NOT NULL;
