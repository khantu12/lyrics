-- CreateTable
CREATE TABLE "LineToAnnotation" (
    "annotationId" INTEGER NOT NULL,
    "lineId" INTEGER NOT NULL,

    CONSTRAINT "LineToAnnotation_pkey" PRIMARY KEY ("annotationId","lineId")
);

-- AddForeignKey
ALTER TABLE "LineToAnnotation" ADD CONSTRAINT "LineToAnnotation_annotationId_fkey" FOREIGN KEY ("annotationId") REFERENCES "Annotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineToAnnotation" ADD CONSTRAINT "LineToAnnotation_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "Line"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
