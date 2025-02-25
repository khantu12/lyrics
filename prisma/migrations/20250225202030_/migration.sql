/*
  Warnings:

  - You are about to drop the `_AnnotationToLine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AnnotationToLine" DROP CONSTRAINT "_AnnotationToLine_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnnotationToLine" DROP CONSTRAINT "_AnnotationToLine_B_fkey";

-- DropTable
DROP TABLE "_AnnotationToLine";
