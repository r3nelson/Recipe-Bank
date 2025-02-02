from fastapi import FastAPI
from contextlib import asynccontextmanager
from routes import router
from db import create_tables 

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables() # Ensure tables exist before app starts
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(router, prefix='/api', tags=['Recipes'])

