from sqlalchemy import (TIMESTAMP, Boolean, Column, Float, ForeignKey, Integer, Enum, DateTime,
                        String, text, event)
from sqlalchemy.orm import relationship
from database import Base
import datetime


class ShopInfo(Base):
    __tablename__ = "ShopInfo"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=True)
    avatar = Column(String(1024), nullable=True)
    address = Column(String(1024), nullable=True)
    phone = Column(String(15), nullable=True)
    tax_code = Column(String(50), nullable=True)
    user_id = Column(Integer, ForeignKey('User.id'), nullable=True)
    active = Column(Boolean, default=True)

    User = relationship("User", back_populates="ShopInfo")

    def __str__(self):
        return self.name
