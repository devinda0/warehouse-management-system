from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class UserWorker(Base):
    __tablename__ = 'user_workers'

    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True, unique=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), primary_key=True, unique=True)

    user = relationship("User", back_populates="user_worker")
    worker = relationship("Worker", back_populates="user_worker")

    def __repr__(self):
        return f"<UserWorker(user_id={self.user_id}, worker_id={self.worker_id})>"