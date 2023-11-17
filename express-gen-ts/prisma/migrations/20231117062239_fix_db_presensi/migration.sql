/*
  Warnings:

  - Made the column `time_in` on table `Presensi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time_out` on table `Presensi` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Presensi" ALTER COLUMN "time_in" SET NOT NULL,
ALTER COLUMN "time_in" SET DATA TYPE TIME,
ALTER COLUMN "time_out" SET NOT NULL,
ALTER COLUMN "time_out" SET DATA TYPE TIME;
