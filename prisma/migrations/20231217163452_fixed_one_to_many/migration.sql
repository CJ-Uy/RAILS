/*
  Warnings:

  - You are about to drop the `_notificationstousers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_notificationstousers` DROP FOREIGN KEY `_NotificationsToUsers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_notificationstousers` DROP FOREIGN KEY `_NotificationsToUsers_B_fkey`;

-- AlterTable
ALTER TABLE `notifications` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_notificationstousers`;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
