from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import Query
from app.configs.db import get_db
from app.schemas.product import ProductCreate, ProductRead, ProductUpdate
from app.crud import product as crud_product
from app.utils.security import require_any_role

from app.models.user import User

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/", response_model=ProductRead)
def register_product(product: ProductCreate, db: Session = Depends(get_db), farmer: User = Depends(require_any_role(["farmer"]))):
    return crud_product.create_product(db, product, farmer.id)

@router.get("/", response_model=list[ProductRead])
def list_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_product.get_products(db, skip, limit)

@router.put("/{product_id}", response_model=ProductRead)
def update_product(product_id: str, updated: ProductUpdate, db: Session = Depends(get_db), farmer: User = Depends(require_any_role(["farmer"]))):
    product = crud_product.update_product(db, product_id, updated, farmer.id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.delete("/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db), farmer: User = Depends(require_any_role(["farmer"]))):
    product = crud_product.delete_product(db, product_id, farmer.id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"detail": "Deleted"}

@router.get("/search", response_model=List[ProductRead])
def search_products(
    title: Optional[str] = Query(None, description="Search term for product title"),
    db: Session = Depends(get_db)
):
    print(f"Searching for products with title: {title}")
    if not title:
        products = crud_product.get_products(db)
        return products

    print(f"Searching for products with title: {title}")
    products = crud_product.search_products(db, title)

    return products


@router.get("/{product_id}", response_model=ProductRead)
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = crud_product.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product