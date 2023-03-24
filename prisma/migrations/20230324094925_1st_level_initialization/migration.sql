-- CreateTable
CREATE TABLE `admins` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,
    `Firstname` VARCHAR(191) NOT NULL,
    `Lastname` VARCHAR(191) NOT NULL,
    `Signature` BLOB NULL,
    `Date_Created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,
    `Firstname` VARCHAR(191) NOT NULL,
    `Lastname` VARCHAR(191) NOT NULL,
    `Signature` BLOB NULL,
    `Date_Created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,
    `Firtname` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `Date_Created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `GradeSection_Code` INTEGER NOT NULL,
    `Grade` INTEGER NULL,
    `Section` VARCHAR(191) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grade_section` (
    `GradeSection_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Grade` INTEGER NOT NULL,
    `Section` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`GradeSection_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laboratories` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NULL,
    `Location_Id` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laboratory_locations` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NULL,
    `Date_Location_Added` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Date_Location_Removed` DATETIME(3) NULL,
    `inventory_of_materialsSupply_Id` INTEGER NULL,
    `inventory_of_equipmentLaboratory_Equipment_Id` INTEGER NULL,
    `inventory_of_reagentsReagent_Id` INTEGER NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laboratory_reservations` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Start_Time` DATETIME(3) NOT NULL,
    `End_Time` DATETIME(3) NOT NULL,
    `laboratoriesId` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory_of_materials` (
    `Supply_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Item_Name` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Additional_Purchase` INTEGER NULL,
    `Make` VARCHAR(191) NULL,
    `Supplier` VARCHAR(191) NULL,
    `Date_Received` DATETIME(3) NULL,
    `Quantity` INTEGER NOT NULL DEFAULT 0,
    `Unit` VARCHAR(191) NOT NULL,
    `Unit_Cost` DOUBLE NULL,
    `Borrowed` INTEGER NOT NULL DEFAULT 0,
    `Returned` INTEGER NOT NULL DEFAULT 0,
    `Damage` INTEGER NOT NULL DEFAULT 0,
    `Balance_per_Card` INTEGER NULL,
    `Balance_per_Count` INTEGER NULL,
    `laboratoriesId` INTEGER NULL,
    `laboratory_requestsRequest_Id` INTEGER NULL,

    PRIMARY KEY (`Supply_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory_of_equipment` (
    `Laboratory_Equipment_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Equipment_Code` VARCHAR(191) NOT NULL,
    `Equipment_Name` VARCHAR(191) NOT NULL,
    `Serial_Number` VARCHAR(191) NULL,
    `Model_No_or_Manufacturer` VARCHAR(191) NULL,
    `Description` VARCHAR(191) NULL,
    `Quantity` INTEGER NULL,
    `Unit` VARCHAR(191) NULL,
    `Unit_Cost` DOUBLE NULL,
    `Date_Received` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Property_Number` VARCHAR(191) NULL,
    `Acquisition_Type` VARCHAR(191) NULL,
    `Supplier` VARCHAR(191) NULL,
    `Status` VARCHAR(191) NULL,
    `laboratoriesId` INTEGER NULL,
    `laboratory_requestsRequest_Id` INTEGER NULL,

    PRIMARY KEY (`Laboratory_Equipment_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory_of_reagents` (
    `Reagent_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Item_Number` VARCHAR(191) NULL,
    `Cas_Number` VARCHAR(191) NULL,
    `Chemical_Name` VARCHAR(191) NOT NULL,
    `Manufacturer_Name` VARCHAR(191) NULL,
    `Supplier` VARCHAR(191) NULL,
    `Max_Quantity` VARCHAR(191) NULL,
    `DG_Class` VARCHAR(191) NULL,
    `Sub_Risk` VARCHAR(191) NULL,
    `PG` VARCHAR(191) NULL,
    `Risk_Phrase` VARCHAR(191) NULL,
    `Haz_Sub` BOOLEAN NOT NULL,
    `Poison_Schedule` VARCHAR(191) NULL,
    `Current_SDS` DATETIME(3) NULL,
    `Date_Received` DATETIME(3) NULL,
    `Expiry_Date` DATETIME(3) NULL,
    `Date_Opened` DATETIME(3) NULL,
    `Status` VARCHAR(191) NULL,
    `laboratoriesId` INTEGER NULL,
    `laboratory_requestsRequest_Id` INTEGER NULL,

    PRIMARY KEY (`Reagent_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laboratory_requests` (
    `Request_Id` INTEGER NOT NULL,
    `Requestor_Id` INTEGER NOT NULL,
    `Control_Number` VARCHAR(191) NULL,
    `School_Year` VARCHAR(191) NULL,
    `For_Subject` VARCHAR(191) NULL,
    `Concurrent_Topic` VARCHAR(191) NULL,
    `Unit` VARCHAR(191) NULL,
    `Teacher_In_Charge_Id` INTEGER NOT NULL,
    `Laboratory_Reservation_Id` INTEGER NOT NULL,
    `Other_Group_Members` JSON NOT NULL,
    `Is_Signed_By_Teacher` BOOLEAN NOT NULL DEFAULT false,
    `Is_Signed__By_Admin` BOOLEAN NOT NULL DEFAULT false,
    `Signed_Teacher_Id` INTEGER NOT NULL,
    `Signed_Admin_Id` INTEGER NOT NULL,

    PRIMARY KEY (`Request_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_GradeSection_Code_fkey` FOREIGN KEY (`GradeSection_Code`) REFERENCES `grade_section`(`GradeSection_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratories` ADD CONSTRAINT `laboratories_Location_Id_fkey` FOREIGN KEY (`Location_Id`) REFERENCES `laboratory_locations`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_locations` ADD CONSTRAINT `laboratory_locations_inventory_of_materialsSupply_Id_fkey` FOREIGN KEY (`inventory_of_materialsSupply_Id`) REFERENCES `inventory_of_materials`(`Supply_Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_locations` ADD CONSTRAINT `laboratory_locations_inventory_of_equipmentLaboratory_Equip_fkey` FOREIGN KEY (`inventory_of_equipmentLaboratory_Equipment_Id`) REFERENCES `inventory_of_equipment`(`Laboratory_Equipment_Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_locations` ADD CONSTRAINT `laboratory_locations_inventory_of_reagentsReagent_Id_fkey` FOREIGN KEY (`inventory_of_reagentsReagent_Id`) REFERENCES `inventory_of_reagents`(`Reagent_Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_reservations` ADD CONSTRAINT `laboratory_reservations_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `laboratories`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_of_materials` ADD CONSTRAINT `inventory_of_materials_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `laboratories`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_of_materials` ADD CONSTRAINT `inventory_of_materials_laboratory_requestsRequest_Id_fkey` FOREIGN KEY (`laboratory_requestsRequest_Id`) REFERENCES `laboratory_requests`(`Request_Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_of_equipment` ADD CONSTRAINT `inventory_of_equipment_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `laboratories`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_of_equipment` ADD CONSTRAINT `inventory_of_equipment_laboratory_requestsRequest_Id_fkey` FOREIGN KEY (`laboratory_requestsRequest_Id`) REFERENCES `laboratory_requests`(`Request_Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_of_reagents` ADD CONSTRAINT `inventory_of_reagents_laboratoriesId_fkey` FOREIGN KEY (`laboratoriesId`) REFERENCES `laboratories`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_of_reagents` ADD CONSTRAINT `inventory_of_reagents_laboratory_requestsRequest_Id_fkey` FOREIGN KEY (`laboratory_requestsRequest_Id`) REFERENCES `laboratory_requests`(`Request_Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_requests` ADD CONSTRAINT `laboratory_requests_Requestor_Id_fkey` FOREIGN KEY (`Requestor_Id`) REFERENCES `students`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_requests` ADD CONSTRAINT `laboratory_requests_Teacher_In_Charge_Id_fkey` FOREIGN KEY (`Teacher_In_Charge_Id`) REFERENCES `teachers`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_requests` ADD CONSTRAINT `laboratory_requests_Laboratory_Reservation_Id_fkey` FOREIGN KEY (`Laboratory_Reservation_Id`) REFERENCES `laboratory_reservations`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_requests` ADD CONSTRAINT `laboratory_requests_Signed_Teacher_Id_fkey` FOREIGN KEY (`Signed_Teacher_Id`) REFERENCES `teachers`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laboratory_requests` ADD CONSTRAINT `laboratory_requests_Signed_Admin_Id_fkey` FOREIGN KEY (`Signed_Admin_Id`) REFERENCES `admins`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
