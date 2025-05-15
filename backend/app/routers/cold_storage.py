# backend/app/routers/cold_storage.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.configs.db import get_db
from app.schemas.cold_storage import ColdStorageCreate, ColdStorageOut, ColdStorageUpdate
from app.crud import cold_storage as crud
from app.utils.security import require_any_role
from app.models.user import User

router = APIRouter(prefix="/cold-storage", tags=["Cold Storage"])

# ---------------------------
# Get all cold storages
# ---------------------------
@router.get("/", response_model=list[ColdStorageOut])
def list_storages(db: Session = Depends(get_db)):
    return crud.get_all_storages(db)

# ---------------------------
# Get cold storage by ID
# ---------------------------
@router.get("/{storage_id}", response_model=ColdStorageOut)
def get_storage(storage_id: int, db: Session = Depends(get_db)):
    storage = crud.get_storage_by_id(db, storage_id)
    if not storage:
        raise HTTPException(status_code=404, detail="Cold storage not found")
    return storage

# ---------------------------
# Create new cold storage (Provider only)
# ---------------------------
@router.post("/", response_model=ColdStorageOut)
def create_cold_storage(storage: ColdStorageCreate, db: Session = Depends(get_db), user: User = Depends(require_any_role(["service_provider"]))):
    return crud.create_storage(db, storage, user.id)

# ---------------------------
# Update cold storage (Check if user is provider and is the owner of the storage)
# ---------------------------
@router.put("/{storage_id}", response_model=ColdStorageOut)
def update_cold_storage(storage_id: int, storage: ColdStorageUpdate, db: Session = Depends(get_db), user: User = Depends(require_any_role(["service_provider"]))):
    # Check if the user is the owner of the storage
    existing_storage = crud.get_storage_by_id(db, storage_id)
    if existing_storage and existing_storage.provider_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this storage")
    if not existing_storage:
        raise HTTPException(status_code=404, detail="Cold storage not found")
    return crud.update_storage(db, storage_id, storage)

# ---------------------------
# Delete cold storage (Provider only)
# Check if user is provider and is the owner of the storage
# ---------------------------
@router.delete("/{storage_id}", response_model=ColdStorageOut)
def delete_cold_storage(storage_id: int, db: Session = Depends(get_db), user: User = Depends(require_any_role(["service_provider"]))):
    # Check if the user is the owner of the storage
    existing_storage = crud.get_storage_by_id(db, storage_id)
    if existing_storage and existing_storage.provider_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this storage")
    if not existing_storage:
        raise HTTPException(status_code=404, detail="Cold storage not found")
    return crud.delete_storage(db, storage_id)

# ---------------------------
# Get cold storage by provider
# ---------------------------
@router.get("/provider/me", response_model=list[ColdStorageOut])
def get_storages_by_provider(db: Session = Depends(get_db), user: User = Depends(require_any_role(["service_provider"]))):
    storages = crud.get_storages_by_provider(db, user.id)
    return storages
