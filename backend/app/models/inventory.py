from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Inventory(Base):
    __tablename__ = 'inventories'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True, nullable=False)
    sku = Column(String(50), unique=True, index=True, nullable=False)
    category = Column(String(50), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit = Column(String(50), nullable=False)
    price = Column(Integer, nullable=False)
    expiration_date = Column(Date, nullable=False)

    warehouse_id = Column(Integer, ForeignKey('warehouses.id'), nullable=False)
    warehouse = relationship("Warehouse", back_populates="inventories")

    def __repr__(self):
        return f"<Inventory(name={self.name}, sku={self.sku}, category={self.category}, quantity={self.quantity}, unit={self.unit}, price={self.price}, expiration_date={self.expiration_date})>"
    