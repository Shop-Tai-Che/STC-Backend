from sqlalchemy import (TIMESTAMP, Boolean, Column, Float, ForeignKey, Integer, Enum, DateTime,
                        String, text, event)
from sqlalchemy.orm import relationship
from database import Base
import datetime

class ProductMedia(Base):
    __tablename__ = "ProductMedia"

    id = Column(Integer, primary_key=True)
    url = Column(String(512))
    product_id = Column(Integer, ForeignKey('Product.id'), nullable=True)
    sequence = Column(Integer, default=0)

    product = relationship("Product", back_populates="images")

    def __str__(self):
        return self.url
