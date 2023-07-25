/*
  Warnings:

  - The primary key for the `admins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `gradesection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `inventoryofequpiment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `inventoryofmaterials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `inventoryofreagents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `laboratories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `laboratorylocations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `laboratoryreservations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `laboratoriesId` on the `laboratoryreservations` table. All the data in the column will be lost.
  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gradeSectionCode` on the `students` table. All the data in the column will be lost.
  - The primary key for the `teachers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `units` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `laboratoryId` to the `LaboratoryReservations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `inventoryofequpiment` DROP FOREIGN KEY `InventoryOfEqupiment_laboratoriesId_fkey`;

-- DropForeignKey
ALTER TABLE `inventoryofmaterials` DROP FOREIGN KEY `InventoryOfMaterials_laboratoriesId_fkey`;

-- DropForeignKey
ALTER TABLE `inventoryofreagents` DROP FOREIGN KEY `InventoryOfReagents_laboratoriesId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratories` DROP FOREIGN KEY `Laboratories_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratorylocations` DROP FOREIGN KEY `LaboratoryLocations_equipmentId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratorylocations` DROP FOREIGN KEY `LaboratoryLocations_inventoryOfMaterialsSupplyId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratorylocations` DROP FOREIGN KEY `LaboratoryLocations_reagentId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_Laboratory_Reservation_Id_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_requestorId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_signedAdminId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_signedTeacherId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_teacherInChargeId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryrequests` DROP FOREIGN KEY `LaboratoryRequests_unitId_fkey`;

-- DropForeignKey
ALTER TABLE `laboratoryreservations` DROP FOREIGN KEY `LaboratoryReservations_laboratoriesId_fkey`;

-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `Students_gradeSectionCode_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_adminsId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_studentsId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_teachersId_fkey`;

-- AlterTable
ALTER TABLE `admins` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `gradesection` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `inventoryofequpiment` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `laboratoriesId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `inventoryofmaterials` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `laboratoriesId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `inventoryofreagents` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `laboratoriesId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `laboratories` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `locationId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `laboratorylocations` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `inventoryOfMaterialsSupplyId` VARCHAR(191) NULL,
    MODIFY `equipmentId` VARCHAR(191) NULL,
    MODIFY `reagentId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `laboratoryrequests` MODIFY `requestorId` VARCHAR(191) NOT NULL,
    MODIFY `unitId` VARCHAR(191) NOT NULL,
    MODIFY `teacherInChargeId` VARCHAR(191) NOT NULL,
    MODIFY `Laboratory_Reservation_Id` VARCHAR(191) NOT NULL,
    MODIFY `signedTeacherId` VARCHAR(191) NOT NULL,
    MODIFY `signedAdminId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `laboratoryreservations` DROP PRIMARY KEY,
    DROP COLUMN `laboratoriesId`,
    ADD COLUMN `laboratoryId` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `students` DROP PRIMARY KEY,
    DROP COLUMN `gradeSectionCode`,
    ADD COLUMN `gradeSectionId` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `teachers` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `units` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `studentsId` VARCHAR(191) NULL,
    MODIFY `teachersId` VARCHAR(191) NULL,
    MODIFY `adminsId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_studentsId_fkey` FOREIGN KEY (`studentsId`) REFERENCES `Students`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_teachersId_fkey` FOREIGN KEY (`teachersId`) REFERENCES `Teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_adminsId_fkey` FOREIGN KEY (`adminsId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_gradeSectionId_fkey` FOREIGN KEY (`gradeSectionId`) REFERENCES `GradeSection`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Laboratories` ADD CONSTRAINT `Laboratories_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `LaboratoryLocations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryLocations` ADD CONSTRAINT `LaboratoryLocations_inventoryOfMaterialsSupplyId_fkey` FOREIGN KEY (`inventoryOfMaterialsSupplyId`) REFERENCES `InventoryOfMaterials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryLocations` ADD CONSTRAINT `LaboratoryLocations_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `InventoryOfEqupiment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryLocations` ADD CONSTRAINT `LaboratoryLocations_reagentId_fkey` FOREIGN KEY (`reagentId`) REFERENCES `InventoryOfReagents`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryReservations` ADD CONSTRAINT `LaboratoryReservations_laboratoryId_fkey` FOREIGN KEY (`laboratoryId`) REFERENCES `Laboratories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfMaterials` ADD CONSTRAINT `InventoryOfMaterials_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `Laboratories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfEqupiment` ADD CONSTRAINT `InventoryOfEqupiment_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `Laboratories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfReagents` ADD CONSTRAINT `InventoryOfReagents_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `Laboratories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_requestorId_fkey` FOREIGN KEY (`requestorId`) REFERENCES `Students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_teacherInChargeId_fkey` FOREIGN KEY (`teacherInChargeId`) REFERENCES `Teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_Laboratory_Reservation_Id_fkey` FOREIGN KEY (`Laboratory_Reservation_Id`) REFERENCES `LaboratoryReservations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_signedTeacherId_fkey` FOREIGN KEY (`signedTeacherId`) REFERENCES `Teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_signedAdminId_fkey` FOREIGN KEY (`signedAdminId`) REFERENCES `Admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
