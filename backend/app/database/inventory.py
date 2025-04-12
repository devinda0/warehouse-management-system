from app.database import get_db_session
from app.models import Inventory

def get_inventory_by_id(id: int):
    """
        Get an inventory by id.
    """
    with get_db_session() as db:
        return db.query(Inventory).filter(Inventory.id == id).first()
    

def get_inventory(skip: int = 0, limit: int = 100):
    """
        Get all inventories from the database.
    """
    with get_db_session() as db:
        return db.query(Inventory).offset(skip).limit(limit).all()
    

def create_inventory(inventory: Inventory):
    """
        Create a new inventory in the database.
    """
    new_inventory = Inventory(**inventory.model_dump())
    
    with get_db_session() as db:
        db.add(new_inventory)
        db.commit()
        db.refresh(new_inventory)
        return new_inventory
    

def update_inventory(id: int, inventory: Inventory):
    """
        Update an existing inventory in the database.
    """
    with get_db_session() as db:
        existing_inventory = db.query(Inventory).filter(Inventory.id == id).first()
        if existing_inventory:
            for key, value in inventory.model_dump().items():
                setattr(existing_inventory, key, value)
            db.commit()
            db.refresh(existing_inventory)
            return existing_inventory
        return None


def delete_inventory(id: int):
    """
        Delete an inventory from the database.
    """
    with get_db_session() as db:
        existing_inventory = db.query(Inventory).filter(Inventory.id == id).first()
        if existing_inventory:
            db.delete(existing_inventory)
            db.commit()
            return True
        return False
    

