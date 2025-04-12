from app.database import get_db_session
from app.models import Manager

def get_manager_by_user_id(id: int):
    """
        Get a manager by username.
    """
    with get_db_session() as db:
        return db.query(Manager).filter(Manager.user_id == id).first()
    

def get_managers_count():
    """
        Get the count of managers.
    """
    with get_db_session() as db:
        return db.query(Manager).count()
    
