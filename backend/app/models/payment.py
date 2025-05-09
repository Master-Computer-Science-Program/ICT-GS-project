from sqlalchemy import Column, String, Float, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.models.base import Base

class Payment(Base):
    __tablename__ = 'payments'
    id = Column(Integer, primary_key=True, autoincrement=True) 
    amount = Column(Float)
    status = Column(String)
    method = Column(String)

    order_id = Column(Integer, ForeignKey('orders.id'))
    order = relationship('Order', back_populates='payment')
