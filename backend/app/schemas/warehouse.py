from fastapi import Query
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


# create request base modal for warehouse
class WarehouseBase(BaseModel):
    """
    Base model for warehouse.
    """

    id: Optional[int] = Field(None, description="Unique identifier for the warehouse")
    name: str = Field(..., description="Name of the warehouse")
    address: str = Field(..., description="Address of the warehouse")
    phone: str = Field(..., description="Phone number of the warehouse")
    available_capacity: int = Field(
        ..., description="Available capacity of the warehouse"
    )
    current_capacity: int = Field(..., description="Current capacity of the warehouse")

    class Config:
        orm_mode = True
