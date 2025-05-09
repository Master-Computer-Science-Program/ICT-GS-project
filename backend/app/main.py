from fastapi import FastAPI
from app.routers import product, auth

app = FastAPI()

app.include_router(product.router)
app.include_router(auth.router)