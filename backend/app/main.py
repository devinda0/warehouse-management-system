from fastapi import FastAPI
from app.api import (
    authRouter,
    requestRouter,
    quotationRouter,
)

app = FastAPI()

app.include_router(authRouter, prefix="/api/auth", tags=["auth"])
app.include_router(requestRouter, prefix="/api/request", tags=["request"])
app.include_router(quotationRouter, prefix="/api/quotation", tags=["quotation"])