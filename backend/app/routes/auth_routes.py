import secrets
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi import APIRouter, Depends, Response, HTTPException, status, Request
from jose import JWTError, jwt
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from auth import hash_password, verify_password, verify_csrf_token, create_access_token, create_refresh_token, get_current_user, try_refresh_token, oauth2_scheme, ALGORITHM, JWT_KEY
from schemas import  UserCreate, UserRead, UserLogin, Token
from models import User as DBUser
from db import get_db


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

@auth_router.post("/login")
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = db_dependency):
    # OAuth2PasswordRequestForm contains .username and .password
    result = await db.execute(select(DBUser).filter(DBUser.email == form_data.username))
    db_user = result.scalars().first()

    if not db_user or not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate JWT Token
    access_token = create_access_token({"user_id": db_user.id})
    refresh_token = create_refresh_token({"user_id": db_user.id})
    csrf_token = secrets.token_urlsafe(32)

    # Set the toekn as an HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,        # Change to True in production (requires HTTPS)
        samesite="Lax",      # Lax is good for most apps, can also use "Strict" or "None"
        max_age=3600,        # Cookie duration in seconds
        path="/"
    )

     # Set the refresh token as an HttpOnly cookie (optional, secure storage)
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,  # Change to True in production (requires HTTPS)
        samesite="Lax",  # Lax or Strict depending on your use case
        max_age=604800,  # Cookie duration in seconds (7 days)
        path="/"
    )

    response.set_cookie(
        key="csrf_token",
        value=csrf_token,
        httponly=False,  # Allow JavaScript to read it and include it in headers
        secure=False,
        samesite="Lax",
        max_age=3600,
        path="/"
    )

    return {"message": "Login successful"}

@auth_router.post("/logout")
async def logout(response: Response):
    # Clear the cookie by setting it to empty and expiring it immediately
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out successfully"}

@auth_router.post("/refresh")
async def refresh_token(request: Request, response: Response, db: AsyncSession = Depends(get_db), csrf_protect: None = Depends(verify_csrf_token)):
    return await try_refresh_token(request, response, db)

@auth_router.get("/check_login_status")
async def check_login_status(request: Request, response: Response, db: AsyncSession = Depends(get_db)):
    try:
        access_token = request.cookies.get("access_token")

        if access_token:
            try:
                payload = jwt.decode(access_token, JWT_KEY, algorithms=[ALGORITHM])
                if not payload.get("user_id"):
                    raise Exception()
                return {"message": "User is logged in"}
            except JWTError:
                print('JWTError')
                

        # Refresh attempt
        refresh = await try_refresh_token(request, response, db)
        
        if refresh:
            return {"message": "User is logged in"}
        
        return JSONResponse(
            status_code=401,
            content={"message": "User is NOT logged in."}
        )

    except Exception as e:
        print(f"Error in check_login_status: {e}")
        return JSONResponse(
            status_code=500,
            content={"message": "An unexpected error occurred."}
        )

## Test Auth Route
@auth_router.get("/me")
async def read_users_me(current_user: UserRead | None = Depends(get_current_user)):
    if current_user:
        return {"user_id": current_user.id, "email": current_user.email, "name": current_user.name}
    return {"user": None}
