from app.database import (
    get_item_by_id,
    get_item,
    create_item,
    update_item,
    delete_item
)
from app.schemas import ItemBase, ItemQueryParams
from fastapi import HTTPException


def handle_get_item_by_id(id: int):
    """
        Handle the retrieval of an item by id.
    """
    item = get_item_by_id(id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


def handle_get_item(skip: int = 0, limit: int = 100):
    """
        Handle the retrieval of all inventories.
    """
    inventories = get_item(skip, limit)
    if not inventories:
        raise HTTPException(status_code=404, detail="No inventories found")
    return inventories


def handle_create_item(item: ItemBase):
    """
        Handle the creation of a new item.
    """
    new_item = create_item(item)
    if not new_item:
        raise HTTPException(status_code=400, detail="Failed to create item")
    return new_item


def handle_update_item(id: int, item: ItemBase):
    """
        Handle the update of an existing item.
    """
    existing_item = get_item_by_id(id)
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found")

    item.id = id  # Ensure the ID is set for the update

    updated_item = update_item(id, item)
    if not updated_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return updated_item


def handle_delete_item(id: int):
    """
        Handle the deletion of an item.
    """
    deleted = delete_item(id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}