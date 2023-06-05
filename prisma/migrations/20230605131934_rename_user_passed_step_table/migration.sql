/*
  Warnings:

  - You are about to drop the `users_passed_reglament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_passed_reglament" DROP CONSTRAINT "users_passed_reglament_stepId_fkey";

-- DropForeignKey
ALTER TABLE "users_passed_reglament" DROP CONSTRAINT "users_passed_reglament_userId_fkey";

-- DropTable
DROP TABLE "users_passed_reglament";

-- CreateTable
CREATE TABLE "users_passed_step" (
    "userId" INTEGER NOT NULL,
    "stepId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_passed_step_userId_stepId_key" ON "users_passed_step"("userId", "stepId");

-- AddForeignKey
ALTER TABLE "users_passed_step" ADD CONSTRAINT "users_passed_step_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_passed_step" ADD CONSTRAINT "users_passed_step_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "lesson_step"("id") ON DELETE CASCADE ON UPDATE CASCADE;
