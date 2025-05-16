from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.models.base import Base

class Announcement(Base):
    __tablename__ = 'announcements'

    id = Column(Integer, primary_key=True, autoincrement=True)
    message = Column(String, nullable=False)
    priority = Column(String, default="normal")  # 新增字段
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)  # 新增字段
