# backend/app/schemas/cold_storage.py

from pydantic import BaseModel
from typing import Optional

from datetime import date

class TruckBase(BaseModel):
    route: str
    capacity: int
    pricePerKm: float 
    availability: Optional[bool] = True
    
class TruckCreate(TruckBase):
    pass

class TruckUpdate(TruckBase):
    pass

class TruckOut(TruckBase):
    id: int
    availability: bool

    class Config:
        orm_mode = True