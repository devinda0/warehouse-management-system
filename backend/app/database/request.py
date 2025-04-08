from app.database import get_db_session
from app.models import Request
from app.schemas import RequestBase

def get_requests(skip: int = 0, limit: int = 100):
    """
        Get all requests from the database.
    """
    with get_db_session() as db:
        return db.query(Request).offset(skip).limit(limit).all()
    

def get_request_by_id(request_id: int):
    """
        Get a request by its ID.
    """
    with get_db_session() as db:
        return db.query(Request).filter(Request.id == request_id).first()
    

def create_request(request: RequestBase):
    """
        Create a new request in the database.
    """

    new_request = Request(**request.model_dump())

    with get_db_session() as db:
        db.add(new_request)
        db.commit()
        db.refresh(new_request)
        return new_request
    

def update_request(request_id: int, request: RequestBase):
    """
        Update an existing request in the database.
    """
    with get_db_session() as db:
        existing_request = db.query(Request).filter(Request.id == request_id).first()
        if existing_request:
            for key, value in request.dict().items():
                setattr(existing_request, key, value)
            db.commit()
            db.refresh(existing_request)
            return existing_request
        return None
    

def delete_request(request_id: int):
    """
        Delete a request from the database.
    """
    with get_db_session() as db:
        existing_request = db.query(Request).filter(Request.id == request_id).first()
        if existing_request:
            db.delete(existing_request)
            db.commit()
            return True
        return False
    

