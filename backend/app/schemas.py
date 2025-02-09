from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List

class Ingredient(BaseModel):
    nameAndQuantity: str

class CreateRecipe(BaseModel):
    name: str
    haveCooked: bool = False
    ingredients: List[Ingredient] = Field(..., min_length=1)
    directions: List[str] = Field(..., min_length=1)
    quantityAndType: Optional[str] = None
    prepTime: Optional[int] = None
    cookTime: Optional[int] = None
    rating: Optional[float] = Field(0, ge=0, le=5)
    imgURL: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class ReadRecipe(CreateRecipe):
    id: int

    model_config = ConfigDict(from_attributes=True)

class UpdateRecipe(BaseModel):
    name: Optional[str] = None
    haveCooked: Optional[bool] = None
    ingredients: List[Ingredient] = Field(None, min_length=1)
    directions: Optional[List[str]] = Field(None, min_length=1)
    quantityAndType: Optional[str] = None
    prepTime: Optional[int] = None
    cookTime: Optional[int] = None
    rating: Optional[float] = Field(None, ge=0, le=5)
    imgURL: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

