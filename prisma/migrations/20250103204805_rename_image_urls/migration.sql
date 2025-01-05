/*
  Warnings:

  - You are about to drop the column `imageUrls` on the `Invite` table. All the data in the column will be lost.
  - Added the required column `image_urls` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invite` DROP COLUMN `imageUrls`,
    ADD COLUMN `image_urls` JSON NOT NULL;
