/*
  Warnings:

  - Added the required column `ip` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `it` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ns` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payment` ADD COLUMN `ip` VARCHAR(191) NOT NULL,
    ADD COLUMN `it` VARCHAR(191) NOT NULL,
    ADD COLUMN `ns` VARCHAR(191) NOT NULL;
