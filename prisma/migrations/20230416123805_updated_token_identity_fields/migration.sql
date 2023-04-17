-- AlterTable
ALTER TABLE "user_refresh_tokens" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "device" TEXT,
ADD COLUMN     "expiredDate" TIMESTAMP(3),
ADD COLUMN     "ip" TEXT,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "ua" TEXT,
ADD COLUMN     "vendor" TEXT;
