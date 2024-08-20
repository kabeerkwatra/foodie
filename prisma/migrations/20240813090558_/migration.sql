/*
  Warnings:

  - Made the column `rider_name` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_rider_name_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_username_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "rider_name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_username_fkey" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_rider_name_fkey" FOREIGN KEY ("rider_name") REFERENCES "rider"("rider_name") ON DELETE RESTRICT ON UPDATE CASCADE;
