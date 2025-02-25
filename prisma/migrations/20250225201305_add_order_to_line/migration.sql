/*
  Warnings:

  - Added the required column `order` to the `Line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Line" ADD COLUMN     "order" INTEGER NOT NULL;
