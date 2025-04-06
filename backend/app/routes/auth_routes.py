from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..auth import hash_password, verify_password, create_access_token, get_current_user
from ..schemas import  UserCreate, UserRead, UserLogin, Token
from ..models import User as DBUser
from ..db import get_db


auth_router = APIRouter()
db_dependency = Depends(get_db)
user_dependency = Depends(get_current_user)

## --- Auth Routes ---

@auth_router.post("/register", response_model=UserRead)
async def register(user: UserCreate, db: AsyncSession = db_dependency):
    # Check if email already exists
    result = await db.execute(select(DBUser).filter(DBUser.email == user.email))
    existing_user = result.scalars().first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)
    db_user = DBUser(email=user.email, name=user.name, hashed_password=hashed_password)

    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)

    return db_user

# @auth_router.post("/login", response_model=Token)
# async def login(user: UserLogin, db: AsyncSession = db_dependency):
#     # Check if user exists
#     result = await db.execute(select(DBUser).filter(DBUser.email == user.email))
#     db_user = result.scalars().first()

#     if not db_user or not verify_password(user.password, db_user.hashed_password):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     # Generate JWT Token
#     access_token = create_access_token({"user_id": db_user.id})
#     return {"access_token": access_token, "token_type": "bearer"}

@auth_router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = db_dependency):
    # OAuth2PasswordRequestForm contains .username and .password
    result = await db.execute(select(DBUser).filter(DBUser.email == form_data.username))
    db_user = result.scalars().first()

    if not db_user or not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate JWT Token
    access_token = create_access_token({"user_id": db_user.id})
    return {"access_token": access_token, "token_type": "bearer"}

## Test Auth Route
@auth_router.get("/me")
async def read_users_me(current_user: UserRead = user_dependency):
    return {"user_id": current_user.id, "email": current_user.email, "name": current_user.name}



