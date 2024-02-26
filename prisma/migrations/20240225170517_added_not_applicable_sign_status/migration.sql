-- AlterTable
ALTER TABLE `laboratoryrequests` MODIFY `equipmentRequestsAdminApproval` ENUM('APPROVED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `equipmentRequestsTeacherApproval` ENUM('APPROVED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `materialRequestsAdminApproval` ENUM('APPROVED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `materialRequestsTeacherApproval` ENUM('APPROVED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `reagentRequestsAdminApproval` ENUM('APPROVED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `reagentRequestsTeacherApproval` ENUM('APPROVED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `laboratoryReservationsAdminApproval` ENUM('APPROVED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING',
    MODIFY `laboratoryReservationsTeacherApproval` ENUM('APPROVED', 'PENDING', 'REVISION_NEEDED', 'NOT_APPLICABLE') NOT NULL DEFAULT 'PENDING';
