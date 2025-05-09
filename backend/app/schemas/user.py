from typing import Optional
from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str
    role: str
    name: Optional[str] = None
    location: Optional[str] = None
    contact: Optional[str] = None

class UserLogin(BaseModel):
    username: str
    password: str