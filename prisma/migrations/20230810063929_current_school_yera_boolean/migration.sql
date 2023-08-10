/*
  Warnings:

  - A unique constraint covering the columns `[currentSchoolYear]` on the table `SchoolYear` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currentSchoolYear` to the `SchoolYear` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `schoolyear` ADD COLUMN `currentSchoolYear` BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SchoolYear_currentSchoolYear_key` ON `SchoolYear`(`currentSchoolYear`);
