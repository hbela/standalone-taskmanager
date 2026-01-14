-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "reminderTimes" INTEGER[] DEFAULT ARRAY[60, 1440]::INTEGER[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "expoPushToken" TEXT;
