-- CreateTable
CREATE TABLE "Love" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "product_id" INTEGER,

    CONSTRAINT "Love_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Love_product_id_idx" ON "Love" USING HASH ("product_id");

-- AddForeignKey
ALTER TABLE "Love" ADD CONSTRAINT "Love_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
