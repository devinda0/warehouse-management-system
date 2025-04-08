from datetime import datetime, timedelta
from jwt import encode, decode, ExpiredSignatureError, InvalidTokenError
from dotenv import load_dotenv
import os

load_dotenv()

secret_key = os.getenv("JWT_SECRET_KEY")
algorithm = os.getenv("JWT_ALGORITHM", "HS256")


def create_jwt_token(
        data: dict, 
        expires_in: int = 3600
    ) -> str:
    """
    Create a JWT token.

    Args:
        data (dict): The payload data to encode in the token.
        secret_key (str): The secret key to sign the token.
        algorithm (str): The algorithm to use for signing the token.
        expires_in (int): The expiration time in seconds.

    Returns:
        str: The encoded JWT token.
    """
    data["exp"] = datetime.now() + timedelta(seconds=expires_in)
    return encode(data, secret_key, algorithm=algorithm)


def decode_jwt_token(token: str) -> dict:
    """
    Decode a JWT token.

    Args:
        token (str): The JWT token to decode.
        secret_key (str): The secret key to verify the token.
        algorithm (str): The algorithm used for signing the token.

    Returns:
        dict: The decoded payload data.
    """
    try:
        return decode(token, secret_key, algorithms=[algorithm])
    except ExpiredSignatureError:
        raise Exception("Token has expired")
    except InvalidTokenError:
        raise Exception("Invalid token")
    except Exception as e:
        raise Exception(f"Error decoding token: {e}")