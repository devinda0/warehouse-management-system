from fastapi import Request, HTTPException
from app.utils import decode_jwt_token


def verify_jwt_token(request: Request):
    """
        Verify the JWT token from the request.
    """
    token = request.headers.get("Authorization")
    
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    if not token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    token = token.split(" ")[1]

    try:
        payload = decode_jwt_token(token)
        return payload
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")