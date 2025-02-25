-- CreateTable
CREATE TABLE "Line" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Annotation" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "range" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Annotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnnotationToLine" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AnnotationToLine_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AnnotationToLine_B_index" ON "_AnnotationToLine"("B");

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Annotation" ADD CONSTRAINT "Annotation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnnotationToLine" ADD CONSTRAINT "_AnnotationToLine_A_fkey" FOREIGN KEY ("A") REFERENCES "Annotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnnotationToLine" ADD CONSTRAINT "_AnnotationToLine_B_fkey" FOREIGN KEY ("B") REFERENCES "Line"("id") ON DELETE CASCADE ON UPDATE CASCADE;
