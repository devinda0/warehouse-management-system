from fastapi import Query
from pydantic import BaseModel, Field
from typing import Optional, List

class WorkerBase(BaseModel):
    """
    Base model for worker.
    """

    id: Optional[int] = Field(None, description="Unique identifier for the worker")
    name: str = Field(..., description="Name of the worker")
    phone: str = Field(..., description="Phone number of the worker")
    email: str = Field(..., description="Email address of the worker")
    address: str = Field(..., description="Address of the worker")
    birthday: str = Field(..., description="Birthday of the worker")
    salary: int = Field(..., description="Salary of the worker")
    status: Optional[str] = Field(None, description="Status of the worker")

    class Config:
        orm_mode = True


class WorkerQueryParams(BaseModel):
    """
    Query parameters for filtering requests.
    """

    page: int = Query(1, ge=1, description="Page number for pagination")
    limit: int = Query(10, ge=1, le=100, description="Number of items per page")

