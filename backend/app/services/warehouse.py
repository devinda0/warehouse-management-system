from app.schemas.warehouse import WarehouseBase
from fastapi import HTTPException, status
from app.database.warehouse import (
    create_warehouse,
    get_warehouses,
    get_warehouse_by_id,
    update_warehouse,
    delete_warehouse,
)


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


def handle_get_warehouses(skip: int, limit: int):
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


def handle_get_warehouse_by_id(warehouse_id: int):
    """
    Handle the logic for retrieving a warehouse by its ID.
    """
    try:
        warehouse = get_warehouse_by_id(warehouse_id=warehouse_id)
        if not warehouse:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Warehouse with id {warehouse_id} not found",
            )
        return warehouse
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while retrieving the warehouse",
        )


# function for update warehouse
def handle_update_warehouse(warehouse_id: int, warehouse: WarehouseBase):
    """
    Handle the logic for updating a warehouse.
    """
    try:
        existing_warehouse = get_warehouse_by_id(warehouse_id=warehouse_id)
        if not existing_warehouse:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Warehouse with id {warehouse_id} not found",
            )
        updated_warehouse = update_warehouse(
            warehouse_id=warehouse_id, warehouse=warehouse
        )
        return updated_warehouse
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while updating the warehouse",
        )


# funtion for delete warehouse
def handle_delete_warehouse(warehouse_id: int):
    """
    Handle the logic for deleting a warehouse.
    """
    try:
        existing_warehouse = get_warehouse_by_id(warehouse_id=warehouse_id)
        if not existing_warehouse:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Warehouse with id {warehouse_id} not found",
            )
        warehouse_delete_response = delete_warehouse(warehouse_id=warehouse_id)
        return warehouse_delete_response
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while deleting the warehouse",
        )
