-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `role` ENUM('STUDENT', 'TEACHER', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    `imageLink` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `studentsId` VARCHAR(191) NULL,
    `teachersId` VARCHAR(191) NULL,
    `adminsId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admins` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `signature` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teachers` (
    `id` VARCHAR(191) NOT NULL,
    `signature` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Students` (
    `id` VARCHAR(191) NOT NULL,
    `gradeSectionId` VARCHAR(191) NULL,
    `grade` INTEGER NULL,
    `section` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GradeSection` (
    `id` VARCHAR(191) NOT NULL,
    `grade` INTEGER NOT NULL,
    `section` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Units` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `frequencyRank` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Units_frequencyRank_key`(`frequencyRank`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Laboratories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `locationId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LaboratoryLocations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `removedAt` DATETIME(3) NULL,
    `inventoryOfMaterialsSupplyId` VARCHAR(191) NULL,
    `equipmentId` VARCHAR(191) NULL,
    `reagentId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LaboratoryReservations` (
    `id` VARCHAR(191) NOT NULL,
    `laboratoryId` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryOfMaterials` (
    `id` VARCHAR(191) NOT NULL,
    `itemName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `additionalPurchase` INTEGER NULL,
    `make` VARCHAR(191) NULL,
    `supplier` VARCHAR(191) NULL,
    `dateReceived` DATETIME(3) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `unit` VARCHAR(191) NOT NULL,
    `unitCost` DOUBLE NULL,
    `borrowed` INTEGER NOT NULL DEFAULT 0,
    `returned` INTEGER NOT NULL DEFAULT 0,
    `damage` INTEGER NOT NULL DEFAULT 0,
    `balancePerCard` INTEGER NULL,
    `balancePerCount` INTEGER NULL,
    `laboratoriesId` VARCHAR(191) NULL,
    `requestId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryOfEqupiment` (
    `id` VARCHAR(191) NOT NULL,
    `equipmentCode` VARCHAR(191) NOT NULL,
    `equipmentName` VARCHAR(191) NOT NULL,
    `serialNumber` VARCHAR(191) NULL,
    `modelNoOrManufacturer` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,
    `unit` VARCHAR(191) NULL,
    `unitCost` DOUBLE NULL,
    `dateReceived` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `propertyNumber` VARCHAR(191) NULL,
    `acquisitionType` VARCHAR(191) NULL,
    `supplier` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `laboratoriesId` VARCHAR(191) NULL,
    `requestId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryOfReagents` (
    `id` VARCHAR(191) NOT NULL,
    `itemNumber` VARCHAR(191) NULL,
    `casNumber` VARCHAR(191) NULL,
    `chemicalName` VARCHAR(191) NOT NULL,
    `manufacturerName` VARCHAR(191) NULL,
    `supplier` VARCHAR(191) NULL,
    `maxQuantity` VARCHAR(191) NULL,
    `DGClass` VARCHAR(191) NULL,
    `subRisk` VARCHAR(191) NULL,
    `PG` VARCHAR(191) NULL,
    `riskPhrase` VARCHAR(191) NULL,
    `hazSub` BOOLEAN NOT NULL,
    `poisonSchedule` VARCHAR(191) NULL,
    `currentSDS` DATETIME(3) NULL,
    `dateReceived` DATETIME(3) NULL,
    `expiryDate` DATETIME(3) NULL,
    `dateOpened` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `laboratoriesId` VARCHAR(191) NULL,
    `requestId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LaboratoryRequests` (
    `id` INTEGER NOT NULL,
    `requestorId` VARCHAR(191) NOT NULL,
    `controlNumber` VARCHAR(191) NULL,
    `schoolYear` VARCHAR(191) NULL,
    `forSubject` VARCHAR(191) NULL,
    `concurrentTopic` VARCHAR(191) NULL,
    `unitId` VARCHAR(191) NOT NULL,
    `teacherInChargeId` VARCHAR(191) NOT NULL,
    `Laboratory_Reservation_Id` VARCHAR(191) NOT NULL,
    `otherGroupMembers` JSON NULL,
    `isSignedByTeacher` BOOLEAN NOT NULL DEFAULT false,
    `isSignedByAdmin` BOOLEAN NOT NULL DEFAULT false,
    `signedTeacherId` VARCHAR(191) NOT NULL,
    `signedAdminId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_studentsId_fkey` FOREIGN KEY (`studentsId`) REFERENCES `Students`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_teachersId_fkey` FOREIGN KEY (`teachersId`) REFERENCES `Teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_adminsId_fkey` FOREIGN KEY (`adminsId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_gradeSectionId_fkey` FOREIGN KEY (`gradeSectionId`) REFERENCES `GradeSection`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Laboratories` ADD CONSTRAINT `Laboratories_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `LaboratoryLocations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryLocations` ADD CONSTRAINT `LaboratoryLocations_inventoryOfMaterialsSupplyId_fkey` FOREIGN KEY (`inventoryOfMaterialsSupplyId`) REFERENCES `InventoryOfMaterials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryLocations` ADD CONSTRAINT `LaboratoryLocations_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `InventoryOfEqupiment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryLocations` ADD CONSTRAINT `LaboratoryLocations_reagentId_fkey` FOREIGN KEY (`reagentId`) REFERENCES `InventoryOfReagents`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryReservations` ADD CONSTRAINT `LaboratoryReservations_laboratoryId_fkey` FOREIGN KEY (`laboratoryId`) REFERENCES `Laboratories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfMaterials` ADD CONSTRAINT `InventoryOfMaterials_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `Laboratories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfMaterials` ADD CONSTRAINT `InventoryOfMaterials_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfEqupiment` ADD CONSTRAINT `InventoryOfEqupiment_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `Laboratories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfEqupiment` ADD CONSTRAINT `InventoryOfEqupiment_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfReagents` ADD CONSTRAINT `InventoryOfReagents_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `Laboratories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfReagents` ADD CONSTRAINT `InventoryOfReagents_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_requestorId_fkey` FOREIGN KEY (`requestorId`) REFERENCES `Students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_teacherInChargeId_fkey` FOREIGN KEY (`teacherInChargeId`) REFERENCES `Teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_Laboratory_Reservation_Id_fkey` FOREIGN KEY (`Laboratory_Reservation_Id`) REFERENCES `LaboratoryReservations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_signedTeacherId_fkey` FOREIGN KEY (`signedTeacherId`) REFERENCES `Teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_signedAdminId_fkey` FOREIGN KEY (`signedAdminId`) REFERENCES `Admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
