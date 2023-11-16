/*
  Warnings:

  - You are about to drop the column `time` on the `GCO` table. All the data in the column will be lost.
  - Added the required column `time_in` to the `GCO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_out` to the `GCO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GCO" DROP COLUMN "time",
ADD COLUMN     "time_in" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time_out" TIMESTAMP(3) NOT NULL;
