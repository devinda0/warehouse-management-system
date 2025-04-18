from fastapi import FastAPI
from app.api import (
    authRouter,
    requestRouter,
    quotationRouter,
    itemRouter,
    workerRouter,
)
from app.api.warehouse import warehouseRouter
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authRouter, prefix="/api/auth", tags=["auth"])


app.include_router(requestRouter, prefix="/api/request", tags=["request"])
app.include_router(quotationRouter, prefix="/api/quotation", tags=["quotation"])
app.include_router(itemRouter, prefix="/api/item", tags=["item"])
app.include_router(warehouseRouter, prefix="/api/warehouse", tags=["warehouse"])
app.include_router(workerRouter, prefix="/api/worker", tags=["worker"])

# mention running port
print("app is running on port 8000")
