from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date

class AnnouncementCreate(BaseModel):
    message: str
    priority: Optional[str] = "normal"  # 可选值如 normal, high, urgent
    expires_at: Optional[datetime] = None

class AnnouncementRead(BaseModel):
    id: int
    message: str
    priority: Optional[str]
    created_at: datetime
    expires_at: Optional[datetime]

    class Config:
        orm_mode = True

class AnnouncementFilterParams(BaseModel):
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    page: int = 1
    limit: int = 10

class AnnouncementListResponse(BaseModel):
    total: int
    announcements: List[AnnouncementRead]
