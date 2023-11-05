-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "description" VARCHAR(1000) NOT NULL DEFAULT '',
    "amount" INTEGER NOT NULL DEFAULT 1,
    "shop_id" INTEGER,
    "tag_id" INTEGER,
    "discount" INTEGER,
    "discount_start" TIMESTAMP(3),
    "discount_end" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
