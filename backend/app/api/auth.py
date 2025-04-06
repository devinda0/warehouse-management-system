from fastapi import APIRouter
from app.database import get_session

authRouter = APIRouter()

@authRouter.get("/login")
async def login():
    return {"message": "Login endpoint"}