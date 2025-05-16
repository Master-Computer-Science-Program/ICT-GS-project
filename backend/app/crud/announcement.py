from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.announcement import Announcement
from app.schemas.announcement import AnnouncementCreate, AnnouncementFilterParams
from typing import Tuple, List
from datetime import datetime

def create_announcement(db: Session, data: AnnouncementCreate) -> Announcement:
    new_announcement = Announcement(
        message=data.message,
        priority=data.priority,
        expires_at=data.expires_at
    )
    db.add(new_announcement)
    db.commit()
    db.refresh(new_announcement)
    return new_announcement

def get_announcements(db: Session, filters: AnnouncementFilterParams) -> Tuple[int, List[Announcement]]:
    query = db.query(Announcement)

    if filters.start_date:
        query = query.filter(Announcement.created_at >= filters.start_date)
    if filters.end_date:
        query = query.filter(Announcement.created_at <= filters.end_date)

    total = query.count()
    items = query.order_by(Announcement.created_at.desc()) \
                  .offset((filters.page - 1) * filters.limit) \
                  .limit(filters.limit).all()

    return total, items
