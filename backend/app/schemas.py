from pydantic import BaseModel
from typing import Optional, List

class CreateRecipe(BaseModel):
    title: str
    haveCooked: bool  
    ingredients: List[str]
    instructions: List[str]
    cookTime: Optional[int] = None
    rating: Optional[float] = None

class ReadRecipe(CreateRecipe):
    id: int

    class Config:
        from_attributes = True  # Allows reading ORM objects. Pydantic models by default only works with dictionaries

class UpdateRecipe(BaseModel):
    title: Optional[str] = None
    haveCooked: Optional[bool] = None
    ingredients: Optional[List[str]] = None
    instructions: Optional[List[str]] = None
    cookTime: Optional[int] = None
    rating: Optional[float] = None

    class Config:
        from_attributes = True

