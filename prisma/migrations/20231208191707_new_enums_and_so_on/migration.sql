/*
  Warnings:

  - You are about to alter the column `isSignedByTeacher` on the `laboratoryrequests` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(3))`.
  - You are about to alter the column `isSignedByAdmin` on the `laboratoryrequests` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `laboratoryrequests` ADD COLUMN `adminAnnotation` MEDIUMTEXT NULL,
    ADD COLUMN `teacherAnnotation` MEDIUMTEXT NULL,
    MODIFY `isSignedByTeacher` ENUM('APPROVED', 'REJECTED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    MODIFY `isSignedByAdmin` ENUM('APPROVED', 'REJECTED', 'PENDING') NOT NULL DEFAULT 'PENDING';
