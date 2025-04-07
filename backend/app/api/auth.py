from fastapi import APIRouter, status
from app.database import registerSupplier
from app.schemas import SupplierCreate

authRouter = APIRouter()

@authRouter.get("/login")
async def login():
    return {"message": "Login endpoint"}


@authRouter.post("/register", status_code=status.HTTP_201_CREATED)
async def register(supplier: SupplierCreate):
    """
        Register a new supplier.
    """
    return registerSupplier(supplier)
        