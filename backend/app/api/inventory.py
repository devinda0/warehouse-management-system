from fastapi import APIRouter, Depends, status
from app.dependancies import verify_jwt_token
from app.services import (
    handle_get_inventory_by_id,
    handle_get_inventory,
    handle_create_inventory,
    handle_update_inventory,
    handle_delete_inventory
)
from app.schemas import InventoryBase, InventoryQueryParams

inventoryRouter = APIRouter()


@inventoryRouter.get("/", response_model=list[InventoryBase])
async def get_inventory(
    skip: int = 0, 
    limit: int = 100,
    payload: dict = Depends(verify_jwt_token)
):
    """
        Get all inventories.
    """
    return handle_get_inventory(skip=skip, limit=limit)


@inventoryRouter.get("/{id}", response_model=InventoryBase)
async def get_inventory_by_id(
    id: int,
    payload: dict = Depends(verify_jwt_token)
):
    """
        Get an inventory by id.
    """
    return handle_get_inventory_by_id(id=id)


@inventoryRouter.post("/", response_model=InventoryBase, status_code=status.HTTP_201_CREATED)
async def create_inventory(
    inventory: InventoryBase,
    payload: dict = Depends(verify_jwt_token)
):
    """
        Create a new inventory.
    """
    return handle_create_inventory(inventory=inventory)


@inventoryRouter.put("/{id}", response_model=InventoryBase)
async def update_inventory(
    id: int,
    inventory: InventoryBase,
    payload: dict = Depends(verify_jwt_token)
):
    """
        Update an inventory.
    """
    return handle_update_inventory(id=id, inventory=inventory)


@inventoryRouter.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_inventory(
    id: int,
    payload: dict = Depends(verify_jwt_token)
):
    """
        Delete an inventory.
    """
    return handle_delete_inventory(id=id)