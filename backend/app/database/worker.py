from app.database import get_db_session
from app.models import Worker


def get_worker_by_user_id(id: int):
    """
        Get a worker by username.
    """
    with get_db_session() as db:
        return db.query(Worker).filter(Worker.user_id == id).first()
         