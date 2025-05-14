from pydantic import BaseModel
from datetime import date
from typing import Optional

class ProductBase(BaseModel):
    type: str
    quantity: int
    harvestDate: date
    price: float

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    type: Optional[str] = None
    quantity: Optional[int] = None
    harvestDate: Optional[date] = None
    price: Optional[float] = None

class ProductRead(ProductBase):
    id: int
    owner_id: Optional[int] = None

    class Config:
        orm_mode = True