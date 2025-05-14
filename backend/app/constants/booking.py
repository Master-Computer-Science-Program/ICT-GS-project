from enum import Enum

class BookingType(str, Enum):
    cold_storage = "cold_storage"
    truck = "truck"

class BookingStatus(str, Enum):
    requested = "requested"
    approved = "approved"
    rejected = "rejected"
    completed = "completed"
