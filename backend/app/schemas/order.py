
from pydantic import BaseModel
from datetime import date
from typing import Optional
from schemas.product import ProductRead

class OrderProductCreate(BaseModel):
  product_id: int
  quantity: int
  
  class Config:
    orm_mode = True
  
class PaymentCreate(BaseModel):
  method: str
  
  class Config:
    orm_mode = True
    
class OrderCreate(BaseModel):
  date: date
  order_products: list[OrderProductCreate]
  payment: PaymentCreate
  
  class Config:
    orm_mode = True
    
class Payment(BaseModel):
  amount: float
  status: str
  method: str
  
  class Config:
    orm_mode = True
    
class OrderProductOut(BaseModel):
  product: ProductRead
  quantity: int
  
  class Config:
    orm_mode = True
    
class OrderOut(BaseModel):
  id: int
  customer_id: int
  totalAmount: float
  date: date
  status: str
  order_products: list[OrderProductOut]
  payment: Payment
  
  class Config:
    orm_mode = True