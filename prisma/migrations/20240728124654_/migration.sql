/*
  Warnings:

  - The primary key for the `restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `rider` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "restaurant" DROP CONSTRAINT "restaurant_pkey",
ADD CONSTRAINT "restaurant_pkey" PRIMARY KEY ("res_name");

-- AlterTable
ALTER TABLE "rider" DROP CONSTRAINT "rider_pkey",
ADD CONSTRAINT "rider_pkey" PRIMARY KEY ("rider_name");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("username");
