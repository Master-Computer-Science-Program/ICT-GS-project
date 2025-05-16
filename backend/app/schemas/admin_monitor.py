from pydantic import BaseModel
from typing import Optional, List
from datetime import date


class FilterParams(BaseModel):
    user_id: Optional[int] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    page: int = 1
    limit: int = 10


class PaymentInfo(BaseModel):
    id: int
    order_id: int
    amount: float
    status: str
    method: str

    class Config:
        orm_mode = True


class OrderInfo(BaseModel):
    id: int
    customer_id: int
    totalAmount: float
    date: date
    status: str
    payment: Optional[PaymentInfo]

    class Config:
        orm_mode = True


class OrderListResponse(BaseModel):
    total: int
    orders: List[OrderInfo]


class BookingInfo(BaseModel):
    id: int
    farmer_id: int
    booking_type: str
    start_date: Optional[date]
    end_date: Optional[date]
    total_price: float
    distance: Optional[float]
    status: str
    cold_storage_id: Optional[int]
    truck_id: Optional[int]

    class Config:
        orm_mode = True


class BookingListResponse(BaseModel):
    total: int
    bookings: List[BookingInfo]


class UserInfo(BaseModel):
    id: int
    email: str
    hashed_password: str
    role: str
    name: Optional[str] = None
    location: Optional[str] = None
    contact: Optional[str] = None

    class Config:
        orm_mode = True


class UserListResponse(BaseModel):
    total: int
    users: List[UserInfo]