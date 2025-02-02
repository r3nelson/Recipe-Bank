from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from models import Recipe as DBRecipe
from schemas import CreateRecipe, ReadRecipe
from db import get_db
from typing import List

router = APIRouter()

@router.post("/recipes", response_model=ReadRecipe)
async def create_recipe(recipe: CreateRecipe, db: AsyncSession = Depends(get_db)):
    db_recipe = DBRecipe(**recipe.model_dump())
    db.add(db_recipe)
    await db.commit()  # Commit asynchronously
    await db.refresh(db_recipe)  # Refresh asynchronously
    return db_recipe

@router.get("/recipes/{recipe_id}", response_model=ReadRecipe)
async def get_recipe(recipe_id: int, db: AsyncSession = Depends(get_db)):
    # Use select for async queries
    result = await db.execute(select(DBRecipe).filter(DBRecipe.id == recipe_id))
    recipe = result.scalars().first()  # Get the first matching recipe

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    return recipe

@router.get("/recipes/",response_model=List[ReadRecipe])
async def get_all_recipes(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(DBRecipe))
    recipes = res.scalars().all()
    return recipes
