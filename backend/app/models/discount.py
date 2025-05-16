from sqlalchemy import Column, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class Discount(Base):
    __tablename__ = 'discounts'
    id = Column(String, primary_key=True, unique=True, nullable=False)  # User-provided string ID
    percentage = Column(Float, nullable=False)
    valid_until = Column(Date, nullable=False)

    provider_id = Column(ForeignKey('users.id'), nullable=False)
    provider = relationship('User', back_populates='discounts')
