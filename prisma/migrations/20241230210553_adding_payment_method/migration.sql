/*
  Warnings:

  - Added the required column `payment_method` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invite` ADD COLUMN `payment_method` ENUM('PIX', 'STRIPE') NOT NULL;
