from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..models import Recipe as DBRecipe
from ..schemas import CreateRecipe, ReadRecipe, UpdateRecipe, UserRead
from ..auth import get_current_user
from ..db import get_db
from typing import List
import mimetypes
import shutil
import os

recipe_router = APIRouter()
db_dependency = Depends(get_db)
user_dependency = Depends(get_current_user)

UPLOAD_DIR = "../frontend/public/images"
os.makedirs(UPLOAD_DIR, exist_ok=True)


## --- Protected Recipe Routes (Requires Authentication) ---
@recipe_router.get("/recipes/{recipe_id}", response_model=ReadRecipe)
async def get_recipe(recipe_id: int,  current_user: UserRead = user_dependency, db: AsyncSession = db_dependency):
    # Use select for async queries
    recipe = await db.get(DBRecipe,recipe_id)

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    if recipe.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this recipe")
    
    return recipe

@recipe_router.get("/recipes",response_model=List[ReadRecipe])
async def get_all_recipes( current_user: UserRead = user_dependency, db: AsyncSession = db_dependency):
    
    res = await db.execute(select(DBRecipe).filter(DBRecipe.user_id == current_user.id))
    recipes = res.scalars().all()
    return recipes

@recipe_router.get("/recipes-ids",response_model=List[int])
async def get_all_recipe_ids(current_user: UserRead = user_dependency, db: AsyncSession = db_dependency):
    res = await db.execute(select(DBRecipe.id).filter(DBRecipe.user_id == current_user.id))
    recipes_ids = res.scalars().all()
    recipes_ids.sort()
    return recipes_ids

@recipe_router.post("/recipes", response_model=ReadRecipe)
async def create_recipe(recipe: CreateRecipe, current_user: UserRead = user_dependency, db: AsyncSession = db_dependency):
    db_recipe = DBRecipe(**recipe.model_dump(), user_id=current_user.id)
    db.add(db_recipe)
    await db.commit()  
    await db.refresh(db_recipe)  

    # Convert DBRecipe back to a Pydantic model (ReadRecipe) for the response
    return ReadRecipe.model_validate(db_recipe)

@recipe_router.patch("/recipes/{recipe_id}", response_model=ReadRecipe) 
async def update_recipe(recipe_id: int,  updated_recipe: UpdateRecipe, current_user: UserRead = user_dependency, db: AsyncSession = db_dependency):
    recipe = await db.get(DBRecipe, recipe_id)
    
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    if recipe.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this recipe")

    # update only the provided fields
    update_data = updated_recipe.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(recipe, key, value)
    
    await db.commit()
    await db.refresh(recipe)
    return recipe
    # return ReadRecipe.model_validate(recipe)
    
@recipe_router.delete("/recipes/{recipe_id}", response_model=ReadRecipe)
async def delete_recipe(recipe_id: int, current_user: UserRead = user_dependency, db: AsyncSession = db_dependency):
    recipe = await db.get(DBRecipe, recipe_id)

    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    if recipe.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this recipe")
    
    await db.delete(recipe)
    await db.commit()
    return recipe
    # return ReadRecipe.model_validate(recipe)

@recipe_router.post("/upload")
async def upload_file(file:UploadFile = File(None)):
    # Validate file type (only allow images)
    valid_mime_types = ["image/jpeg", "image/png", "image/gif"]
    mime_type, _ = mimetypes.guess_type(file.filename)

     
    if mime_type not in valid_mime_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG, PNG, or GIF allowed.")

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"filename": file.filename, "filepath": file_path}

@recipe_router.get("/image/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")

    media_type, _ = mimetypes.guess_type(file_path)
    return FileResponse(file_path, media_type=media_type or "application/octet-stream")


