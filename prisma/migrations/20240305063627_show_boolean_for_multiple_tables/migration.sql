-- AlterTable
ALTER TABLE `admins` ADD COLUMN `show` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `gradesection` ADD COLUMN `show` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `inventoryofequipment` ADD COLUMN `show` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `inventoryofmaterials` ADD COLUMN `show` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `inventoryofreagents` ADD COLUMN `show` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `laboratories` ADD COLUMN `show` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `laboratorylocations` ADD COLUMN `show` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `teachers` ADD COLUMN `show` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `units` ADD COLUMN `show` BOOLEAN NOT NULL DEFAULT true;
