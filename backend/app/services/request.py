from app.database import (
    get_requests,
    get_request_by_id,
    create_request,
    update_request,
    delete_request,
)
from app.schemas import RequestBase
from fastapi import HTTPException, status


def handle_get_requests(skip: int, limit: int):
    """
    Handle the logic for retrieving requests.
    """
    try:
        requests = get_requests(skip=skip, limit=limit)
        return requests
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while retrieving requests"
        )
    

def handle_get_request_by_id(request_id: int):
    """
    Handle the logic for retrieving a request by ID.
    """
    try:
        request = get_request_by_id(request_id=request_id)
        if not request:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Request not found"
            )
        return request
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while retrieving the request"
        )
    

def handle_create_request(request_data:RequestBase):
    """
    Handle the logic for creating a new request.
    """
    if request_data.id is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request ID should not be provided for new requests"
        )
    
    if request_data.status is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request status should not be provided for new requests"
        )
    
    request_data.status = "OPENED"

    try:
        request = create_request(request=request_data)
        return request
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while creating the request"
        )


def handle_update_request(request_id: int, request_data:RequestBase):
    """
    Handle the logic for updating a request.
    """
    if request_data.id and request_id != request_data.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request ID does not match the provided data"
        )
    
    if request_data.id is None:
        request_data.id = request_id

    try:
        request = update_request(request_id=request_id, request=request_data)
        if not request:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Request not found"
            )
        return request
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while updating the request"
        )
    

def handle_delete_request(request_id: int):
    """
    Handle the logic for deleting a request.
    """
    try:
        request = delete_request(request_id=request_id)
        if not request:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Request not found"
            )
        return {"message": "Request deleted successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while deleting the request"
        )
    



