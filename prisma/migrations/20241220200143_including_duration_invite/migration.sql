/*
  Warnings:

  - Added the required column `duration_invite` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invite` ADD COLUMN `duration_invite` DATETIME(3) NOT NULL;
