from app.database import get_db_session
from app.models import Warehouse
from app.schemas.warehouse import WarehouseBase


def get_warehouses(skip: int = 0, limit: int = 100):
    """
    Get all warehouses from the database.
    """
    with get_db_session() as db:
        return db.query(Warehouse).offset(skip).limit(limit).all()


# method for get warehouse by id
def get_warehouse_by_id(warehouse_id: int):
    """
    Get a warehouse by its ID.
    """
    with get_db_session() as db:
        return db.query(Warehouse).filter(Warehouse.id == warehouse_id).first()


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


# method for update warehouse
def update_warehouse(warehouse_id: int, warehouse: WarehouseBase):
    """
    Update an existing warehouse in the database.
    """
    with get_db_session() as db:
        existing_warehouse = (
            db.query(Warehouse).filter(Warehouse.id == warehouse_id).first()
        )
        if existing_warehouse:
            for key, value in warehouse.dict().items():
                setattr(existing_warehouse, key, value)
            db.commit()
            db.refresh(existing_warehouse)
            return existing_warehouse
        return None


# method for delete warehouse
def delete_warehouse(warehouse_id: int):
    """
    Delete a warehouse from the database.
    """
    with get_db_session() as db:
        existing_warehouse = (
            db.query(Warehouse).filter(Warehouse.id == warehouse_id).first()
        )
        if existing_warehouse:
            db.delete(existing_warehouse)
            db.commit()
            return True
        return False
