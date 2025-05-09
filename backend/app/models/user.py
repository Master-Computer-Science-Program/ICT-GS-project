from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.models.base import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    name = Column(String)
    location = Column(String)
    contact = Column(String)

    products = relationship('Product', back_populates='owner')
    orders = relationship('Order', back_populates='customer')

    cold_storages = relationship('ColdStorage', back_populates='provider')
    trucks = relationship('Truck', back_populates='provider')
    discounts = relationship('Discount', back_populates='provider')
