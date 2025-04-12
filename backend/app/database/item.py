from app.database import get_db_session
from app.models import Item

def get_item_by_id(id: int):
    """
        Get an item by id.
    """
    with get_db_session() as db:
        return db.query(Item).filter(Item.id == id).first()
    

def get_item(skip: int = 0, limit: int = 100):
    """
        Get all inventories from the database.
    """
    with get_db_session() as db:
        return db.query(Item).offset(skip).limit(limit).all()
    

def create_item(item: Item):
    """
        Create a new item in the database.
    """
    new_item = Item(**item.model_dump())
    
    with get_db_session() as db:
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
        return new_item
    

def update_item(id: int, item: Item):
    """
        Update an existing item in the database.
    """
    with get_db_session() as db:
        existing_item = db.query(Item).filter(Item.id == id).first()
        if existing_item:
            for key, value in item.model_dump().items():
                setattr(existing_item, key, value)
            db.commit()
            db.refresh(existing_item)
            return existing_item
        return None


def delete_item(id: int):
    """
        Delete an item from the database.
    """
    with get_db_session() as db:
        existing_item = db.query(Item).filter(Item.id == id).first()
        if existing_item:
            db.delete(existing_item)
            db.commit()
            return True
        return False
    

