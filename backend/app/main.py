from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .db import create_tables 
from .routes.auth_routes import auth_router
from .routes.recipe_routes import recipe_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables() # Ensure tables exist before app starts
    yield

app = FastAPI(lifespan=lifespan)

# CORS config
origins = [
    # allowed origins
    "http://localhost:5173"
]

app.add_middleware(CORSMiddleware,
    allow_origins= origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
    )

app.include_router(auth_router, prefix='/auth', tags=['Auth'])
app.include_router(recipe_router, prefix='/api', tags=['Recipes'])


