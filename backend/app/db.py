import asyncio
import asyncpg
from urllib.parse import urlparse, urlunparse
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from models import Base
from config import DATABASE_URL

# Database URL from Docker (using asyncpg for PostgreSQL)
SQLALCHEMY_DATABASE_URL = DATABASE_URL

# Create async engine
engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)

# function to watit for db to initaliaze before attempting connection
# docker health check should suffice but included in case change from docker
async def wait_for_db(retries: int = 10, delay: int = 2):
    # Remove '+asyncpg' from the scheme for asyncpg
    parsed = urlparse(DATABASE_URL)
    scheme = parsed.scheme.replace('+asyncpg', '')
    db_url = urlunparse(parsed._replace(scheme=scheme))

    for i in range(retries):
        try:
            conn = await asyncpg.connect(db_url)
            await conn.close()
            print("Database is ready!")
            return
        except Exception as e:
            print(f"Database not ready (attempt {i+1}/{retries}): {e}")
            await asyncio.sleep(delay)
    raise Exception("Database not ready after multiple attempts")

# Function to create tables before session initialization
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Create session factory for async
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Dependency for getting the async DB session
async def get_db():
    async with AsyncSessionLocal() as db:
        yield db