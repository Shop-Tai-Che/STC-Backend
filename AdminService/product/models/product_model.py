from sqlalchemy import (TIMESTAMP, Boolean, Column, Float, ForeignKey, Integer, Enum, DateTime,
                        String, text, event)
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Product(Base):
    __tablename__ = "Product"

    id = Column(Integer, primary_key=True)
    title = Column(String(128), nullable=False)
    price = Column(Integer, default=0)
    description = Column(String(1000), default="")
    amount = Column(Integer, default=1)
    shop_id = Column(Integer, nullable=True)
    tag_id = Column(Integer, ForeignKey('Tag.id'), nullable=True)
    discount = Column(Integer, nullable=True)
    discount_start = Column(DateTime, nullable=True)
    discount_end = Column(DateTime, nullable=True)

    tag = relationship("Tag", back_populates="products")
    loves = relationship("Love", back_populates="product")
    images = relationship("ProductMedia", back_populates="product")

    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    updated_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )


    def __str__(self):
        return self.title
