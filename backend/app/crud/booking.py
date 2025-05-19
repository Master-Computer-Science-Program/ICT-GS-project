from sqlalchemy.orm import Session
from app.models.booking import Booking
from app.schemas.booking import BookingCreate, BookingUpdate
from app.models.cold_storage import ColdStorage
from app.models.truck import Truck

from app.constants.booking import BookingStatus, BookingType

from datetime import datetime

from app.crud.discount import get_discount

def create_booking(db: Session, booking_data: BookingCreate, farmer_id: int):

    total_price = 0.0

    if booking_data.booking_type == BookingType.cold_storage and booking_data.cold_storage_id:
        # Calculate duration in days
        duration_days = (booking_data.end_date - booking_data.start_date).days + 1
        cold_storage = db.query(ColdStorage).filter(ColdStorage.id == booking_data.cold_storage_id).first()
        if not cold_storage:
            raise ValueError("Cold Storage not found")
        total_price = duration_days * cold_storage.pricePerDay

    elif booking_data.booking_type == BookingType.truck and booking_data.truck_id:
        truck = db.query(Truck).filter(Truck.id == booking_data.truck_id).first()
        if not truck:
            raise ValueError("Truck not found")
        total_price = booking_data.distance * truck.pricePerKm

    else:
        raise ValueError("Invalid booking type or missing reference id")
    
    print("discount id", booking_data.discount_id)
    if booking_data.discount_id is not None:
        discount = get_discount(db, booking_data.discount_id)
        if discount.valid_until < datetime.now().date():
            raise ValueError("Discount code is expired")
        total_price = total_price * (1 - discount.percentage / 100)
    
    booking = Booking(
        booking_type=booking_data.booking_type,
        start_date=booking_data.start_date,
        end_date=booking_data.end_date,
        total_price=total_price,
        status=BookingStatus.requested,
        farmer_id=farmer_id,
        cold_storage_id=booking_data.cold_storage_id,
        truck_id=booking_data.truck_id
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

def get_all_bookings(db: Session):
    return db.query(Booking).all()

def get_booking_by_id(db: Session, booking_id: int):
    return db.query(Booking).filter(Booking.id == booking_id).first()

def update_booking(db: Session, booking_id: int, booking_data: BookingUpdate):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if booking:
        for key, value in booking_data.dict().items():
            if value is not None:
                setattr(booking, key, value)
        db.commit()
        db.refresh(booking)
        return booking
    return None

def delete_booking(db: Session, booking_id: int):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if booking:
        db.delete(booking)
        db.commit()
        return True
    return False

def get_bookings_by_farmer(db: Session, farmer_id: int):
    return db.query(Booking).filter(Booking.farmer_id == farmer_id).all()

def get_bookings_by_provider(db: Session, provider_id: int):
    return db.query(Booking).filter(
        (Booking.cold_storage.has(provider_id=provider_id)) | 
        (Booking.truck.has(provider_id=provider_id))
    ).all()
    
