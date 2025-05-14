# backend/app/crud/cold_storage.py

from sqlalchemy.orm import Session
from app.models.cold_storage import ColdStorage
from app.schemas.cold_storage import ColdStorageCreate, ColdStorageUpdate

def create_storage(db: Session, storage: ColdStorageCreate, user_id: int):
    db_storage = ColdStorage(**storage.dict(), provider_id=user_id)
    db.add(db_storage)
    db.commit()
    db.refresh(db_storage)
    return db_storage

def get_all_storages(db: Session):
    return db.query(ColdStorage).filter(ColdStorage.availability == True).all()

def get_storage_by_id(db: Session, storage_id: int):
    return db.query(ColdStorage).filter(ColdStorage.id == storage_id).first()

def get_storages_by_provider(db: Session, provider_id: int):
    return db.query(ColdStorage).filter(ColdStorage.provider_id == provider_id).all()

def update_storage(db: Session, storage_id: int, storage: ColdStorageUpdate):
    db_storage = get_storage_by_id(db, storage_id)
    if db_storage:
        # Only update fields that are not None
        for key, value in storage.dict().items():
            if value is not None:
                setattr(db_storage, key, value)
        db.commit()
        db.refresh(db_storage)

        return db_storage
    return None

def delete_storage(db: Session, storage_id: int):
    db_storage = get_storage_by_id(db, storage_id)
    if db_storage:
        db.delete(db_storage)
        db.commit()
        return db_storage
    return None