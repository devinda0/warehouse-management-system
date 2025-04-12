from fastapi import APIRouter, status, Depends, Cookie
from app.dependancies import verify_jwt_token
from app.services import (
    handle_register_supplier, 
    handle_login, handle_get_profile, 
    handle_refresh_token,
    handle_logout
)
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


@authRouter.post("/refresh_token")
async def refresh_token(refresh_token: str = Cookie(default=None) ):
    """
        Refresh the access token.
    """
    return handle_refresh_token(token=refresh_token)


@authRouter.post("/logout")
async def logout():
    """
        Logout the user.
    """
    return handle_logout()