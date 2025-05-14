from sqlalchemy.orm import Session
from app.models.truck import Truck
from app.schemas.truck import TruckCreate, TruckUpdate

def create_truck(db: Session, truck: TruckCreate, user_id: int):
    db_truck = Truck(**truck.dict(), provider_id=user_id)
    db.add(db_truck)
    db.commit()
    db.refresh(db_truck)
    return db_truck
  
def get_all_trucks(db: Session):
    return db.query(Truck).all()

def get_truck_by_id(db: Session, truck_id: int):
    return db.query(Truck).filter(Truck.id == truck_id).first()
  
def update_truck(db: Session, truck_id: int, truck: TruckUpdate):
    db_truck = get_truck_by_id(db, truck_id)
    if db_truck:
        for key, value in truck.dict().items():
          if value is not None:
            setattr(db_truck, key, value)
        db.commit()
        db.refresh(db_truck)
        return db_truck
    return None
  
def delete_truck(db: Session, truck_id: int):
    db_truck = get_truck_by_id(db, truck_id)
    if db_truck:
        db.delete(db_truck)
        db.commit()
        return db_truck
    return None
  
def get_trucks_by_provider(db: Session, provider_id: int):
    return db.query(Truck).filter(Truck.provider_id == provider_id).all()
  
def get_available_trucks(db: Session):  
    return db.query(Truck).filter(Truck.availability == True).all()