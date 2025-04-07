from app.database import get_db_session
from app.models import Supplier

def get_supplier_by_user_id(id: int):
    """
        Get a supplier by username.
    """
    with get_db_session() as db:
        return db.query(Supplier).filter(Supplier.user_id == id).first()


