from fastapi import APIRouter, Depends, HTTPException
from app.services import (
    handle_get_workers,
    handle_get_worker_by_id,
    handle_add_worker,
    handle_update_worker,
    handle_get_workers_count,
    handle_create_user_for_worker,
    handle_delete_worker,
)
from app.schemas import WorkerBase, UserCreate, WorkerQueryParams, WorkerResponse, WorkerUserCreate


workerRouter = APIRouter()


@workerRouter.get("/{id}", response_model=WorkerBase)
async def get_worker_by_user_id(id: int):
    """
        Get a worker by user id.
    """
    return handle_get_worker_by_id(id)


@workerRouter.get("/", response_model=list[WorkerResponse])
async def get_workers(
    params: WorkerQueryParams = Depends(),
):
    """
        Get all workers.
    """
    skip = (params.page - 1) * params.limit
    limit = params.limit
    return handle_get_workers(skip=skip, limit=limit)


@workerRouter.get("/count", response_model=int)
async def get_workers_count():
    """
        Get the count of workers.
    """
    return handle_get_workers_count()


@workerRouter.post("/", response_model=WorkerBase)
async def add_worker(
    worker: WorkerBase,
):
    """
        Add a new worker.
    """
    return handle_add_worker(worker)


@workerRouter.put("/{worker_id}", response_model=WorkerBase)
async def update_worker(
    worker_id: int,
    worker: WorkerBase,
):
    """
        Update a worker.
    """
    return handle_update_worker(worker_id=worker_id, worker=worker)


@workerRouter.delete("/{worker_id}", response_model=dict[str, str])
async def delete_worker(
    worker_id: int,
):
    """
        Delete a worker.
    """
    return handle_delete_worker(worker_id=worker_id)


@workerRouter.post("/create_user", response_model=dict[str, str])
async def create_user_for_worker(
    payload: WorkerUserCreate,
):
    """
        Create a user for a worker.
    """
    return handle_create_user_for_worker(worker_id=payload.worker_id, username=payload.username)