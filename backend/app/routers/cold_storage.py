# backend/app/routers/cold_storage.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.configs.db import get_db
from app.schemas.cold_storage import ColdStorageCreate, ColdStorageOut
from app.crud import cold_storage as crud
from app.utils.security import require_any_role
from app.models.user import User

router = APIRouter(prefix="/cold-storage", tags=["Cold Storage"])

@router.post("/", response_model=ColdStorageOut)
def create_cold_storage(storage: ColdStorageCreate, db: Session = Depends(get_db), user: User = Depends(require_any_role(["provider"]))):
    return crud.create_storage(db, storage, user.id)

@router.get("/", response_model=list[ColdStorageOut])
def list_storages(db: Session = Depends(get_db)):
    return crud.get_all_storages(db)
