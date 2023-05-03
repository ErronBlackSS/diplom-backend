/*
  Warnings:

  - Made the column `description` on table `course_module` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "course_module" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';
