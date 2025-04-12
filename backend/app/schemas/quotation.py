from fastapi import Query
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


class QuotationQueryParams(BaseModel):
    """
    Query parameters for filtering quotations.
    """
    status: Optional[str] = Query(None, description="Filter by quotation status")
    page: int = Query(1, ge=1, description="Page number for pagination")
    limit: int = Query(10, ge=1, le=100, description="Number of items per page")


class QuotationBase(BaseModel):
    """
    Base model for quotations.
    """
    id: Optional[int] = Field(None, description="Unique identifier for the quotation")
    name: str = Field(..., description="Name of the quotation")
    category: str = Field(..., description="Category of the quotation")
    quantity: int = Field(..., description="Quantity of the quotation")
    unit: str = Field(..., description="Unit of measurement for the quotation")
    price: int = Field(..., description="Price of the quotation")
    expiration_date: date = Field(..., description="Expiration date of the quotation")
    request_id: int = Field(..., description="ID of the associated request")
    status: Optional[str] = Field(None, description="Status of the quotation")
    supplier_id: Optional[int] = Field(..., description="ID of the associated supplier")

    class Config:
        orm_mode = True