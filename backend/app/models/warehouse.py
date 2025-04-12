from sqlalchemy import String, Integer, Column
from .base import Base


class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True, nullable=False)
    address = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    avilable_capacity = Column(Integer, nullable=False)
    current_capacity = Column(Integer, nullable=False)

    def __repr__(self):
        return (
            f"<Warehouse(name={self.name}, address={self.address}, phone={self.phone})>"
        )
