from sqlalchemy import (TIMESTAMP, Boolean, Column, Float, ForeignKey, Integer, Enum, DateTime,
                        String, text, event)
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Love(Base):
    __tablename__ = "Love"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('User.id'), nullable=True)
    product_id = Column(Integer, ForeignKey('Product.id'), nullable=True)

    product = relationship("Product", back_populates="loves")
    User = relationship("User", back_populates="Love")

    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )

    def __str__(self):
        return str(self.user_id or "noname")
