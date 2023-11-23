-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('PROCESSING', 'DELIVERING', 'WAIT_FOR_PAYMENT', 'SUCCESS', 'CANCELED');

-- CreateEnum
CREATE TYPE "payment_method" AS ENUM ('CASH');

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "comment" VARCHAR(1024),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewMedia" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(512) NOT NULL,
    "review_id" INTEGER,

    CONSTRAINT "ReviewMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Review_product_id_idx" ON "Review" USING HASH ("product_id");

-- CreateIndex
CREATE INDEX "ReviewMedia_review_id_idx" ON "ReviewMedia" USING HASH ("review_id");

-- AddForeignKey
ALTER TABLE "ReviewMedia" ADD CONSTRAINT "ReviewMedia_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
