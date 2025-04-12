from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Supplier(Base):
    __tablename__ = 'suppliers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    address = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)

    user_id = Column(Integer, ForeignKey('users.id'), unique=True, nullable=False)
    user = relationship("User", back_populates="supplier")

    quotations = relationship("Quotation", back_populates="supplier")

    def __repr__(self):
        return f"<Supplier(name={self.name}, email={self.email}, address={self.address}, phone={self.phone})>"