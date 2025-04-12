from fastapi import Query
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


class ItemQueryParams(BaseModel):
    """
    Query parameters for filtering inventories.
    """
    page: int = Query(1, ge=1, description="Page number for pagination")
    limit: int = Query(10, ge=1, le=100, description="Number of items per page")


class ItemBase(BaseModel):
    """
    Base model for inventories.
    """
    id: Optional[int] = Field(None, description="Unique identifier for the item")
    name: str = Field(..., description="Name of the item")
    sku: str = Field(..., description="SKU of the item")
    category: str = Field(..., description="Category of the item")
    quantity: int = Field(..., description="Quantity of the item")
    unit: str = Field(..., description="Unit of measurement for the item")
    price: int = Field(..., description="Price of the item")
    expiration_date: date = Field(..., description="Expiration date of the item")
    space: int = Field(..., description="Space occupied by the item")

    class Config:
        orm_mode = True

