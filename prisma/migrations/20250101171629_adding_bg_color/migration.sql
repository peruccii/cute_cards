/*
  Warnings:

  - Added the required column `bg_color` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invite` ADD COLUMN `bg_color` VARCHAR(191) NOT NULL;
