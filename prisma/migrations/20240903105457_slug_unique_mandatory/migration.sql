/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Place` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Place` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Place" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Place_slug_key" ON "Place"("slug");
