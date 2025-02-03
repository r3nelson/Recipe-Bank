from pydantic import BaseModel, ConfigDict
from typing import Optional, List

class CreateRecipe(BaseModel):
    title: str
    haveCooked: bool  = False
    ingredients: List[str] = []
    instructions: List[str] = []
    cookTime: Optional[int] = None
    rating: Optional[float] = None

    model_config = ConfigDict(from_attributes=True)

class ReadRecipe(CreateRecipe):
    id: int

    model_config = ConfigDict(from_attributes=True)

class UpdateRecipe(BaseModel):
    title: Optional[str] = None
    haveCooked: Optional[bool] = None
    ingredients: Optional[List[str]] = None
    instructions: Optional[List[str]] = None
    cookTime: Optional[int] = None
    rating: Optional[float] = None

    model_config = ConfigDict(from_attributes=True)

