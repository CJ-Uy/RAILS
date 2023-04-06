/*
  Warnings:

  - You are about to drop the column `LastName` on the `students` table. All the data in the column will be lost.
  - Added the required column `Lastname` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `LastName`,
    ADD COLUMN `Lastname` VARCHAR(191) NOT NULL;
