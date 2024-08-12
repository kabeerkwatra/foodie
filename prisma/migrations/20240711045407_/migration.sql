/*
  Warnings:

  - Added the required column `pincode` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "pincode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "restaurant" (
    "name" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "cuisine" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "rider" (
    "username" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_name_key" ON "restaurant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rider_username_key" ON "rider"("username");
