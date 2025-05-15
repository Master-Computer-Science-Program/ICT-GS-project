from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from app.configs.db import get_db
from app.configs.settings import settings
from app.schemas.user import UserCreate, UserLogin, UserRead
from app.crud import user as crud_user
from app.utils.security import verify_password, create_access_token

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/register", response_model=UserRead)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    if crud_user.get_user_by_username(db, user.username):  # ← 注意改成 username
        raise HTTPException(status_code=400, detail="User already exists")
    return crud_user.create_user(db, user)


@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_username(db, user.username)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": str(db_user.id)},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
