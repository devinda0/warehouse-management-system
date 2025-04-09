from fastapi import FastAPI
from app.api import (
    authRouter,
    requestRouter,
    quotationRouter,
)
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

# mention running port
print("app is running on port 8000")
