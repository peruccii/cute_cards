/*
  Warnings:

  - Added the required column `createdAt` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invite` ADD COLUMN `createdAt` DATETIME(3) NOT NULL;
