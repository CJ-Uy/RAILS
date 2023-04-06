/*
  Warnings:

  - The primary key for the `grade_section` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `GradeSection_Id` on the `grade_section` table. All the data in the column will be lost.
  - The primary key for the `inventory_of_equipment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Laboratory_Equipment_Id` on the `inventory_of_equipment` table. All the data in the column will be lost.
  - The primary key for the `inventory_of_materials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Supply_Id` on the `inventory_of_materials` table. All the data in the column will be lost.
  - The primary key for the `inventory_of_reagents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Reagent_Id` on the `inventory_of_reagents` table. All the data in the column will be lost.
  - The primary key for the `laboratory_requests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Request_Id` on the `laboratory_requests` table. All the data in the column will be lost.
  - Added the required column `Id` to the `grade_section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `inventory_of_equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `inventory_of_materials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `inventory_of_reagents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `laboratory_requests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `inventory_of_equipment` DROP FOREIGN KEY `inventory_of_equipment_laboratory_requestsRequest_Id_fkey`;

-- DropForeignKey
ALTER TABLE `inventory_of_materials` DROP FOREIGN KEY `inventory_of_materials_laboratory_requestsRequest_Id_fkey`;

-- DropForeignKey
ALTER TABLE `inventory_of_reagents` DROP FOREIGN KEY `inventory_of_reagents_laboratory_requestsRequest_Id_fkey`;

-- DropForeignKey
ALTER TABLE `laboratory_locations` DROP FOREIGN KEY `laboratory_locations_inventory_of_equipmentLaboratory_Equip_fkey`;

-- DropForeignKey
ALTER TABLE `laboratory_locations` DROP FOREIGN KEY `laboratory_locations_inventory_of_materialsSupply_Id_fkey`;

-- DropForeignKey
ALTER TABLE `laboratory_locations` DROP FOREIGN KEY `laboratory_locations_inventory_of_reagentsReagent_Id_fkey`;

-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `students_GradeSection_Code_fkey`;

-- AlterTable
ALTER TABLE `admins` ADD COLUMN `Picture_Link` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `grade_section` DROP PRIMARY KEY,
    DROP COLUMN `GradeSection_Id`,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `inventory_of_equipment` DROP PRIMARY KEY,
    DROP COLUMN `Laboratory_Equipment_Id`,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `inventory_of_materials` DROP PRIMARY KEY,
    DROP COLUMN `Supply_Id`,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `inventory_of_reagents` DROP PRIMARY KEY,
    DROP COLUMN `Reagent_Id`,
    ADD COLUMN `Id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `laboratory_requests` DROP PRIMARY KEY,
    DROP COLUMN `Request_Id`,
    ADD COLUMN `Id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `students` ADD COLUMN `Picture_Link` VARCHAR(191) NULL,
    MODIFY `GradeSection_Code` INTEGER NULL;

-- AlterTable
ALTER TABLE `teachers` ADD COLUMN `Picture_Link` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_GradeSection_Code_fkey` FOREIGN KEY (`GradeSection_Code`) REFERENCES `grade_section`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_locations` ADD CONSTRAINT `laboratory_locations_inventory_of_materialsSupply_Id_fkey` FOREIGN KEY (`inventory_of_materialsSupply_Id`) REFERENCES `inventory_of_materials`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_locations` ADD CONSTRAINT `laboratory_locations_inventory_of_equipmentLaboratory_Equip_fkey` FOREIGN KEY (`inventory_of_equipmentLaboratory_Equipment_Id`) REFERENCES `inventory_of_equipment`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_locations` ADD CONSTRAINT `laboratory_locations_inventory_of_reagentsReagent_Id_fkey` FOREIGN KEY (`inventory_of_reagentsReagent_Id`) REFERENCES `inventory_of_reagents`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_of_materials` ADD CONSTRAINT `inventory_of_materials_laboratory_requestsRequest_Id_fkey` FOREIGN KEY (`laboratory_requestsRequest_Id`) REFERENCES `laboratory_requests`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_of_equipment` ADD CONSTRAINT `inventory_of_equipment_laboratory_requestsRequest_Id_fkey` FOREIGN KEY (`laboratory_requestsRequest_Id`) REFERENCES `laboratory_requests`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_of_reagents` ADD CONSTRAINT `inventory_of_reagents_laboratory_requestsRequest_Id_fkey` FOREIGN KEY (`laboratory_requestsRequest_Id`) REFERENCES `laboratory_requests`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;
