from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate

def create_product(db: Session, product: ProductCreate, owner_id: str):
    db_product = Product(type=product.type, quantity=product.quantity, harvestDate=product.harvestDate, price=product.price, owner_id=owner_id)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_product(db: Session, product_id: str):
    return db.query(Product).filter(Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Product).offset(skip).limit(limit).all()

def update_product(db: Session, product_id: str, product: ProductUpdate, owner_id: str):
    db_product = get_product(db, product_id)
    if db_product and db_product.owner_id == owner_id:
        for key, value in product.dict().items():
            if value is not None:
                setattr(db_product, key, value)
        db.commit()
        db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: str, owner_id: str):
    db_product = get_product(db, product_id)
    if db_product and db_product.owner_id == owner_id:
        db.delete(db_product)
        db.commit()
    return db_product