from fastapi import Query
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


class WarehouseQueryParams(BaseModel):
    """
    Query parameters for filtering requests.
    """

    status: Optional[str] = Query(None, description="Filter by request status")
    page: int = Query(1, ge=1, description="Page number for pagination")
    limit: int = Query(10, ge=1, le=100, description="Number of items per page")


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

    current_capacity: Optional[int] = Field(
        None, description="Current capacity of the warehouse"
    )

    class Config:
        orm_mode = True
