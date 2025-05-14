from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.models.user import User

from app.configs.db import get_db
from app.utils.security import require_any_role
from app.crud import booking as crud_booking
from app.schemas.booking import BookingCreate, BookingUpdate, BookinginDB

router = APIRouter(prefix="/bookings", tags=["Bookings"])

# ---------------------------
# Get all bookings
# ---------------------------
@router.get("/", response_model=List[BookinginDB])
def get_all_bookings(db: Session = Depends(get_db)):
    return crud_booking.get_all_bookings(db)

# ---------------------------
# Get booking by ID
# ---------------------------
@router.get("/{booking_id}", response_model=BookinginDB)
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = crud_booking.get_booking_by_id(db, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

# ---------------------------
# Create new booking (Farmer only)
# ---------------------------
@router.post("/", response_model=BookinginDB)
def create_booking(
    booking_data: BookingCreate,
    farmer: User = Depends(require_any_role(["farmer"])),
    db: Session = Depends(get_db)
):
    return crud_booking.create_booking(db, booking_data, farmer.id)

# ---------------------------
# Update booking
# ---------------------------
@router.put("/{booking_id}", response_model=BookinginDB)
def update_booking(booking_id: int, booking_data: BookingUpdate, db: Session = Depends(get_db)):
    booking = crud_booking.get_booking_by_id(db, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return crud_booking.update_booking(db, booking_id, booking_data)

# ---------------------------
# Delete booking
# ---------------------------
@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    success = crud_booking.delete_booking(db, booking_id)
    if not success:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"detail": "Booking deleted successfully"}

# ---------------------------
# Get bookings by farmer (Farmer only)
# ---------------------------
@router.get("/farmer/me", response_model=List[BookinginDB])
def get_my_bookings(
    farmer: User = Depends(require_any_role(["farmer"])),
    db: Session = Depends(get_db)
):
    return crud_booking.get_bookings_by_farmer(db, farmer.id)
