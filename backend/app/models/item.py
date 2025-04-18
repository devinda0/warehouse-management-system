from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True, nullable=False)
    sku = Column(String(50), unique=True, index=True, nullable=False)
    category = Column(String(50), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit = Column(String(50), nullable=False)
    price = Column(Integer, nullable=False)
    expiration_date = Column(Date, nullable=False)
    space = Column(Integer, nullable=False)

    def __repr__(self):
        return f"<Item(name={self.name}, sku={self.sku}, category={self.category}, quantity={self.quantity}, unit={self.unit}, price={self.price}, expiration_date={self.expiration_date}, space={self.space})>"
    