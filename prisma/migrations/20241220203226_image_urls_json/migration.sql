/*
  Warnings:

  - You are about to alter the column `imageUrls` on the `Invite` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Invite` MODIFY `imageUrls` JSON NOT NULL;
