from enum import Enum

class RoleEnum(str, Enum):
    farmer = "farmer"
    customer = "customer"
    service_provider = "service_provider"
    system_admin = "system_admin"