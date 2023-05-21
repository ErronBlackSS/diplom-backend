/*
  Warnings:

  - You are about to drop the `LessonStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test_step` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `order` to the `test_answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LessonStep" DROP CONSTRAINT "LessonStep_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "test_answer" DROP CONSTRAINT "test_answer_testId_fkey";

-- DropForeignKey
ALTER TABLE "test_step" DROP CONSTRAINT "test_step_stepId_fkey";

-- AlterTable
ALTER TABLE "test_answer" ADD COLUMN     "order" INTEGER NOT NULL;

-- DropTable
DROP TABLE "LessonStep";

-- DropTable
DROP TABLE "test_step";

-- CreateTable
CREATE TABLE "lesson_step" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "type" "StepType" NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "lesson_step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stepId" INTEGER NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_stepId_key" ON "test"("stepId");

-- AddForeignKey
ALTER TABLE "lesson_step" ADD CONSTRAINT "lesson_step_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "module_lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "lesson_step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_answer" ADD CONSTRAINT "test_answer_testId_fkey" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
