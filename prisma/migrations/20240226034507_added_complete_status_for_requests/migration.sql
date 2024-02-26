/*
  Warnings:

  - You are about to drop the column `completed` on the `laboratoryrequests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `laboratoryrequests` DROP COLUMN `completed`,
    ADD COLUMN `completeStatus` ENUM('PENDING', 'UNDERWAY', 'COMPLETED') NOT NULL DEFAULT 'PENDING';
