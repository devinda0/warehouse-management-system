from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from .base import Base


class Quotation(Base):
    __tablename__ = "quotations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True, nullable=False)
    category = Column(String(50), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit = Column(String(50), nullable=False)
    price = Column(Integer, nullable=False)
    expiration_date = Column(Date, nullable=False)
    status = Column(Enum('PENDING', 'APPROVED', 'REJECTED'), nullable=False, default='PENDING')

    supplier_id = Column(Integer, ForeignKey('suppliers.id'), nullable=False)
    supplier = relationship("Supplier", back_populates="quotations")

    request_id = Column(Integer, ForeignKey('requests.id'), nullable=False)
    request = relationship("Request", back_populates="quotations")

    def __repr__(self):
        return f"<Quotation(name={self.name}, category={self.category}, quantity={self.quantity}, unit={self.unit}, price={self.price}, expiration_date={self.expiration_date})>"
