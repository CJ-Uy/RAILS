-- AlterTable
ALTER TABLE `teachers` ADD COLUMN `unitId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Teachers` ADD CONSTRAINT `Teachers_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Units`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
