-- AlterTable
ALTER TABLE `laboratoryrequests` MODIFY `completeStatus` ENUM('PENDING', 'UNDERWAY', 'COMPLETED', 'CLEARED', 'NOT_CLEARED') NOT NULL DEFAULT 'PENDING';