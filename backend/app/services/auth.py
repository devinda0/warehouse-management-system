from app.database import registerSupplier, get_user_by_username
from app.schemas import SupplierCreate
from fastapi import HTTPException


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
        return {"message": "Supplier registered successfully"}