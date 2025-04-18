from fastapi import Query
from pydantic import BaseModel, Field
from typing import Optional


class RequestQueryParams(BaseModel):
    """
    Query parameters for filtering requests.
    """
    status: Optional[str] = Query(None, description="Filter by request status")
    page: int = Query(1, ge=1, description="Page number for pagination")
    limit: int = Query(10, ge=1, le=100, description="Number of items per page")


class RequestBase(BaseModel):
    """
    Base model for requests.
    """
    id: Optional[int] = Field(None, description="Unique identifier for the request")
    name: str = Field(..., description="Name of the request")
    category: str = Field(..., description="Category of the request")
    quantity: int = Field(..., description="Quantity of the request")
    unit: str = Field(..., description="Unit of measurement for the request")
    status: Optional[str] = Field(None, description="Status of the request")

    