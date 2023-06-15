-- CreateTable
CREATE TABLE "CourseImage" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "CourseImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseImage_courseId_key" ON "CourseImage"("courseId");

-- AddForeignKey
ALTER TABLE "CourseImage" ADD CONSTRAINT "CourseImage_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
