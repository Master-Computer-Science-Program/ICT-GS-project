from sqlalchemy import Column, String, Float, Date, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.models.base import Base

class OrderProduct(Base):
    __tablename__ = 'order_products'

    order_id = Column(Integer, ForeignKey('orders.id'), primary_key=True)
    product_id = Column(Integer, ForeignKey('products.id'), primary_key=True)
    quantity = Column(Integer, nullable=False)

    order = relationship('Order', back_populates='order_products')
    product = relationship('Product', back_populates='order_products')