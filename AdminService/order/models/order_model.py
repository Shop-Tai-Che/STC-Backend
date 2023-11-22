from sqlalchemy import (TIMESTAMP, Boolean, Column, Float, ForeignKey, Integer, Enum, DateTime,
                        String, text, event)
from sqlalchemy.orm import relationship
from database import Base
from enum import Enum as PyEnum


class PAYMENT_METHOD(PyEnum):
    CASH = 'CASH'


class ORDER_STATUS(PyEnum):
    PROCESSING = 'PROCESSING'
    DELIVERING = 'DELIVERING'
    WAIT_FOR_PAYMENT = 'WAIT_FOR_PAYMENT'
    SUCCESS = 'SUCCESS'
    CANCELED = 'CANCELED'


class Order(Base):
    __tablename__ = "Order"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=True, index=True)
    product_id = Column(Integer, ForeignKey('Product.id'), nullable=True)
    shop_id = Column(Integer, nullable=True)
    amount = Column(Integer, default=1)
    ship_fee = Column(Integer, default=20000)
    total_price = Column(Integer, default=0)
    payment_method = Column(Enum(PAYMENT_METHOD), default=PAYMENT_METHOD.CASH)
    address = Column(String(256))
    note = Column(String(256), nullable=True)
    status = Column(Enum(ORDER_STATUS), default=ORDER_STATUS.PROCESSING)

    product = relationship("Product", back_populates="orders")

    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )

    def __str__(self):
        return str(self.id or "noname")
