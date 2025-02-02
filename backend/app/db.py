from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from models import Base

# Database URL from Docker (using asyncpg for PostgreSQL)
SQLALCHEMY_DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/recipe_db"

# Create async engine
engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)

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