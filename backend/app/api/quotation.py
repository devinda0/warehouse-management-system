from app.schemas import QuotationBase, QuotationQueryParams
from fastapi import APIRouter, Depends, HTTPException
from app.services import (
    handle_get_quotations,
    handle_get_quotation_by_id,
    handle_create_quotation,
    handle_update_quotation,
    handle_delete_quotation,
    handle_get_quotation_by_request_id,
    handle_get_quotation_by_supplier_id,
    handle_approve_quotation,
    handle_reject_quotation,
)

quotationRouter = APIRouter()


@quotationRouter.get("/", response_model=list[QuotationBase])
async def get_quotations(
    params: QuotationQueryParams = Depends(),
):
    """
    Get all quotations.
    """
    skip = (params.page - 1) * params.limit
    limit = params.limit
    return handle_get_quotations(skip=skip, limit=limit)


@quotationRouter.get("/{quotation_id}", response_model=QuotationBase)
async def get_quotation_by_id(
    quotation_id: int,
):
    """
    Get a quotation by its ID.
    """
    return handle_get_quotation_by_id(quotation_id=quotation_id)


@quotationRouter.post("/", response_model=QuotationBase)
async def create_quotation(
    quotation_data: QuotationBase, #need to be edit. need to extract supplier id from token
    # supplier_id: int = Depends(get_current_user_id), # Assuming you have a function to get the current user ID
):
    """
    Create a new quotation.
    """
    return handle_create_quotation(quotation_data=quotation_data)


@quotationRouter.put("/{quotation_id}", response_model=QuotationBase)
async def update_quotation(
    quotation_id: int,
    quotation_data: QuotationBase,
):
    """
    Update an existing quotation.
    """
    return handle_update_quotation(quotation_id=quotation_id, quotation_data=quotation_data)


@quotationRouter.delete("/{quotation_id}")
async def delete_quotation(
    quotation_id: int,
):
    """
    Delete a quotation.
    """
    return handle_delete_quotation(quotation_id=quotation_id)


@quotationRouter.get("/request/{request_id}", response_model=list[QuotationBase])
async def get_quotation_by_request_id(
    request_id: int,
):
    """
    Get a quotation by its request ID.
    """
    return handle_get_quotation_by_request_id(request_id=request_id)


@quotationRouter.get("/supplier/{supplier_id}", response_model=list[QuotationBase])
async def get_quotation_by_supplier_id(
    supplier_id: int,
):
    """
    Get a quotation by its supplier ID.
    """
    return handle_get_quotation_by_supplier_id(supplier_id=supplier_id)

@quotationRouter.put("/approve/{queotation_id}", response_model=list[QuotationBase])
async def approve_quotation(
    quotation_id: int,
):
    """
    Approve a quotation.
    """
    return handle_approve_quotation(quotation_id=quotation_id)


@quotationRouter.put("/reject/{quotation_id}", response_model=list[QuotationBase])
async def reject_quotation(
    quotation_id: int,
):
    """
    Reject a quotation.
    """
    return handle_reject_quotation(quotation_id=quotation_id)