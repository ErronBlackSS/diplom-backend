/*
  Warnings:

  - Added the required column `description` to the `course_module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `course_module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `module_lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course_module" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "module_lesson" ADD COLUMN     "order" INTEGER NOT NULL;
