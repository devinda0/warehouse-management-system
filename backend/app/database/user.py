from app.database import get_db_session
from app.models import User, Supplier
from app.utils import hash_password


def get_user_by_username(username: str):
    """
        Get a user by username.
    """
    with get_db_session() as db:
        user = db.query(User).filter(User.username == username).first()
        return user
    

def registerSupplier(name, email, phone, address, username, password):
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
            db.add(user)
            db.flush()
            
            added_user = db.query(User).filter(User.username == username).first()

            supplier = Supplier(
                name=name,
                email=email,
                phone=phone,
                address=address,
                user_id=added_user.id
            )

            db.add(supplier)
            db.commit()

        except Exception as e:
            db.rollback()
            raise e
