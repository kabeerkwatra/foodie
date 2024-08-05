/*
  Warnings:

  - You are about to drop the column `username` on the `rider` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rider_name]` on the table `rider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rider_name` to the `rider` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "rider_username_key";

-- AlterTable
ALTER TABLE "rider" DROP COLUMN "username",
ADD COLUMN     "rider_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "res_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rider_name" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "accepted_by_restaurant" BOOLEAN NOT NULL,
    "accepted_by_rider" BOOLEAN NOT NULL,
    "cooked" BOOLEAN NOT NULL,
    "picked_up" BOOLEAN NOT NULL,
    "delivered" BOOLEAN NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rider_rider_name_key" ON "rider"("rider_name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_res_name_fkey" FOREIGN KEY ("res_name") REFERENCES "restaurant"("res_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_username_fkey" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_rider_name_fkey" FOREIGN KEY ("rider_name") REFERENCES "rider"("rider_name") ON DELETE RESTRICT ON UPDATE CASCADE;
