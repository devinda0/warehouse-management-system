from app.database import get_db_session
from app.models import Warehouse
from app.schemas.warehouse import WarehouseBase


def get_warehouses(skip: int = 0, limit: int = 100):
    """
    Get all warehouses from the database.
    """
    with get_db_session() as db:
        return db.query(Warehouse).offset(skip).limit(limit).all()


# create method for add new warehouse
def create_warehouse(warehouse: WarehouseBase):
    """
    Create a new warehouse in the database.
    """
    new_warehouse = Warehouse(**warehouse.model_dump())

    with get_db_session() as db:
        db.add(new_warehouse)
        db.commit()
        db.refresh(new_warehouse)
        return new_warehouse
