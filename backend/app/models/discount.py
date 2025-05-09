from sqlalchemy import Column, String, Float, Date, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.models.base import Base

class Discount(Base):
    __tablename__ = 'discounts'
    id = Column(Integer, primary_key=True, autoincrement=True)
    percentage = Column(Float)
    validUntil = Column(Date)

    provider_id = Column(Integer, ForeignKey('users.id'))
    provider = relationship('User', back_populates='discounts')
