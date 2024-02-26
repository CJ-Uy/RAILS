/*
  Warnings:

  - The values [REVISION_NEEDED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_NEEDED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_NEEDED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_NEEDED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_NEEDED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_NEEDED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_NEEDED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_NEEDED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `laboratoryrequests` MODIFY `equipmentRequestsAdminApproval` ENUM('APPROVED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    MODIFY `equipmentRequestsTeacherApproval` ENUM('APPROVED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    MODIFY `materialRequestsAdminApproval` ENUM('APPROVED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    MODIFY `materialRequestsTeacherApproval` ENUM('APPROVED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    MODIFY `reagentRequestsAdminApproval` ENUM('APPROVED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    MODIFY `reagentRequestsTeacherApproval` ENUM('APPROVED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    MODIFY `laboratoryReservationsAdminApproval` ENUM('APPROVED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    MODIFY `laboratoryReservationsTeacherApproval` ENUM('APPROVED', 'PENDING') NOT NULL DEFAULT 'PENDING';
