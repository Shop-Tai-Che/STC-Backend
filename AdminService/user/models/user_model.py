from sqlalchemy import (TIMESTAMP, Boolean, Column, Float, ForeignKey, Integer, Enum, DateTime,
                        String, text, event)
from sqlalchemy.orm import relationship
from database import Base
import datetime


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True)
    phone = Column(String(15), nullable=True)
    name = Column(String(100), nullable=True)
    zalo_id = Column(String(255), unique=True)
    avatar = Column(String(1024), nullable=True)
    active = Column(Boolean, default=True)

    Product = relationship("Product", back_populates="User")
    ShopInfo = relationship("ShopInfo", back_populates="User")
    Love = relationship("Love", back_populates="User")

    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    updated_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )

    def __str__(self):
        return self.name
