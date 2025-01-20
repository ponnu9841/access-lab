/*
  Warnings:

  - You are about to drop the `Banner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Banner";

-- CreateTable
CREATE TABLE "banner" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);
