from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.utils.security import verify_password, hash_password, create_access_token
from datetime import timedelta
from app.constants.role import RoleEnum

def authenticate_user(db: Session, email: str, password: str):
    try:
        user = db.query(User).filter(User.email == email).first()
        if user and verify_password(password, user.hashed_password):
            return user
        return None
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error authenticating user: {str(e)}")

def register_user(db: Session, email: str, password: str, role: RoleEnum, name: str = None, location: str = None, contact: str = None):
    # Validate input
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    if not password:
        raise HTTPException(status_code=400, detail="Password is required")
    if not role:
        raise HTTPException(status_code=400, detail="Role is required")

    try:
        hashed_pw = hash_password(password)
        print(email, hashed_pw, role, name, location, contact)
        # Create base User
        new_user = User(
            email=email,
            hashed_password=hashed_pw,
            role=role,
            name=name,
            location=location,
            contact=contact
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    except Exception as e:
        db.rollback()  # Rollback transaction on failure
        raise HTTPException(status_code=500, detail=f"Error registering user: {str(e)}")

def login_user(user: User):
    return create_access_token(
        {
            "sub": str(user.id),
            "role": user.role
        },
        expires_delta=timedelta(minutes=30)
    )
