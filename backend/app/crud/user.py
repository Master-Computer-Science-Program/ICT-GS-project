from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.utils.security import hash_password


def create_user(db: Session, user: UserCreate):
    db_user = User(
        email=user.username,
        hashed_password=hash_password(user.password),
        role=user.role,
        name=user.name,
        location=user.location,
        contact=user.contact
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()
