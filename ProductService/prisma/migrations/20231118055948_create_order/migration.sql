-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('PROCESSING', 'DELIVERING', 'WAIT_FOR_PAYMENT', 'SUCCESS', 'CANCELED');

-- CreateEnum
CREATE TYPE "PAYMENT_METHOD" AS ENUM ('CASH');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "shop_id" INTEGER,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "ship_fee" INTEGER NOT NULL DEFAULT 0,
    "payment_method" "PAYMENT_METHOD" NOT NULL DEFAULT 'CASH',
    "address" VARCHAR(256) NOT NULL,
    "note" VARCHAR(256) NOT NULL,
    "status" "ORDER_STATUS" NOT NULL DEFAULT 'PROCESSING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Order_user_id_idx" ON "Order" USING HASH ("user_id");
