/*
  Warnings:

  - You are about to drop the column `show` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `gradesection` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `inventoryofequipment` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `inventoryofmaterials` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `inventoryofreagents` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `laboratories` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `laboratorylocations` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `show` on the `units` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admins` DROP COLUMN `show`,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `gradesection` DROP COLUMN `show`,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `inventoryofequipment` DROP COLUMN `show`,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `inventoryofmaterials` DROP COLUMN `show`,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `inventoryofreagents` DROP COLUMN `show`,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `laboratories` DROP COLUMN `show`,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `laboratorylocations` DROP COLUMN `show`,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `teachers` DROP COLUMN `show`,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `units` DROP COLUMN `show`,
    ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false;
