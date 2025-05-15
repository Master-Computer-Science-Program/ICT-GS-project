from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.configs.db import get_db
from app.schemas.admin_monitor import FilterParams, OrderListResponse, BookingListResponse, OrderInfo, BookingInfo, PaymentInfo
from app.crud import admin_monitor as crud

router = APIRouter(prefix="/admin-monitor", tags=["admin-monitor"])

@router.get("/orders", response_model=OrderListResponse)
def monitor_orders(filters: FilterParams = Depends(), db: Session = Depends(get_db)):
    total, orders = crud.get_filtered_orders(db, filters)
    result = []
    for order in orders:
        result.append(OrderInfo(
            id=order.id,
            customer_id=order.customer_id,
            totalAmount=order.totalAmount,
            date=order.date,
            status=order.status,
            payment=PaymentInfo(
                id=order.payment.id,
                order_id=order.payment.order_id,
                amount=order.payment.amount,
                status=order.payment.status,
                method=order.payment.method
            ) if order.payment else None
        ))
    return {"total": total, "orders": result}


@router.get("/bookings", response_model=BookingListResponse)
def monitor_bookings(filters: FilterParams = Depends(), db: Session = Depends(get_db)):
    total, bookings = crud.get_filtered_bookings(db, filters)
    result = []
    for booking in bookings:
        result.append(BookingInfo(
            id=booking.id,
            farmer_id=booking.farmer_id,
            booking_type=booking.booking_type,
            start_date=booking.start_date,
            end_date=booking.end_date,
            total_price=booking.total_price,
            distance=booking.distance,
            status=booking.status,
            cold_storage_id=booking.cold_storage_id,
            truck_id=booking.truck_id
        ))
    return {"total": total, "bookings": result}

