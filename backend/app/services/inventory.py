from app.database import (
    get_inventory_by_id,
    get_inventory,
    create_inventory,
    update_inventory,
    delete_inventory
)
from app.schemas import InventoryBase, InventoryQueryParams
from fastapi import HTTPException


def handle_get_inventory_by_id(id: int):
    """
        Handle the retrieval of an inventory by id.
    """
    inventory = get_inventory_by_id(id)
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return inventory


def handle_get_inventory(skip: int = 0, limit: int = 100):
    """
        Handle the retrieval of all inventories.
    """
    inventories = get_inventory(skip, limit)
    if not inventories:
        raise HTTPException(status_code=404, detail="No inventories found")
    return inventories


def handle_create_inventory(inventory: InventoryBase):
    """
        Handle the creation of a new inventory.
    """
    new_inventory = create_inventory(inventory)
    if not new_inventory:
        raise HTTPException(status_code=400, detail="Failed to create inventory")
    return new_inventory


def handle_update_inventory(id: int, inventory: InventoryBase):
    """
        Handle the update of an existing inventory.
    """
    updated_inventory = update_inventory(id, inventory)
    if not updated_inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return updated_inventory


def handle_delete_inventory(id: int):
    """
        Handle the deletion of an inventory.
    """
    deleted = delete_inventory(id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return {"message": "Inventory deleted successfully"}