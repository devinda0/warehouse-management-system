from fastapi import HTTPException
from app.schemas import QuotationBase
from app.database import (
    get_quotations,
    get_quotation_by_id,
    create_quotation,
    update_quotation,
    delete_quotation,
    get_quotation_by_request_id,
    get_quotation_by_supplier_id,
    get_supplier_by_user_id
)


def handle_get_quotations(skip: int, limit: int):
    """
    Handle the logic for retrieving quotations.
    """
    try:
        quotations = get_quotations(skip=skip, limit=limit)
        return quotations
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while retrieving quotations: {str(e)}"
        )
    

def handle_get_quotation_by_id(quotation_id: int):
    """
    Handle the logic for retrieving a quotation by ID.
    """
    try:
        quotation = get_quotation_by_id(quotation_id=quotation_id)
        if not quotation:
            raise HTTPException(
                status_code=404,
                detail="Quotation not found"
            )
        return quotation
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while retrieving the quotation: {str(e)}"
        )
    

def handle_create_quotation(quotation_data: QuotationBase, user: dict):
    """
    Handle the logic for creating a new quotation.
    """
    if quotation_data.id is not None:
        raise HTTPException(
            status_code=400,
            detail="Quotation ID should not be provided for new quotations"
        )
    if quotation_data.status:
        raise HTTPException(
            status_code=400,
            detail="Quotation status should not be provided for new quotations"
        )

    try:
        supplier = get_supplier_by_user_id(id=user["id"])
        if not supplier:
            raise HTTPException(
                status_code=404,
                detail="Supplier not found"
            )
        
        quotation_data.supplier_id = supplier.id

        quotation = create_quotation(quotation=quotation_data)
        return quotation
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while creating the quotation"
        )
    

def handle_update_quotation(quotation_id: int, quotation_data: QuotationBase):
    """
    Handle the logic for updating an existing quotation.
    """
    if quotation_data.id is not None and quotation_data.id != quotation_id:
        raise HTTPException(
            status_code=400,
            detail="Quotation ID in the path and body must match"
        )
    

    try:
        old_quotation = get_quotation_by_id(quotation_id=quotation_id)

        if not old_quotation:
            raise HTTPException(
                status_code=404,
                detail="Quotation not found"
            )
        
        if quotation_data.request_id != old_quotation.request_id:
            raise HTTPException(
                status_code=400,
                detail="Quotation request ID cannot be changed"
            )
        
        if quotation_data.status is not None and quotation_data.status != old_quotation.status:
            raise HTTPException(
                status_code=400,
                detail="Quotation status cannot be changed"
            )
        
        if quotation_data.supplier_id != old_quotation.supplier_id:
            raise HTTPException(
                status_code=400,
                detail="Quotation supplier ID cannot be changed"
            )
        
        quotation_data.id = old_quotation.id
        quotation_data.status = old_quotation.status

        quotation = update_quotation(quotation_id=quotation_id, quotation=quotation_data)
        if not quotation:
            raise HTTPException(
                status_code=404,
                detail="Quotation not found"
            )
        return quotation
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while updating the quotation"
        )
    

def handle_delete_quotation(quotation_id: int):
    """
    Handle the logic for deleting a quotation.
    """
    try:
        success = delete_quotation(quotation_id=quotation_id)
        if not success:
            raise HTTPException(
                status_code=404,
                detail="Quotation not found"
            )
        return {"message": "Quotation deleted successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while deleting the quotation: {str(e)}"
        )
    

def handle_get_quotation_by_request_id(request_id: int):
    """
    Handle the logic for retrieving a quotation by request ID.
    """
    try:
        quotations = get_quotation_by_request_id(request_id=request_id)
        if not quotations:
            raise HTTPException(
                status_code=404,
                detail="No quotations found for the given request ID"
            )
        return quotations
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while retrieving the quotation: {str(e)}"
        )
    

def handle_approve_quotation(quotation_id: int):
    """
    Handle the logic for approving a quotation.
    """
    try:
        quotation = get_quotation_by_id(quotation_id=quotation_id)
        if not quotation:
            raise HTTPException(
                status_code=404,
                detail="Quotation not found"
            )
        
        if quotation.status != "PENDING":
            raise HTTPException(
                status_code=400,
                detail="Quotation cannot be approved as it is not in pending status"
            )
        
        quotation_temp = QuotationBase.model_validate(quotation)
        quotation_temp.status = "APPROVED"
        
        updated_quotation = update_quotation(quotation_id=quotation_id, quotation=quotation_temp)
        if not updated_quotation:
            raise HTTPException(
                status_code=404,
                detail="Quotation not found"
            )
        return updated_quotation
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while approving the quotation"
        )
    

def handle_reject_quotation(quotation_id: int):
    """
    Handle the logic for rejecting a quotation.
    """
    try:
        quotation = get_quotation_by_id(quotation_id=quotation_id)
        if not quotation:
            raise HTTPException(
                status_code=404,
                detail="Quotation not found"
            )
        
        if quotation.status != "PENDING":
            raise HTTPException(
                status_code=400,
                detail="Quotation cannot be rejected as it is not in pending status"
            )
        
        quotation_temp = QuotationBase.model_validate(quotation)
        quotation_temp.status = "REJECTED"
        updated_quotation = update_quotation(quotation_id=quotation_id, quotation=quotation_temp)
        if not updated_quotation:
            raise HTTPException(
                status_code=404,
                detail="Quotation not found"
            )
        return updated_quotation
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while rejecting the quotation"
        )
    

def handle_get_quotation_by_supplier_id(supplier_id: int):
    """
    Handle the logic for retrieving a quotation by supplier ID.
    """
    try:
        quotations = get_quotation_by_supplier_id(supplier_id=supplier_id)
        if not quotations:
            raise HTTPException(
                status_code=404,
                detail="No quotations found for the given supplier ID"
            )
        return quotations
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while retrieving the quotation: {str(e)}"
        )



