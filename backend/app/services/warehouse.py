from app.schemas.warehouse import WarehouseBase
from fastapi import HTTPException, status
from app.database.warehouse import create_warehouse, get_warehouses


def create_new_warehouse(warehouse: WarehouseBase):
    if warehouse.current_capacity == None:
        warehouse.current_capacity = warehouse.available_capacity
    if warehouse.current_capacity > warehouse.available_capacity:
        # raise Suitable HTTP Exception with suitable status code
        raise HTTPException(
            status_code=400,
            detail="Current capacity cannot be greater than available capacity",
        )
    try:
        new_warehouse = create_warehouse(warehouse=warehouse)
        return new_warehouse
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


def handle_get_requests(skip: int, limit: int):
    """
    Handle the logic for retrieving requests.
    """
    try:
        requests = get_warehouses(skip=skip, limit=limit)
        return requests
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while retrieving warehouses",
        )
