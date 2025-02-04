from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, Literal

class Ingredient(BaseModel):
    name: str
    measurement_type: Literal["", "cup", "tbsp", "tsp", "g", "kg", "oz", "lb", "ml", "l","pt","qt","gal", "fl oz", "kg", "mg"]
    quantity: float = Field(..., gt=0)

class CreateRecipe(BaseModel):
    name: str
    haveCooked: bool = False
    ingredients: List[Ingredient] = Field(..., min_length=1)
    directions: List[str] = Field(..., min_length=1)
    quantity: Optional[float] = None
    prepTime: Optional[int] = None
    cookTime: Optional[int] = None
    rating: Optional[float] = Field(0, ge=0, le=5)

    model_config = ConfigDict(from_attributes=True)

class ReadRecipe(CreateRecipe):
    id: int

    model_config = ConfigDict(from_attributes=True)

class UpdateRecipe(BaseModel):
    name: Optional[str] = None
    haveCooked: Optional[bool] = None
    ingredients: List[Ingredient] = Field(None, min_length=1)
    directions: Optional[List[str]] = Field(None, min_length=1)
    quantity: Optional[float] = None
    prepTime: Optional[int] = None
    cookTime: Optional[int] = None
    rating: Optional[float] = Field(None, ge=0, le=5)

    model_config = ConfigDict(from_attributes=True)

