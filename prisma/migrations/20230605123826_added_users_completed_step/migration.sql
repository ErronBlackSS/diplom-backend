-- CreateTable
CREATE TABLE "users_passed_reglament" (
    "userId" INTEGER NOT NULL,
    "stepId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_passed_reglament_userId_stepId_key" ON "users_passed_reglament"("userId", "stepId");

-- AddForeignKey
ALTER TABLE "users_passed_reglament" ADD CONSTRAINT "users_passed_reglament_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_passed_reglament" ADD CONSTRAINT "users_passed_reglament_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "lesson_step"("id") ON DELETE CASCADE ON UPDATE CASCADE;
