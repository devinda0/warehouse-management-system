from app.database import get_db_session
from app.schemas import QuotationBase
from app.models import Quotation

def get_quotations(skip: int = 0, limit: int = 100):
    """
        Get all quotations from the database.
    """
    with get_db_session() as db:
        return db.query(Quotation).offset(skip).limit(limit).all()
    

def get_quotation_by_id(quotation_id: int):
    """
        Get a quotation by its ID.
    """
    with get_db_session() as db:
        return db.query(Quotation).filter(Quotation.id == quotation_id).first()
    

def create_quotation(quotation: QuotationBase):
    """
        Create a new quotation in the database.
    """

    new_quotation = Quotation(**quotation.model_dump())

    with get_db_session() as db:
        db.add(new_quotation)
        db.commit()
        db.refresh(new_quotation)
        return new_quotation
    

def update_quotation(quotation_id: int, quotation: QuotationBase):
    """
        Update an existing quotation in the database.
    """
    with get_db_session() as db:
        existing_quotation = db.query(Quotation).filter(Quotation.id == quotation_id).first()
        if existing_quotation:
            for key, value in quotation.model_dump().items():
                setattr(existing_quotation, key, value)
            db.commit()
            db.refresh(existing_quotation)
            return existing_quotation
        return None
    

def delete_quotation(quotation_id: int):
    """
        Delete a quotation from the database.
    """
    with get_db_session() as db:
        existing_quotation = db.query(Quotation).filter(Quotation.id == quotation_id).first()
        if existing_quotation:
            db.delete(existing_quotation)
            db.commit()
            return True
        return False
    

def get_quotation_by_request_id(request_id: int):
    """
        Get a quotation by its request ID.
    """
    with get_db_session() as db:
        return db.query(Quotation).filter(Quotation.request_id == request_id).all()
    

