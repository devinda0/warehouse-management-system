from app.database import (
    registerSupplier, 
    get_user_by_username,
    get_supplier_by_user_id,
    get_manager_by_user_id,
    get_worker_by_user_id
)
from app.schemas import SupplierCreate, UserCreate
from fastapi import HTTPException
from app.utils import verify_password, create_jwt_token


def handle_register_supplier(supplier: SupplierCreate):
    """
        Handle the registration of a new supplier.
    """
    try:
        existing_user = get_user_by_username(supplier.username)

        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")

        registerSupplier(
            name=supplier.name,
            email=supplier.email,
            phone=supplier.phone,
            address=supplier.address,
            username=supplier.username,
            password=supplier.password
        )        

        return {"message": "Supplier registered successfully"}

    except Exception as e:
        print(f"Error during registration: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
    

def handle_login(user : UserCreate):
    """
        Handle the login of a user.
    """
    existing_user = get_user_by_username(user.username)

    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    if not verify_password(user.password, existing_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    token = create_jwt_token(
        data={
            "id" : existing_user.id,
            "username": existing_user.username,
            "role": existing_user.role
        },
        expires_in=3600
    )

    return {
        "message": "Login successful",
        "user": {
            "id": existing_user.id,
            "username": existing_user.username,
            "role": existing_user.role
        },
        "token": token
    }

    

def handle_get_profile(user_id: int, role: str):
    """
        Handle the retrieval of a user's profile.
    """

    if role == "supplier":
        return get_supplier_by_user_id(user_id)
    elif role == "manager":
        return get_manager_by_user_id(user_id)
    elif role == "worker":
        return get_worker_by_user_id(user_id)
    else:
        raise HTTPException(status_code=400, detail="Invalid role")



