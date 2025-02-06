from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routes import router
from db import create_tables 


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

app.include_router(router, prefix='/api', tags=['Recipes'])

