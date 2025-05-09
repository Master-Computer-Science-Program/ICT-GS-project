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
    pass

class ProductRead(ProductBase):
    id: int

    class Config:
        orm_mode = True