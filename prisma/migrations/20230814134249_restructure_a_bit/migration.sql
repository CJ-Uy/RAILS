/*
  Warnings:

  - You are about to drop the column `equipmentRequestedControlNumber` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `materialsRequestedControlNumber` on the `laboratoryrequests` table. All the data in the column will be lost.
  - You are about to drop the column `reagentsRequestedControlNumber` on the `laboratoryrequests` table. All the data in the column will be lost.
  - Added the required column `controlNumber` to the `EquipmentRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `controlNumber` to the `MaterialRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `controlNumber` to the `ReagentRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `equipmentrequests` ADD COLUMN `controlNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `laboratoryrequests` DROP COLUMN `equipmentRequestedControlNumber`,
    DROP COLUMN `materialsRequestedControlNumber`,
    DROP COLUMN `reagentsRequestedControlNumber`;

-- AlterTable
ALTER TABLE `materialrequests` ADD COLUMN `controlNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reagentrequests` ADD COLUMN `controlNumber` VARCHAR(191) NOT NULL;
