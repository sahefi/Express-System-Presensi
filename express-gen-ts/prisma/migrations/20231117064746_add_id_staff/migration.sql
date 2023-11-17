/*
  Warnings:

  - Added the required column `id_staff` to the `Presensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Presensi" ADD COLUMN     "id_staff" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Presensi" ADD CONSTRAINT "Presensi_id_staff_fkey" FOREIGN KEY ("id_staff") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
