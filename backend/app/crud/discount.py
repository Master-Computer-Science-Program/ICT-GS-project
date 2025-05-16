from sqlalchemy.orm import Session
from app.models import Discount
from app.schemas.discount import DiscountCreate, DiscountUpdate
from datetime import datetime

def get_discount(db: Session, discount_id: str):
    return db.query(Discount).filter(Discount.id == discount_id).first()

def create_discount(db: Session, discount: DiscountCreate, provider_id: int):
    db_discount = Discount(**discount.dict(), provider_id=provider_id)
    if db_discount.valid_until < datetime.now().date():
        raise ValueError("Valid until date must be after created at date")
    
    db.add(db_discount)
    db.commit()
    db.refresh(db_discount)
    return db_discount

def update_discount(db: Session, discount_id: str, discount: DiscountUpdate):
    db_discount = get_discount(db, discount_id)
    if not db_discount:
        return None
    for field, value in discount.dict(exclude_unset=True).items():
        setattr(db_discount, field, value)
    db.commit()
    db.refresh(db_discount)
    return db_discount

def delete_discount(db: Session, discount_id: str):
    db_discount = get_discount(db, discount_id)
    if not db_discount:
        return None
    db.delete(db_discount)
    db.commit()
    return db_discount

def get_discounts_by_provider(db: Session, provider_id: int):
    return db.query(Discount).filter(Discount.provider_id == provider_id).all()
