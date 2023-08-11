/*
  Warnings:

  - You are about to drop the column `Laboratory_Reservation_Id` on the `laboratoryrequests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_Laboratory_Reservation_Id_fkey`;

-- AlterTable
ALTER TABLE `laboratoryrequests` DROP COLUMN `Laboratory_Reservation_Id`,
    ADD COLUMN `laboratoryReservationId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_laboratoryReservationId_fkey` FOREIGN KEY (`laboratoryReservationId`) REFERENCES `LaboratoryReservations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
