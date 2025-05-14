from sqlalchemy import Column, String, Float, Date, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.models.base import Base

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True, autoincrement=True)
    totalAmount = Column(Float)
    date = Column(Date)
    status = Column(String)

    customer_id = Column(Integer, ForeignKey('users.id'))
    customer = relationship('User', back_populates='orders')

    order_products = relationship('OrderProduct', back_populates='order')
    products = relationship('Product', secondary='order_products', viewonly=True)

    payment = relationship('Payment', back_populates='order', uselist=False)