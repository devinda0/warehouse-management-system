from fastapi import APIRouter, Depends
from app.schemas.warehouse import WarehouseBase, WarehouseQueryParams
from app.services.warehouse import (
    create_new_warehouse,
    handle_get_warehouses,
    handle_get_warehouse_by_id,
    handle_delete_warehouse,
    handle_update_warehouse,
)

warehouseRouter = APIRouter()


# create get route for get all warehouses with use of WarehouseQueryParams
@warehouseRouter.get("/", response_model=list[WarehouseBase])
async def get_warehouses(params: WarehouseQueryParams = Depends()):
    """
    Retrieve all warehouses with pagination.
    """
    skip = (params.page - 1) * params.limit
    limit = params.limit

    # Call the service function to get warehouses
    warehouses = handle_get_warehouses(skip=skip, limit=limit)
    return warehouses


# get endpoint for get ware house by id
@warehouseRouter.get("/{warehouse_id}", response_model=WarehouseBase)
async def get_warehouse_by_id(warehouse_id: int):
    """
    Retrieve a warehouse by its ID.
    """
    # Call the service function to get a warehouse by ID
    warehouse = handle_get_warehouse_by_id(warehouse_id=warehouse_id)
    return warehouse


# create post request for add new warehouse
@warehouseRouter.post("/", response_model=WarehouseBase)
async def create_warehouse(warehouse_data: WarehouseBase):
    """
    Create a new warehouse.
    """
    # Call the service function to create a new warehouse
    warehouse_data = create_new_warehouse(warehouse=warehouse_data)
    return warehouse_data


# PUT endpoint for update warehouse
@warehouseRouter.put("/{warehouse_id}", response_model=WarehouseBase)
async def update_warehouse(
    warehouse_id: int,
    warehouse_data: WarehouseBase,
):
    """
    Update an existing warehouse.
    """
    # Call the service function to update a warehouse
    updated_warehouse = handle_update_warehouse(
        warehouse_id=warehouse_id, warehouse=warehouse_data
    )
    return updated_warehouse


# DELETE endpoint for delete warehouse
@warehouseRouter.delete("/{warehouse_id}")
async def delete_warehouse(warehouse_id: int):
    """
    Delete a warehouse by ID.
    """
    # Call the service function to delete a warehouse
    handle_delete_warehouse(warehouse_id=warehouse_id)
