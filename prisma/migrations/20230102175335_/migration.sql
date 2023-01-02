/*
  Warnings:

  - Added the required column `brand` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipment` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "equipment" TEXT NOT NULL;
