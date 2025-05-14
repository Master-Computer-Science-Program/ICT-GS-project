# backend/app/schemas/cold_storage.py

from pydantic import BaseModel
from typing import Optional

class ColdStorageBase(BaseModel):
    name: str
    location: str
    capacity_tons: float
    temperature_range: Optional[str]
    price_per_day: Optional[float]

class ColdStorageCreate(ColdStorageBase):
    pass

class ColdStorageOut(ColdStorageBase):
    id: int
    is_available: bool

    class Config:
        orm_mode = True
