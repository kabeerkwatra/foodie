/*
  Warnings:

  - You are about to drop the column `name` on the `restaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[res_name]` on the table `restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `res_name` to the `restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "restaurant_name_key";

-- AlterTable
ALTER TABLE "restaurant" DROP COLUMN "name",
ADD COLUMN     "res_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_res_name_key" ON "restaurant"("res_name");
