from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.configs.db import get_db
from app.schemas.announcement import AnnouncementCreate, AnnouncementRead, AnnouncementListResponse, AnnouncementFilterParams
from app.crud import announcement as crud
from app.utils.security import require_any_role

router = APIRouter(prefix="/admin/announcement", tags=["System Announcement"])


admin_required = require_any_role(["admin"])

@router.post("/", response_model=AnnouncementRead, dependencies=[Depends(admin_required)])
def post_announcement(data: AnnouncementCreate, db: Session = Depends(get_db)):
    return crud.create_announcement(db, data)


@router.get("/", response_model=AnnouncementListResponse, dependencies=[Depends(admin_required)])
def get_all_announcements(filters: AnnouncementFilterParams = Depends(), db: Session = Depends(get_db)):
    total, items = crud.get_announcements(db, filters)
    return {"total": total, "announcements": items}
