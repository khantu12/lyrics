/*
  Warnings:

  - You are about to drop the `LineToAnnotation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LineToAnnotation" DROP CONSTRAINT "LineToAnnotation_annotationId_fkey";

-- DropForeignKey
ALTER TABLE "LineToAnnotation" DROP CONSTRAINT "LineToAnnotation_lineId_fkey";

-- DropTable
DROP TABLE "LineToAnnotation";

-- CreateTable
CREATE TABLE "_AnnotationToLine" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnnotationToLine_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AnnotationToLine_B_index" ON "_AnnotationToLine"("B");

-- AddForeignKey
ALTER TABLE "_AnnotationToLine" ADD CONSTRAINT "_AnnotationToLine_A_fkey" FOREIGN KEY ("A") REFERENCES "Annotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnnotationToLine" ADD CONSTRAINT "_AnnotationToLine_B_fkey" FOREIGN KEY ("B") REFERENCES "Line"("id") ON DELETE CASCADE ON UPDATE CASCADE;
