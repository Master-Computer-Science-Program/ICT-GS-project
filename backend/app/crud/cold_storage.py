# backend/app/crud/cold_storage.py

from sqlalchemy.orm import Session
from app.models.cold_storage import ColdStorage
from app.schemas.cold_storage import ColdStorageCreate

def create_storage(db: Session, storage: ColdStorageCreate, user_id: int):
    db_storage = ColdStorage(**storage.dict(), owner_id=user_id)
    db.add(db_storage)
    db.commit()
    db.refresh(db_storage)
    return db_storage

def get_all_storages(db: Session):
    return db.query(ColdStorage).filter(ColdStorage.is_available == True).all()
