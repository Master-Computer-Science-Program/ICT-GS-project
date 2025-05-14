# backend/app/schemas/cold_storage.py

from pydantic import BaseModel
from typing import Optional

from datetime import date

class ColdStorageBase(BaseModel):
    location: str
    capacity: int
    pricePerDay: float
    availability: Optional[bool] = True
    
class ColdStorageCreate(ColdStorageBase):
    pass

class ColdStorageOut(ColdStorageBase):
    id: int
    availability: bool

    class Config:
        orm_mode = True
