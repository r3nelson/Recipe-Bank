from dotenv import load_dotenv
import os

# Load .env variables (only needed for local development)
load_dotenv()

## Environment variables

# Database
DATABASE_URL = os.getenv("DATABASE_URL")

# Authentication
JWT_KEY = os.getenv("JWT_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

## S3
# AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
# AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")