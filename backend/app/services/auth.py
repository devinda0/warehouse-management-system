from app.database import (
    registerSupplier, 
    get_user_by_username,
    get_supplier_by_user_id,
    get_manager_by_user_id,
    get_worker_by_user_id
)
from app.schemas import SupplierCreate, UserCreate
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from app.utils import verify_password, create_jwt_token, decode_jwt_token


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

    access_token = create_jwt_token(
        data={
            "id" : existing_user.id,
            "username": existing_user.username,
            "role": existing_user.role
        },
        expires_in=60
    )
    
    refresh_token = create_jwt_token(
        data={
            "id" : existing_user.id,
            "username": existing_user.username,
            "role": existing_user.role
        },
        expires_in=3600
    )

    response = JSONResponse(
        content={
            "message": "Login successful",
            "access_token": access_token,
        },
        status_code=200
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        samesite="None",
        expires=3600
    )

    return response


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



def handle_refresh_token(token: str):
    """
        Handle the refresh of a JWT token.
    """
    try:
        # Decode the token to get the user ID and role
        payload = decode_jwt_token(token)
        user_id = payload.get("id")
        role = payload.get("role")
        username = payload.get("username")

        # Create a new token with the same user ID and role
        refresh_token = create_jwt_token(
            data={
                "id": user_id,
                "username": username,
                "role": role
            },
            expires_in=3600
        )

        access_token = create_jwt_token(
            data={
                "id": user_id,
                "role": role,
                "username": username
            },
            expires_in=60
        )

        response = JSONResponse(
            content={
                "message": "Token refreshed successfully",
                "access_token": access_token,
            },
            status_code=200
        )
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite="None",
            expires=3600
        )
        return response
    
    except HTTPException as http_exc:
        # Handle specific HTTP exceptions
        print(f"HTTP error during token refresh: {http_exc.detail}")
        raise http_exc
    except Exception as e:
        print(f"Error during token refresh: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


def handle_logout():
    """
        Handle the logout of a user.
    """
    response = JSONResponse(
        content={
            "message": "Logout successful",
        },
        status_code=200
    )
    response.delete_cookie(key="refresh_token")
    return response

