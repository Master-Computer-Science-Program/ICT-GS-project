from pydantic import BaseModel
from datetime import date
from typing import Optional
from app.constants.booking import BookingStatus, BookingType

class BookingCreate(BaseModel):
    booking_type: BookingType
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    distance: Optional[float] = None
    cold_storage_id: Optional[int] = None
    truck_id: Optional[int] = None

class BookingUpdate(BaseModel):
    status: Optional[str] = None

class BookinginDB(BaseModel):
    id: int
    booking_type: BookingType
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    distance: Optional[float] = None
    farmer_id: int
    cold_storage_id: Optional[int] = None
    truck_id: Optional[int] = None
    status: BookingStatus = BookingStatus.requested
    total_price: float

    class Config:
        orm_mode = True