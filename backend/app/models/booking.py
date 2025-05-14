from sqlalchemy import Column, Integer, ForeignKey, String, Date, Float
from sqlalchemy.orm import relationship
from app.models.base import Base

class Booking(Base):
    __tablename__ = 'bookings'
    id = Column(Integer, primary_key=True, autoincrement=True)
    booking_type = Column(String)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    total_price = Column(Float)
    distance = Column(Float, nullable=True)
    status = Column(String)

    farmer_id = Column(Integer, ForeignKey('users.id'))
    farmer = relationship('User', back_populates='bookings')
    
    cold_storage_id = Column(Integer, ForeignKey('cold_storages.id'), nullable=True)
    truck_id = Column(Integer, ForeignKey('trucks.id'), nullable=True)
    
    cold_storage = relationship('ColdStorage', back_populates='bookings', uselist=False)
    truck = relationship('Truck', back_populates='bookings', uselist=False)
