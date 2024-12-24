/*
  Warnings:

  - You are about to drop the column `duration_invite` on the `Invite` table. All the data in the column will be lost.
  - Added the required column `expirationDate` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invite` DROP COLUMN `duration_invite`,
    ADD COLUMN `expirationDate` DATETIME(3) NOT NULL;
