from sqlalchemy import Column, Integer, String, Date
from .base import Base

class Worker(Base):
    __tablename__ = 'workers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    address = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    birthday = Column(Date, nullable=False)
    salary = Column(Integer, nullable=False) 

    def __repr__(self):
        return f"<Employee(name={self.name}, email={self.email}, address={self.address}, salary={self.salary}, phone={self.phone}, birthday={self.birthday})>"