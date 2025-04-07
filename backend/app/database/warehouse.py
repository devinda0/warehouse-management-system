from app.database import get_db_session
from app.models import Warehouse

def get_warehouses(skip: int = 0, limit: int = 100):
    """
        Get all warehouses from the database.
    """
    with get_db_session() as db:
        return db.query(Warehouse).offset(skip).limit(limit).all()