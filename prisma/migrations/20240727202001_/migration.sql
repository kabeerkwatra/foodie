-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "accepted_by_restaurant" SET DEFAULT false,
ALTER COLUMN "accepted_by_rider" SET DEFAULT false,
ALTER COLUMN "cooked" SET DEFAULT false,
ALTER COLUMN "picked_up" SET DEFAULT false,
ALTER COLUMN "delivered" SET DEFAULT false;
