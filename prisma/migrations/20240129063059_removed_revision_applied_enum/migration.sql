/*
  Warnings:

  - The values [REVISION_APPLIED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_APPLIED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_APPLIED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_APPLIED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_APPLIED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_APPLIED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_APPLIED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.
  - The values [REVISION_APPLIED] on the enum `LaboratoryRequests_laboratoryReservationsAdminApproval` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `laboratoryrequests` MODIFY `equipmentRequestsAdminApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `equipmentRequestsTeacherApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `materialRequestsAdminApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `materialRequestsTeacherApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `reagentRequestsAdminApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `reagentRequestsTeacherApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `laboratoryReservationsAdminApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `laboratoryReservationsTeacherApproval` ENUM('APPROVED', 'REJECTED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING';
