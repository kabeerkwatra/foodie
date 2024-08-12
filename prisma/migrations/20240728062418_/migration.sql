-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_rider_name_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "rider_name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_rider_name_fkey" FOREIGN KEY ("rider_name") REFERENCES "rider"("rider_name") ON DELETE SET NULL ON UPDATE CASCADE;
