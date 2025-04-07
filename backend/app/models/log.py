from sqlalchemy import Column, Integer, String, Date, ForeignKey, func
from sqlalchemy.orm import relationship
from .base import Base

class Log(Base):
    __tablename__ = 'logs'

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String(50), nullable=False)
    description = Column(String(255), nullable=True)

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    user = relationship("User", back_populates="logs")

    status = Column(String(50), nullable=False)
    timestamp = Column(Date, nullable=False, default=func.now())

    def __repr__(self):
        return f"<Log(action={self.action}, description={self.description}, status={self.status}, timestamp={self.timestamp})>"