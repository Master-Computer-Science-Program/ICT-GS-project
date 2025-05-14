
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.configs.db import get_db
from app.schemas.truck import TruckCreate, TruckOut, TruckUpdate
from app.crud import truck as crud
from app.utils.security import require_any_role
from app.models.user import User

router = APIRouter(prefix="/trucks", tags=["Trucks"])

# ---------------------------
# Get all trucks
# ---------------------------
@router.get("/", response_model=list[TruckOut])
def list_trucks(db: Session = Depends(get_db)):
    return crud.get_all_trucks(db)
  
# ---------------------------
# Get truck by ID
# ---------------------------
@router.get("/{truck_id}", response_model=TruckOut)
def get_truck(truck_id: int, db: Session = Depends(get_db)):
    truck = crud.get_truck_by_id(db, truck_id)
    if not truck:
        raise HTTPException(status_code=404, detail="Truck not found")
    return truck
  
# ---------------------------
# Create new truck (Provider only)
# ---------------------------
@router.post("/", response_model=TruckOut)
def create_truck(truck: TruckCreate, db: Session = Depends(get_db), user: User = Depends(require_any_role(["provider"]))):
    return crud.create_truck(db, truck, user.id)
  
# ---------------------------
# Update truck (Check if user is provider and is the owner of the truck)
# ---------------------------
@router.put("/{truck_id}", response_model=TruckOut) 
def update_truck(truck_id: int, truck: TruckUpdate, db: Session = Depends(get_db), user: User = Depends(require_any_role(["provider"]))):
    # Check if the user is the owner of the truck
    existing_truck = crud.get_truck_by_id(db, truck_id)
    if existing_truck and existing_truck.provider_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this truck")
    if not existing_truck:
        raise HTTPException(status_code=404, detail="Truck not found")
    return crud.update_truck(db, truck_id, truck)
  
# ---------------------------
# Delete truck (Provider only)
# Check if user is provider and is the owner of the truck
# ---------------------------
@router.delete("/{truck_id}", response_model=TruckOut)
def delete_truck(truck_id: int, db: Session = Depends(get_db), user: User = Depends(require_any_role(["provider"]))):
    # Check if the user is the owner of the truck
    existing_truck = crud.get_truck_by_id(db, truck_id)
    if existing_truck and existing_truck.provider_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this truck")
    if not existing_truck:
        raise HTTPException(status_code=404, detail="Truck not found")
    return crud.delete_truck(db, truck_id)
  
# ---------------------------
# Get trucks by provider
# ---------------------------
@router.get("/provider/me", response_model=list[TruckOut])
def get_trucks_by_provider(db: Session = Depends(get_db), user: User = Depends(require_any_role(["provider"]))):
    trucks = crud.get_trucks_by_provider(db, user.id)
    return trucks
