-- CreateTable
CREATE TABLE `Invite` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `url_music` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `sub_title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `imageUrls` VARCHAR(191) NOT NULL,
    `invite_type` ENUM('LOVE', 'BESTFRIENDS', 'BIRTHDAY') NOT NULL,
    `invite_plan` ENUM('BASIC', 'PREMIUM') NOT NULL,

    INDEX `Invite_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
