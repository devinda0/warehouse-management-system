from fastapi import APIRouter, Depends
from app.schemas.warehouse import WarehouseBase
from app.services.warehouse import create_new_warehouse, get_warehouses

warehouseRouter = APIRouter()


# create get route for get all warehouses with use of WarehouseQueryParams
@warehouseRouter.get("/", response_model=list[WarehouseBase])
async def get_warehouses(params: WarehouseBase = Depends()):
    """
    Retrieve all warehouses with pagination.
    """
    skip = (params.page - 1) * params.limit
    limit = params.limit

    # Call the service function to get warehouses
    warehouses = get_warehouses(skip=skip, limit=limit)
    return warehouses


# create post request for add new warehouse
@warehouseRouter.post("/", response_model=WarehouseBase)
async def create_warehouse(warehouse_data: WarehouseBase):
    """
    Create a new warehouse.
    """
    # Call the service function to create a new warehouse
    warehouse_data = create_new_warehouse(warehouse=warehouse_data)
    return warehouse_data
