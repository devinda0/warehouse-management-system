from fastapi import APIRouter
from app.database import get_session
from app.models import User

authRouter = APIRouter()

@authRouter.get("/login")
async def login():
    return {"message": "Login endpoint"}