from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from .base import Base

class Request(Base):
    __tablename__ = 'requests'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True, nullable=False)
    category = Column(String(50), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit = Column(String(50), nullable=False)
    status = Column(Enum("OPENED", "CLOSED"), nullable=False)

    quotations = relationship("Quotation", back_populates="request")

    def __repr__(self):
        return f"<Request(name={self.name}, category={self.category}, quantity={self.quantity}, unit={self.unit})>"