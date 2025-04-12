from fastapi import Query
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


class InventoryQueryParams(BaseModel):
    """
    Query parameters for filtering inventories.
    """
    page: int = Query(1, ge=1, description="Page number for pagination")
    limit: int = Query(10, ge=1, le=100, description="Number of items per page")


class InventoryBase(BaseModel):
    """
    Base model for inventories.
    """
    id: Optional[int] = Field(None, description="Unique identifier for the inventory")
    name: str = Field(..., description="Name of the inventory")
    sku: str = Field(..., description="SKU of the inventory")
    category: str = Field(..., description="Category of the inventory")
    quantity: int = Field(..., description="Quantity of the inventory")
    unit: str = Field(..., description="Unit of measurement for the inventory")
    price: int = Field(..., description="Price of the inventory")
    expiration_date: date = Field(..., description="Expiration date of the inventory")

    class Config:
        orm_mode = True

