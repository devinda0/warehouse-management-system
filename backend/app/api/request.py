from fastapi import APIRouter, Depends
from app.schemas import RequestQueryParams, RequestBase
from app.services import (
    handle_get_requests,
    handle_get_request_by_id,
    handle_create_request,
    handle_update_request,
    handle_delete_request
)

requestRouter = APIRouter()

@requestRouter.get("/", response_model=list[RequestBase])
async def get_requests(params: RequestQueryParams = Depends()):
    """
    Retrieve all requests.
    """

    skip = (params.page - 1) * params.limit
    limit = params.limit

    return handle_get_requests(skip=skip, limit=limit)


@requestRouter.get("/{request_id}", response_model=RequestBase)
async def get_request_by_id(request_id: int):
    """
    Retrieve a request by ID.
    """
    return handle_get_request_by_id(request_id=request_id)


@requestRouter.post("/", response_model=RequestBase)
async def create_request(request_data: RequestBase):
    """
    Create a new request.
    """
    return handle_create_request(request_data=request_data)


@requestRouter.put("/{request_id}", response_model=RequestBase)
async def update_request(request_id: int, request_data: RequestBase):
    """
    Update an existing request.
    """
    return handle_update_request(request_id=request_id, request_data=request_data)


@requestRouter.delete("/{request_id}")
async def delete_request(request_id: int):
    """
    Delete a request by ID.
    """
    return handle_delete_request(request_id=request_id)