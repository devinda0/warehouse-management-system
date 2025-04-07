from bcrypt import hashpw, gensalt, checkpw
import random
import string

def hash_password(password: str) -> str:
    """
    Hash a password using bcrypt.
    
    Args:
        password (str): The password to hash.
    
    Returns:
        str: The hashed password.
    """
    return hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a password against a hashed password.

    Args:
        plain_password (str): The plain password to verify.
        hashed_password (str): The hashed password to check against.

    Returns:
        bool: True if the password matches, False otherwise.
    """
    return checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


def is_strong_password(password: str) -> bool:
    """
    Check if a password is strong. 

    A strong password is defined as having at least 8 characters,

    including at least one uppercase letter, one lowercase letter,

    one digit, and one special character.

    Args:
        password (str): The password to check.
    Returns:
        bool: True if the password is strong, False otherwise.
    """
    if len(password) < 8:
        return False
    if not any(char.isupper() for char in password):
        return False
    if not any(char.islower() for char in password):
        return False
    if not any(char.isdigit() for char in password):
        return False
    if not any(char in "!@#$%^&*()-_=+[]{};:,.<>?/" for char in password):
        return False
    return True


def generate_random_password(length: int = 12) -> str:
    """
    Generate a random password of a given length.

    Args:
        length (int): The length of the password to generate.

    Returns:
        str: The generated password.
    """

    characters = string.ascii_letters + string.digits + "!@#$%^&*()-_=+[]{};:,.<>?/"
    return ''.join(random.choice(characters) for _ in range(length))
