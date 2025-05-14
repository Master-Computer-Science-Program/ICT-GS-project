from enum import Enum

class OrderStatus(str, Enum):
    pending = "pending"
    processing = "processing"
    done = "received"
    
class PaymentStatus(str, Enum):
    pending = "pending"
    paid = "paid"