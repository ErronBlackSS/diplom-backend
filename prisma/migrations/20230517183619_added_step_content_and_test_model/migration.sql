/*
  Warnings:

  - Added the required column `content` to the `LessonStep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LessonStep" ADD COLUMN     "content" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "test_step" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stepId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "test_step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_answer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "isRight" BOOLEAN NOT NULL DEFAULT false,
    "testId" INTEGER NOT NULL,

    CONSTRAINT "test_answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_step_stepId_key" ON "test_step"("stepId");

-- AddForeignKey
ALTER TABLE "test_step" ADD CONSTRAINT "test_step_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "LessonStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_answer" ADD CONSTRAINT "test_answer_testId_fkey" FOREIGN KEY ("testId") REFERENCES "test_step"("id") ON DELETE CASCADE ON UPDATE CASCADE;
