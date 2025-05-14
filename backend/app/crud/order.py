import datetime

from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.order import Order
from app.models.product import Product
from app.models.payment import Payment
from app.models.order_product import OrderProduct
from app.schemas.order import OrderCreate
from app.constants.order import OrderStatus, PaymentStatus

def get_all_orders_by_user(db: Session, user_id: int):
    """
    Get all orders for a specific user.
    """
    return db.query(Order).filter(Order.customer_id == user_id).all()
  
def get_order_by_id(db: Session, order_id: int):
    """
    Get an order by its ID.
    """
    return db.query(Order).filter(Order.id == order_id).first()


def create_order(db: Session, order: OrderCreate, user_id: int):
    """
    Create a new order.
    """
    db_order = Order(customer_id=user_id, date=order.date, status=OrderStatus.pending)
    db.add(db_order)
    db.flush()
    db.refresh(db_order)
    
    total = 0
    
    for order_product in order.order_products:
        product = db.query(Product).filter(Product.id == order_product.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        if product.quantity < order_product.quantity:
            raise HTTPException(status_code=400, detail="Not enough product in stock")
        product.quantity -= order_product.quantity
        db.add(product)
        db_order_product = OrderProduct(order_id=db_order.id, product_id=product.id, quantity=order_product.quantity)
        total += product.price * order_product.quantity
        db.add(db_order_product)
    
    # Create payment record
    db_payment = Payment(order_id=db_order.id, amount=total, status=PaymentStatus.pending, method=order.payment.method)
    db.add(db_payment)
    
    # Update order totalAmount
    db_order.totalAmount = total
    db.add(db_order)
    db.commit()
    
    db.refresh(db_order)
    return db_order
  
def make_payment(db: Session, order_id: int):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.status != OrderStatus.pending:
        raise HTTPException(status_code=400, detail="Order cannot be paid")
    
    # Update payment status
    payment = db.query(Payment).filter(Payment.order_id == order_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    payment.status = PaymentStatus.paid
    order.status = OrderStatus.processing
    db.commit()
    
    return order

def confirm_order_receipt(db: Session, order_id: int):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.status != OrderStatus.processing:
        raise HTTPException(status_code=400, detail="Order cannot be confirmed as received")
    
    # Update order status
    order.status = OrderStatus.done
    db.commit()
    
    return order

def get_all_orders_by_farmer(db: Session, user_id: int):
    """
    Get all orders for a specific farmer.
    """
    orders = (
        db.query(Order)
        .join(OrderProduct, Order.id == OrderProduct.order_id)
        .join(Product, OrderProduct.product_id == Product.id)
        .filter(Product.owner_id == user_id)
        .all()
    )
    return orders