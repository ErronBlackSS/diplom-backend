/*
  Warnings:

  - Added the required column `name` to the `module_lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "module_lesson" ADD COLUMN     "name" TEXT NOT NULL;
