from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class Truck(Base):
    __tablename__ = 'trucks'
    id = Column(Integer, primary_key=True, autoincrement=True)
    capacity = Column(Integer)
    route = Column(String)
    pricePerKm = Column(Float)
    availability = Column(Boolean)

    provider_id = Column(Integer, ForeignKey('users.id'))
    provider = relationship('User', back_populates='trucks')
