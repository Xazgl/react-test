/*
  Warnings:

  - A unique constraint covering the columns `[id_comment]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Comments_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Comments_id_comment_key" ON "Comments"("id_comment");
