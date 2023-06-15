-- CreateTable
CREATE TABLE "users_on_course" (
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_on_course_userId_courseId_key" ON "users_on_course"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "users_on_course" ADD CONSTRAINT "users_on_course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_course" ADD CONSTRAINT "users_on_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
