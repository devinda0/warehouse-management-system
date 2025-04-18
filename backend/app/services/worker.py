from fastapi import HTTPException
from app.schemas import WorkerBase, UserCreate,WorkerResponse
from app.utils import generate_random_password
from app.database import (
    get_worker_by_user_id,
    get_workers,
    get_worker_by_id,
    add_worker,
    update_worker,
    get_workers_count,
    create_user_for_worker,
    delete_worker,
    get_workers_with_username
)

def handle_get_worker_by_user_id(id: int):
    """
        Handle the retrieval of a worker by user id.
    """
    worker = get_worker_by_user_id(id)
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    return worker


def handle_get_workers(skip: int = 0, limit: int = 100):
    """
        Handle the retrieval of all workers.
    """
    workers = get_workers_with_username(skip, limit)
    print(workers)
    if not workers:
        raise HTTPException(status_code=404, detail="No workers found")
    return workers


def handle_get_workers_count():
    """
        Handle the retrieval of the count of workers.
    """
    count = get_workers_count()
    if count is None:
        raise HTTPException(status_code=404, detail="No workers found")
    return count


def handle_get_worker_by_id(id: int):
    """
        Handle the retrieval of a worker by id.
    """
    worker = get_worker_by_id(id)
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    return worker


def handle_add_worker(worker: WorkerBase):
    """
        Handle the addition of a new worker.
    """
    new_worker = add_worker(worker)
    if not new_worker:
        raise HTTPException(status_code=400, detail="Failed to create worker")
    return new_worker


def handle_update_worker(worker_id: int, worker: WorkerBase):
    """
        Handle the update of an existing worker.
    """
    updated_worker = update_worker(worker_id, worker)
    if not updated_worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    return updated_worker


def handle_delete_worker(worker_id: int):
    """
        Handle the deletion of a worker.
    """
    deleted = delete_worker(worker_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Worker not found")
    return {"message": "Worker deleted successfully"}


def handle_create_user_for_worker(worker_id: int, username: str):
    """
        Handle the creation of a new user for a worker.
    """
    worker = get_worker_by_id(worker_id)
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")

    password = generate_random_password()
    user_create = UserCreate(username=username, password=password)
    new_user = create_user_for_worker(worker_id, user_create)
    if not new_user:
        raise HTTPException(status_code=400, detail="Failed to create user")
    print(f"User created with username: {username} and password: {password}")
    return {"message": "User created successfully"}