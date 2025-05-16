from pydantic import BaseModel, Field
from datetime import date

class DiscountBase(BaseModel):
    percentage: float = Field(..., ge=0, le=100)
    valid_until: date

class DiscountCreate(DiscountBase):
    id: str

class DiscountUpdate(BaseModel):
    percentage: float = Field(None, ge=0, le=100)
    valid_until: date = None

class DiscountOut(DiscountBase):
    id: str
    provider_id: int

    class Config:
        orm_mode = True
