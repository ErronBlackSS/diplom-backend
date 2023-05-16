-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('TEXT', 'TEST');

-- CreateTable
CREATE TABLE "LessonStep" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "type" "StepType" NOT NULL,

    CONSTRAINT "LessonStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LessonStep" ADD CONSTRAINT "LessonStep_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "module_lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
