
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.configs.db import get_db
from app.schemas.order import OrderCreate, OrderOut
from app.crud import order as crud
from constants.order import OrderStatus
from app.utils.security import require_any_role
from app.models.user import User

router = APIRouter(prefix="/orders", tags=["Orders"])

# ---------------------------
# Get all orders of a user (Customer only)
# ---------------------------
@router.get("/", response_model=list[OrderOut])
def list_orders(db: Session = Depends(get_db), user: User = Depends(require_any_role(["customer"]))):
    return crud.get_all_orders_by_user(db, user.id)
  
# ---------------------------
# Get order by ID (Customer only)
# ---------------------------
@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db), user: User = Depends(require_any_role(["customer"]))):
    order = crud.get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.customer_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this order")
    return order
  
# ---------------------------
# Create new order (Customer only)
# ---------------------------
@router.post("/", response_model=OrderOut)
def create_order(order: OrderCreate, db: Session = Depends(get_db), user: User = Depends(require_any_role(["customer"]))):
    return crud.create_order(db, order, user.id)
  
# ---------------------------
# Make payment (Check if user is customer and is the owner of the order)
# ---------------------------
@router.post("/{order_id}/payment", response_model=OrderOut)
def make_payment(order_id: int, db: Session = Depends(get_db), user: User = Depends(require_any_role(["customer"]))):
    # Check if the user is the owner of the order
    existing_order = crud.get_order_by_id(db, order_id)
    if existing_order and existing_order.customer_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to make payment for this order")
    if not existing_order:
        raise HTTPException(status_code=404, detail="Order not found")
    # Only make payment if the order is 'pending'
    if existing_order.status != OrderStatus.pending:
        raise HTTPException(status_code=403, detail="Order cannot be paid")
    return crud.make_payment(db, order_id)
  
# ---------------------------
# Confirm order received by customer (Customer only)
# ---------------------------
@router.post("/{order_id}/confirm-receipt", response_model=OrderOut)
def confirm_order_receipt(order_id: int, db: Session = Depends(get_db), user: User = Depends(require_any_role(["customer"]))):
    order = crud.get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    # Check if the order belongs to the customer
    if order.customer_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to confirm receipt of this order")
    if order.status != OrderStatus.processing:
        raise HTTPException(status_code=403, detail="Order cannot be confirmed as received")
    return crud.confirm_order_receipt(db, order_id)
  
# ---------------------------
# Get all orders (Farmer only)
# ---------------------------
@router.get("/farmer/me", response_model=list[OrderOut])
def list_orders_farmer(db: Session = Depends(get_db), user: User = Depends(require_any_role(["farmer"]))):
    return crud.get_all_orders_by_farmer(db, user.id)