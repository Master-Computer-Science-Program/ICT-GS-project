from sqlalchemy.orm import Session
from app.models import Order, Payment, Booking, User
from app.schemas.admin_monitor import FilterParams, OrderInfo, BookingInfo
from typing import List, Tuple

def get_filtered_orders(db: Session, filters: FilterParams) -> Tuple[int, List[Order]]:
    query = db.query(Order)

    if filters.user_id:
        query = query.filter(Order.customer_id == filters.user_id)
    if filters.start_date:
        query = query.filter(Order.date >= filters.start_date)
    if filters.end_date:
        query = query.filter(Order.date <= filters.end_date)

    total = query.count()
    orders = (
        query
        .offset((filters.page - 1) * filters.limit)
        .limit(filters.limit)
        .all()
    )
    return total, orders

def get_filtered_bookings(db: Session, filters: FilterParams) -> Tuple[int, List[Booking]]:
    query = db.query(Booking)

    if filters.user_id:
        query = query.filter(Booking.farmer_id == filters.user_id)
    if filters.start_date:
        query = query.filter(Booking.start_date >= filters.start_date)
    if filters.end_date:
        query = query.filter(Booking.end_date <= filters.end_date)

    total = query.count()
    bookings = (
        query
        .offset((filters.page - 1) * filters.limit)
        .limit(filters.limit)
        .all()
    )
    return total, bookings

def get_all_users(db: Session):
    query = db.query(User)

    total = query.count()
    users = (
        query.all()
    )
    return total, users

def delete_user(db: Session, id):
    query = db.query(User)

    query = query.filter(User.id == id)

    query.delete()
    db.commit()

    return True
    
