from pydantic import BaseModel, EmailStr, Field

class SupplierCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8, max_length=50)
    phone: str = Field(..., length=10)
    address: str = Field(..., min_length=10, max_length=255)


class SupplierBase(BaseModel):
    id: int
    name: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    phone: str = Field(..., length=10)
    address: str = Field(..., min_length=10, max_length=255)
    user_id: int

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8, max_length=50)


class UserBase(BaseModel):
    id: int
    username: str = Field(..., min_length=3, max_length=50)
    role : str = Field(..., min_length=3, max_length=50)

    class Config:
        orm_mode = True