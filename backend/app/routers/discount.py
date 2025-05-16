from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import discount as discount_schema
from app.crud import discount as discount_crud
from app.configs.db import get_db

from app.utils.security import require_any_role

router = APIRouter(prefix="/discounts", tags=["Discounts"])

@router.post("/", response_model=discount_schema.DiscountOut)
def create_discount(discount: discount_schema.DiscountCreate, db: Session = Depends(get_db), provider: str = Depends(require_any_role(["service_provider"]))):
    if discount_crud.get_discount(db, discount.id):
        raise HTTPException(status_code=400, detail="Discount ID already exists")
    return discount_crud.create_discount(db, discount, provider.id)

@router.get("/{discount_id}", response_model=discount_schema.DiscountOut)
def read_discount(discount_id: str, db: Session = Depends(get_db)):
    db_discount = discount_crud.get_discount(db, discount_id)
    if not db_discount:
        raise HTTPException(status_code=404, detail="Discount not found")
    return db_discount

@router.put("/{discount_id}", response_model=discount_schema.DiscountOut)
def update_discount(discount_id: str, discount: discount_schema.DiscountUpdate, db: Session = Depends(get_db)):
    db_discount = discount_crud.update_discount(db, discount_id, discount)
    if not db_discount:
        raise HTTPException(status_code=404, detail="Discount not found")
    return db_discount

@router.delete("/{discount_id}")
def delete_discount(discount_id: str, db: Session = Depends(get_db)):
    db_discount = discount_crud.delete_discount(db, discount_id)
    if not db_discount:
        raise HTTPException(status_code=404, detail="Discount not found")
    return {"detail": "Discount deleted"}
