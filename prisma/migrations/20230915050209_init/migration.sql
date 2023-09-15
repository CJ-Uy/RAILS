-- CreateTable
CREATE TABLE `SchoolYear` (
    `id` VARCHAR(191) NOT NULL,
    `yearStart` INTEGER NOT NULL,
    `yearEnd` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `currentSchoolYear` BOOLEAN NOT NULL DEFAULT false,
    `campus` VARCHAR(191) NOT NULL DEFAULT 'EASTERN VISAYAS CAMPUS',
    `materialEquipmentRequestControlNumberCounter` INTEGER NOT NULL DEFAULT 0,
    `equipmentRequestControlNumberCounter` INTEGER NOT NULL DEFAULT 0,
    `reagentRequestControlNumberCounter` INTEGER NOT NULL DEFAULT 0,
    `laboratoryRequestControlNumberCounter` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `signature` MEDIUMTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teachers` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `signature` MEDIUMTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Students` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `gradeSectionId` VARCHAR(191) NULL,
    `grade` INTEGER NULL,
    `section` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChangeRoleRequests` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `wantedRole` ENUM('STUDENT', 'TEACHER', 'ADMIN') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GradeSection` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `grade` INTEGER NOT NULL,
    `section` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Units` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `frequencyRank` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `Units_frequencyRank_key`(`frequencyRank`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Laboratories` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `locationId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LaboratoryLocations` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `inventoryOfMaterialsSupplyId` VARCHAR(191) NULL,
    `equipmentId` VARCHAR(191) NULL,
    `reagentId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LaboratoryReservations` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `controlNumber` VARCHAR(191) NOT NULL,
    `laboratoryId` VARCHAR(191) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `laboratoryRequestId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryOfMaterials` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `itemName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `additionalPurchase` INTEGER NULL,
    `make` VARCHAR(191) NULL,
    `supplier` VARCHAR(191) NULL,
    `dateReceived` DATETIME(3) NULL,
    `quantity` INTEGER NULL DEFAULT 1,
    `unit` VARCHAR(191) NOT NULL,
    `unitCost` DOUBLE NULL,
    `borrowed` BOOLEAN NOT NULL DEFAULT false,
    `available` BOOLEAN NOT NULL DEFAULT true,
    `damage` VARCHAR(191) NULL,
    `balancePerCard` INTEGER NULL,
    `balancePerCount` INTEGER NULL,
    `laboratoriesId` VARCHAR(191) NULL,
    `schoolYearId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryOfEqupiment` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `equipmentName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `available` BOOLEAN NOT NULL DEFAULT true,
    `serialNumber` VARCHAR(191) NULL,
    `modelNoOrManufacturer` VARCHAR(191) NULL,
    `quantity` INTEGER NULL DEFAULT 1,
    `unit` VARCHAR(191) NULL,
    `unitCost` DOUBLE NULL,
    `dateReceived` DATETIME(3) NULL,
    `propertyNumber` VARCHAR(191) NULL,
    `acquisitionType` VARCHAR(191) NULL,
    `supplier` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `laboratoriesId` VARCHAR(191) NULL,
    `schoolYearId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryOfReagents` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `casNumber` VARCHAR(191) NULL,
    `code` VARCHAR(191) NOT NULL,
    `chemicalName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `classification` VARCHAR(191) NULL,
    `manufacturerName` VARCHAR(191) NULL,
    `supplier` VARCHAR(191) NULL,
    `available` BOOLEAN NOT NULL DEFAULT true,
    `currentQuantity` DOUBLE NULL,
    `maxQuantity` DOUBLE NULL,
    `unit` VARCHAR(191) NULL,
    `DGClass` VARCHAR(191) NULL,
    `subRisk` VARCHAR(191) NULL,
    `PG` VARCHAR(191) NULL,
    `riskPhrase` VARCHAR(191) NULL,
    `safetyPhrase` VARCHAR(191) NULL,
    `hazSub` BOOLEAN NULL,
    `poisonSchedule` VARCHAR(191) NULL,
    `currentSDS` DATETIME(3) NULL,
    `dateReceived` DATETIME(3) NULL,
    `expiryDate` DATETIME(3) NULL,
    `dateOpened` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `laboratoriesId` VARCHAR(191) NULL,
    `schoolYearId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquipmentRequests` (
    `id` VARCHAR(191) NOT NULL,
    `controlNumber` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `modelNoOrManufacturer` VARCHAR(191) NULL,
    `laboratoryRequestsId` VARCHAR(191) NOT NULL,
    `schoolYearId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialRequests` (
    `id` VARCHAR(191) NOT NULL,
    `controlNumber` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `laboratoryRequestId` VARCHAR(191) NOT NULL,
    `schoolYearId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReagentRequests` (
    `id` VARCHAR(191) NOT NULL,
    `controlNumber` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `laboratoryRequestsId` VARCHAR(191) NOT NULL,
    `schoolYearId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LaboratoryRequests` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `requestorId` VARCHAR(191) NOT NULL,
    `forSubject` VARCHAR(191) NULL,
    `concurrentTopic` VARCHAR(191) NULL,
    `noOfStudents` INTEGER NULL,
    `otherGroupMembers` JSON NULL,
    `gradeSectionId` VARCHAR(191) NOT NULL,
    `unitId` VARCHAR(191) NOT NULL,
    `teacherInChargeId` VARCHAR(191) NOT NULL,
    `independentTime` JSON NULL,
    `independentLocation` VARCHAR(191) NULL,
    `isSignedByTeacher` BOOLEAN NOT NULL DEFAULT false,
    `isSignedByAdmin` BOOLEAN NOT NULL DEFAULT false,
    `signedTeacherId` VARCHAR(191) NULL,
    `signedAdminId` VARCHAR(191) NULL,
    `schoolYearId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InventoryOfMaterialsToMaterialRequests` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_InventoryOfMaterialsToMaterialRequests_AB_unique`(`A`, `B`),
    INDEX `_InventoryOfMaterialsToMaterialRequests_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InventoryOfReagentsToReagentRequests` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_InventoryOfReagentsToReagentRequests_AB_unique`(`A`, `B`),
    INDEX `_InventoryOfReagentsToReagentRequests_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EquipmentRequestsToInventoryOfEqupiment` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_EquipmentRequestsToInventoryOfEqupiment_AB_unique`(`A`, `B`),
    INDEX `_EquipmentRequestsToInventoryOfEqupiment_B_index`(`B`)
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
ALTER TABLE `ChangeRoleRequests` ADD CONSTRAINT `ChangeRoleRequests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `LaboratoryReservations` ADD CONSTRAINT `LaboratoryReservations_laboratoryRequestId_fkey` FOREIGN KEY (`laboratoryRequestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfMaterials` ADD CONSTRAINT `InventoryOfMaterials_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `Laboratories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfMaterials` ADD CONSTRAINT `InventoryOfMaterials_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfEqupiment` ADD CONSTRAINT `InventoryOfEqupiment_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `Laboratories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfEqupiment` ADD CONSTRAINT `InventoryOfEqupiment_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfReagents` ADD CONSTRAINT `InventoryOfReagents_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `Laboratories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryOfReagents` ADD CONSTRAINT `InventoryOfReagents_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentRequests` ADD CONSTRAINT `EquipmentRequests_laboratoryRequestsId_fkey` FOREIGN KEY (`laboratoryRequestsId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentRequests` ADD CONSTRAINT `EquipmentRequests_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialRequests` ADD CONSTRAINT `MaterialRequests_laboratoryRequestId_fkey` FOREIGN KEY (`laboratoryRequestId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialRequests` ADD CONSTRAINT `MaterialRequests_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReagentRequests` ADD CONSTRAINT `ReagentRequests_laboratoryRequestsId_fkey` FOREIGN KEY (`laboratoryRequestsId`) REFERENCES `LaboratoryRequests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReagentRequests` ADD CONSTRAINT `ReagentRequests_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_requestorId_fkey` FOREIGN KEY (`requestorId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_gradeSectionId_fkey` FOREIGN KEY (`gradeSectionId`) REFERENCES `GradeSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_teacherInChargeId_fkey` FOREIGN KEY (`teacherInChargeId`) REFERENCES `Teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_signedTeacherId_fkey` FOREIGN KEY (`signedTeacherId`) REFERENCES `Teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_signedAdminId_fkey` FOREIGN KEY (`signedAdminId`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaboratoryRequests` ADD CONSTRAINT `LaboratoryRequests_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `SchoolYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InventoryOfMaterialsToMaterialRequests` ADD CONSTRAINT `_InventoryOfMaterialsToMaterialRequests_A_fkey` FOREIGN KEY (`A`) REFERENCES `InventoryOfMaterials`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InventoryOfMaterialsToMaterialRequests` ADD CONSTRAINT `_InventoryOfMaterialsToMaterialRequests_B_fkey` FOREIGN KEY (`B`) REFERENCES `MaterialRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InventoryOfReagentsToReagentRequests` ADD CONSTRAINT `_InventoryOfReagentsToReagentRequests_A_fkey` FOREIGN KEY (`A`) REFERENCES `InventoryOfReagents`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InventoryOfReagentsToReagentRequests` ADD CONSTRAINT `_InventoryOfReagentsToReagentRequests_B_fkey` FOREIGN KEY (`B`) REFERENCES `ReagentRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentRequestsToInventoryOfEqupiment` ADD CONSTRAINT `_EquipmentRequestsToInventoryOfEqupiment_A_fkey` FOREIGN KEY (`A`) REFERENCES `EquipmentRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EquipmentRequestsToInventoryOfEqupiment` ADD CONSTRAINT `_EquipmentRequestsToInventoryOfEqupiment_B_fkey` FOREIGN KEY (`B`) REFERENCES `InventoryOfEqupiment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
