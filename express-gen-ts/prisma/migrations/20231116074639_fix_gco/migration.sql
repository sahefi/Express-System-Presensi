/*
  Warnings:

  - You are about to drop the `GCO` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GCO";

-- CreateTable
CREATE TABLE "Gco" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "time_in" TIMESTAMP(3) NOT NULL,
    "time_out" TIMESTAMP(3) NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,

    CONSTRAINT "Gco_pkey" PRIMARY KEY ("id")
);
