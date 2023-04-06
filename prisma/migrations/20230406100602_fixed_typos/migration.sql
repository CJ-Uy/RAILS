/*
  Warnings:

  - You are about to drop the column `Firtname` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `Picture_Link` on the `students` table. All the data in the column will be lost.
  - Added the required column `Firstname` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `Firtname`,
    DROP COLUMN `Picture_Link`,
    ADD COLUMN `Firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `Photo_Link` VARCHAR(191) NULL;
