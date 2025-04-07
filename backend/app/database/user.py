from app.schemas import SupplierCreate
from app.database import get_db_session
from fastapi import HTTPException
from app.models import User, Supplier
from app.utils import hash_password

def registerSupplier(supplier: SupplierCreate):
    """
        Register a new supplier in the database.
    """

    user = User(
        username=supplier.username,
        hashed_password=hash_password(supplier.password),
        role="supplier",
    )

    with get_db_session() as db:
        try:
            exists_user = db.query(User).filter(User.username == supplier.username).first()
            if exists_user:
                raise HTTPException(
                    status_code=400,
                    detail="Username already exists"
                )
            
            db.add(user)
            db.flush()
            
            added_user = db.query(User).filter(User.username == supplier.username).first()
            
            if not added_user:
                raise HTTPException(
                    status_code=400,
                    detail="Failed to create user"
                )

            supplier = Supplier(
                name=supplier.name,
                email=supplier.email,
                phone=supplier.phone,
                address=supplier.address,
                user_id=added_user.id
            )

            db.add(supplier)
            db.commit()
            
            return { "message": "Supplier registered successfully" }

        except Exception as e:
            db.rollback()
            raise e
    

def login():
    """
        Login a user.
    """
    pass
