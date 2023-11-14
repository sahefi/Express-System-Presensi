-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "id_jabatan" TEXT;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_id_jabatan_fkey" FOREIGN KEY ("id_jabatan") REFERENCES "Jabatan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
