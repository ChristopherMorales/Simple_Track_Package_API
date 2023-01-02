/*
  Warnings:

  - A unique constraint covering the columns `[id,belongsToId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_id_belongsToId_key" ON "Order"("id", "belongsToId");
