from fastapi import FastAPI
from app.routers import product, auth, cold_storage, booking, truck, order, user, admin_monitor, discount
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # Your frontend URL
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows only these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(product.router)
app.include_router(order.router)
app.include_router(auth.router)
app.include_router(cold_storage.router)
app.include_router(truck.router)
app.include_router(booking.router)
app.include_router(user.router)
app.include_router(admin_monitor.router)
app.include_router(discount.router)