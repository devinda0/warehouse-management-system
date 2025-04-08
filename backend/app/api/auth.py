from fastapi import APIRouter, status, Depends
from app.dependancies import verify_jwt_token
from app.services import handle_register_supplier, handle_login, handle_get_profile
from app.schemas import SupplierCreate, UserCreate

authRouter = APIRouter()

@authRouter.post("/login")
async def login(user: UserCreate):
    """
        Login a user.
    """
    return handle_login(user=user)


@authRouter.post("/register", status_code=status.HTTP_201_CREATED)
async def register(supplier: SupplierCreate):
    """
        Register a new supplier.
    """
    return handle_register_supplier(supplier)


@authRouter.get("/profile")
async def get_profile(payload: dict = Depends(verify_jwt_token)):
    """
        Get the profile of the logged in user.
    """
    return handle_get_profile(user_id=payload["id"], role=payload["role"])