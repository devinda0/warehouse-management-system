from fastapi import APIRouter, Depends, status
from app.dependancies import verify_jwt_token
from app.services import (
    handle_get_item_by_id,
    handle_get_item,
    handle_create_item,
    handle_update_item,
    handle_delete_item
)
from app.schemas import ItemBase, ItemQueryParams

itemRouter = APIRouter()


@itemRouter.get("/", response_model=list[ItemBase])
async def get_item(
    skip: int = 0, 
    limit: int = 100,
    payload: dict = Depends(verify_jwt_token)
):
    """
        Get all inventories.
    """
    return handle_get_item(skip=skip, limit=limit)


@itemRouter.get("/{id}", response_model=ItemBase)
async def get_item_by_id(
    id: int
):
    """
        Get an item by id.
    """
    return handle_get_item_by_id(id=id)


@itemRouter.post("/", response_model=ItemBase, status_code=status.HTTP_201_CREATED)
async def create_item(
    item: ItemBase
):
    """
        Create a new item.
    """
    return handle_create_item(item=item)


@itemRouter.put("/{id}", response_model=ItemBase)
async def update_item(
    id: int,
    item: ItemBase,
    payload: dict = Depends(verify_jwt_token)
):
    """
        Update an item.
    """
    return handle_update_item(id=id, item=item)


@itemRouter.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(
    id: int,
    payload: dict = Depends(verify_jwt_token)
):
    """
        Delete an item.
    """
    return handle_delete_item(id=id)