-- DropForeignKey
ALTER TABLE `equipmentrequests` DROP FOREIGN KEY `EquipmentRequests_laboratoryRequestId_fkey`;

-- DropForeignKey
ALTER TABLE `materialrequests` DROP FOREIGN KEY `MaterialRequests_laboratoryRequestId_fkey`;

-- DropForeignKey
ALTER TABLE `reagentrequests` DROP FOREIGN KEY `ReagentRequests_laboratoryRequestId_fkey`;

-- AddForeignKey
ALTER TABLE `EquipmentRequests` ADD CONSTRAINT `EquipmentRequests_laboratoryRequestId_fkey` FOREIGN KEY (`laboratoryRequestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialRequests` ADD CONSTRAINT `MaterialRequests_laboratoryRequestId_fkey` FOREIGN KEY (`laboratoryRequestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReagentRequests` ADD CONSTRAINT `ReagentRequests_laboratoryRequestId_fkey` FOREIGN KEY (`laboratoryRequestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
