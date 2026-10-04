from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status, Request, Response, Header
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from passlib.context import CryptContext
from jose import JWTError,  ExpiredSignatureError, jwt
from models import User as DBUser
from schemas import UserRead
from db import get_db
from config import JWT_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_DAYS

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Define token URL (must match your login route for token generation)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")  

# Helper function to hash passwords
def hash_password(password: str):
    return pwd_context.hash(password)

# Helper function to verify passwords
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

async def verify_csrf_token(request: Request, x_csrf_token: str = Header(...)):
    cookie_token = request.cookies.get("csrf_token")
    if not cookie_token or cookie_token != x_csrf_token:
        raise HTTPException(status_code=403, detail="Invalid or missing CSRF token")


# Generate JWT Token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    
    try:
        return jwt.encode(to_encode, JWT_KEY, algorithm=ALGORITHM)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error creating token")


def create_refresh_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_KEY, algorithm=ALGORITHM)

async def try_refresh_token(request: Request, response: Response, db: AsyncSession):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        print("No refresh token")
        # raise HTTPException(status_code=401, detail="No refresh token")
        return 

    try:
        payload = jwt.decode(refresh_token, JWT_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            # raise HTTPException(status_code=401, detail="Invalid refresh token")
            print("Invalid refresh token")
            return

        result = await db.execute(select(DBUser).where(DBUser.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            # raise HTTPException(status_code=401, detail="User not found")
            print("User not found")
            return

        new_access_token = create_access_token({"user_id": user_id})
        
        response.set_cookie(
            key="access_token",
            value=new_access_token,
            httponly=True,
            secure=False,  # Set to True in prod
            samesite="Lax",
            max_age=3600,
            path="/"
        )
        return new_access_token

    except JWTError:
        # raise HTTPException(status_code=401, detail="Invalid refresh token")
        print("JWTError: Invalid refresh token")
        return

# Decode JWT Token
async def get_current_user(request: Request, response: Response, db: AsyncSession = Depends(get_db)) -> UserRead| None:

    access_token = request.cookies.get("access_token")
    user_id = None

    if access_token:
        try:
            payload = jwt.decode(access_token, JWT_KEY, algorithms=[ALGORITHM])
            user_id = payload.get("user_id")
        except (ExpiredSignatureError, JWTError):
            pass
        
    if not user_id:
        new_access_token = await try_refresh_token(request, response, db)
        if new_access_token:
            try:
                payload = jwt.decode(new_access_token, JWT_KEY, algorithms=[ALGORITHM])
                user_id = payload.get("user_id")
            except JWTError:
            # failed to decode refresh token
                pass

    if not user_id:
        return None
    
    result = await db.execute(select(DBUser).where(DBUser.id == user_id))
    user = result.scalar_one_or_none()

    if not user:
        return None
    
    return UserRead(id=user.id, email=user.email, name=user.name)

