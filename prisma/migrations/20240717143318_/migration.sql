-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "id_comment" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "body" TEXT,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comments_id_comment_key" ON "Comments"("id_comment");
