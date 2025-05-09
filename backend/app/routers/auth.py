from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.configs.db import get_db
from app.crud import auth as crud_auth
from app.models.user import User
from app.schemas.user import UserCreate

from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter_by(email=user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = crud_auth.register_user(db, user.email, user.password, user.role, user.name, user.location, user.contact)
    if not new_user:
        raise HTTPException(status_code=400, detail="User registration failed")
    return {"msg": "User created"}

@router.post("/login")
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    db_user = crud_auth.authenticate_user(db, form_data.username, form_data.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = crud_auth.login_user(db_user)
    return {"access_token": token, "token_type": "bearer"}
