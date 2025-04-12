from app.database import get_db_session
from app.models import Worker, User, UserWorker
from app.schemas import WorkerBase, UserCreate


def get_worker_by_user_id(id: int):
    """
        Get a worker by username.
    """
    with get_db_session() as db:
        return db.query(Worker).filter(Worker.user_id == id).first()
         

def get_workers(skip: int = 0, limit: int = 100):
    """
        Get all workers from the database.
    """
    with get_db_session() as db:
        return db.query(Worker).offset(skip).limit(limit).all()


def get_workers_count():
    """
        Get the count of workers.
    """
    with get_db_session() as db:
        return db.query(Worker).count()
    

def get_worker_by_id(id: int):
    """
        Get a worker by id.
    """
    with get_db_session() as db:
        return db.query(Worker).filter(Worker.id == id).first()
    

def add_worker(worker: WorkerBase):
    """
        Add a worker.
    """

    new_worker = Worker(**worker.model_dump())

    with get_db_session() as db:
        db.add(new_worker)
        db.commit()
        db.refresh(new_worker)
        return new_worker
    

def update_worker(worker_id: int, worker: WorkerBase):
    """
        Update a worker.
    """
    with get_db_session() as db:
        existing_worker = db.query(Worker).filter(Worker.id == worker_id).first()
        if existing_worker:
            for key, value in worker.dict().items():
                setattr(existing_worker, key, value)
            db.commit()
            db.refresh(existing_worker)
            return existing_worker
        return None
    

def delete_worker(worker_id: int):
    """
        Delete a worker.
    """
    with get_db_session() as db:
        existing_worker = db.query(Worker).filter(Worker.id == worker_id).first()
        if existing_worker:
            db.delete(existing_worker)
            db.commit()
            return True
        return False
    

def create_user_for_worker(worker_id: int, user: UserCreate):
    """
        Create a user for a worker.
    """
    with get_db_session() as db:
        existing_worker = db.query(Worker).filter(Worker.id == worker_id).first()
        if existing_worker:
            new_user = User(**user.model_dump(), role="worker")
            db.add(new_user)
            db.refresh(new_user)

            user_worker = UserWorker(user_id=new_user.id, worker_id=existing_worker.id)
            db.add(user_worker)
            db.refresh(user_worker)
            db.commit()

            return new_user
        
        