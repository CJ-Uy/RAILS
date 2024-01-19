/*
  Warnings:

  - You are about to drop the column `independentDate` on the `laboratoryrequests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `laboratoryrequests` DROP COLUMN `independentDate`,
    ADD COLUMN `independentDates` JSON NULL;
