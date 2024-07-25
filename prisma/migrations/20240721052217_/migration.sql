-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "res_name" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_res_name_key" ON "MenuItem"("res_name");

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_res_name_fkey" FOREIGN KEY ("res_name") REFERENCES "restaurant"("res_name") ON DELETE RESTRICT ON UPDATE CASCADE;
