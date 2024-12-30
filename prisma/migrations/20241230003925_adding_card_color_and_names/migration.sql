/*
  Warnings:

  - Added the required column `card_color` to the `Invite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `names` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invite` ADD COLUMN `card_color` VARCHAR(191) NOT NULL,
    ADD COLUMN `names` VARCHAR(191) NOT NULL;
