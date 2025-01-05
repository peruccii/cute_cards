/*
  Warnings:

  - Added the required column `payment_status` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invite` ADD COLUMN `payment_status` ENUM('pending', 'accredited') NOT NULL;
