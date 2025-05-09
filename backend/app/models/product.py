from sqlalchemy import Column, String, Float, Integer, Date, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.models.base import Base

class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, autoincrement=True)
    type = Column(String)
    quantity = Column(Integer)
    harvestDate = Column(Date)
    price = Column(Float)

    owner_id = Column(Integer, ForeignKey('users.id'))
    owner = relationship('User', back_populates='products')

    order_products = relationship('OrderProduct', back_populates='product')
    orders = relationship('Order', secondary='order_products', viewonly=True)