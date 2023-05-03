/*
  Warnings:

  - Added the required column `name` to the `course_module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course_module" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
