from fastapi import FastAPI
from app.api import (
    authRouter,
    requestRouter,
    quotationRouter,
)
from app.api.warehouse import warehouseRouter

app = FastAPI()

app.include_router(authRouter, prefix="/api/auth", tags=["auth"])


app.include_router(requestRouter, prefix="/api/request", tags=["request"])
app.include_router(quotationRouter, prefix="/api/quotation", tags=["quotation"])
app.include_router(warehouseRouter, prefix="/api/warehouse", tags=["warehouse"])
# mention running port
print("app is running on port 8000")
