-- CreateTable
CREATE TABLE "course_module" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "course_module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_lesson" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "module_lesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course_module" ADD CONSTRAINT "course_module_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_lesson" ADD CONSTRAINT "module_lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "course_module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
