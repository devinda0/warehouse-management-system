from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from .base import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(100), nullable=False)
    role = Column( String(50), nullable=False)

    supplier = relationship("Supplier", back_populates="user")
    user_worker = relationship("UserWorker", back_populates="user")
    manager = relationship("Manager", back_populates="user")
    logs = relationship("Log", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, role={self.role})>"