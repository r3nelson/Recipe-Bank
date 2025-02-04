from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from models import Recipe as DBRecipe
from schemas import CreateRecipe, ReadRecipe, UpdateRecipe
from db import get_db
from typing import List

router = APIRouter()

@router.get("/recipes/{recipe_id}", response_model=ReadRecipe)
async def get_recipe(recipe_id: int, db: AsyncSession = Depends(get_db)):
    # Use select for async queries
    recipe = await db.get(DBRecipe,recipe_id)

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.get("/recipes/",response_model=List[ReadRecipe])
async def get_all_recipes(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(DBRecipe))
    recipes = res.scalars().all()
    return recipes

@router.post("/recipes", response_model=ReadRecipe)
async def create_recipe(recipe: CreateRecipe, db: AsyncSession = Depends(get_db)):
    db_recipe = DBRecipe(**recipe.model_dump())
    
    db.add(db_recipe)
    await db.commit()  # Commit asynchronously
    await db.refresh(db_recipe)  # Refresh asynchronously

    # Convert DBRecipe back to a Pydantic model (ReadRecipe) for the response
    return ReadRecipe.model_validate(db_recipe)

@router.patch("/recipes/{recipe_id}", response_model=ReadRecipe)
async def update_recipe(recipe_id: int, updated_recipe: UpdateRecipe,  db: AsyncSession = Depends(get_db)):
    recipe = await db.get(DBRecipe, recipe_id)

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    # update only the provided fields
    update_data = updated_recipe.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(recipe, key, value)

    await db.commit()
    await db.refresh(recipe)
    return recipe
    
@router.delete("recipes/{recipe_id}", response_model=ReadRecipe)
async def delete_recipe(recipe_id: int, db: AsyncSession = Depends(get_db)):
    recipe = await db.get(DBRecipe, recipe_id)

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    await db.delete(recipe)
    await db.commit()
    return recipe
