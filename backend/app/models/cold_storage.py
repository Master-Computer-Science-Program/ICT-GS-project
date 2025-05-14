from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class ColdStorage(Base):
    __tablename__ = 'cold_storages'
    id = Column(Integer, primary_key=True, autoincrement=True)
    capacity = Column(Integer)
    location = Column(String)
    pricePerDay = Column(Float)
    availability = Column(Boolean)

    provider_id = Column(Integer, ForeignKey('users.id'))
    provider = relationship('User', back_populates='cold_storages')

    bookings = relationship('Booking', back_populates='cold_storage')
