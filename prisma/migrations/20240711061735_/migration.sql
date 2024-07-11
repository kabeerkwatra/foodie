-- AlterTable
ALTER TABLE "restaurant" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rider" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "rider_pkey" PRIMARY KEY ("id");
