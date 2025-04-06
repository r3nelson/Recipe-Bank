from pydantic import BaseModel, ConfigDict, Field, EmailStr
from typing import Optional, List

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None

class UserCreate(UserBase):
    password: str  # Include password when creating a user

class UserRead(UserBase):
    id: int

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None

# Recipe Schemas
class CreateRecipe(BaseModel):
    name: str
    haveCooked: bool = False
    ingredients: List[str] = Field(..., min_length=1)
    directions: List[str] = Field(..., min_length=1)
    quantityAndType: Optional[str] = None
    prepTime: Optional[int] = None
    cookTime: Optional[int] = None
    rating: Optional[float] = Field(0, ge=0, le=5)
    imgURL: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class ReadRecipe(CreateRecipe):
    id: int
    user_id: int 

    model_config = ConfigDict(from_attributes=True)

class UpdateRecipe(BaseModel):
    name: Optional[str] = None
    haveCooked: Optional[bool] = None
    ingredients: Optional[List[str]] = None
    directions: Optional[List[str]] = None
    quantityAndType: Optional[str] = None
    prepTime: Optional[int] = None
    cookTime: Optional[int] = None
    rating: Optional[float] = Field(None, ge=0, le=5)
    imgURL: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

