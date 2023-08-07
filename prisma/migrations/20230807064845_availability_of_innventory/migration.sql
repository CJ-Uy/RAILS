-- AlterTable
ALTER TABLE `inventoryofequpiment` ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `inventoryofmaterials` ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `inventoryofreagents` ADD COLUMN `available` BOOLEAN NOT NULL DEFAULT true;
