from fastapi import FastAPI
from app.api import authRouter

app = FastAPI()

app.include_router(authRouter, prefix="/api/auth", tags=["auth"])


# mention running port
print("app is running on port 8000")
