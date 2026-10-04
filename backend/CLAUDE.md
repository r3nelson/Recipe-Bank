# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

The app is fully containerized. All services are started from the **project root** (one level up from this directory) via docker-compose:

```bash
docker-compose up --build       # first run or after dependency changes
docker-compose up               # subsequent runs
docker-compose down             # stop all services
```

The backend FastAPI server runs on `http://localhost:8000` with `--reload` enabled. Interactive API docs are available at `http://localhost:8000/docs`.

There is no test suite yet. To manually verify the API, use the `/docs` Swagger UI or hit endpoints with curl/httpx.

## Database Migrations (Alembic)

Alembic manages the database schema. Run migrations from inside the running container:

```bash
# Apply all pending migrations (run this on first boot and after any schema change)
docker-compose exec backend alembic upgrade head

# If the tables already existed before Alembic was introduced, stamp instead of migrating:
docker-compose exec backend alembic stamp head

# Generate a new migration after changing models.py
docker-compose exec backend alembic revision --autogenerate -m "describe your change"

# Roll back one migration
docker-compose exec backend alembic downgrade -1
```

`alembic.ini` and the `alembic/` directory live inside `app/` so they are picked up by the docker-compose volume mount (`./backend/app:/app`). The `env.py` reads `DATABASE_URL` from the environment automatically — no manual edits needed.

## Architecture Overview

### Request Lifecycle

Every request flows: `main.py` → router → route handler → `get_current_user` dependency → DB query.

Authentication is **cookie-based JWT**, not bearer tokens. The `get_current_user` dependency in `auth.py` reads the `access_token` cookie, decodes it, and returns a `UserRead` or `None`. If the access token is expired, it silently attempts a refresh using the `refresh_token` cookie before returning. All recipe routes require a non-None `current_user` — they raise `HTTPException(403)` if the resolved user doesn't own the requested resource.

### Module Responsibilities

| File | Role |
|---|---|
| `app/main.py` | App factory, CORS config, router registration, lifespan (waits for DB, creates tables) |
| `app/config.py` | Reads all env vars via `python-dotenv`; imported by other modules |
| `app/db.py` | Async SQLAlchemy engine + session factory; `get_db` dependency; `wait_for_db` retry loop |
| `app/models.py` | SQLAlchemy ORM models (`User`, `Recipe`) — source of truth for DB schema |
| `app/schemas.py` | Pydantic v2 models for request validation and response serialization |
| `app/auth.py` | Password hashing, JWT creation/decoding, `get_current_user`, CSRF verification |
| `app/routes/auth_routes.py` | Register, login, logout, refresh, login status, `/me` |
| `app/routes/recipe_routes.py` | Full CRUD for recipes + image upload/serve |

### Database

PostgreSQL accessed via SQLAlchemy 2.0 async API (`asyncpg` driver). Tables are created automatically at startup via `Base.metadata.create_all` — there are **no Alembic migrations in use** (alembic is installed but not initialized). Any schema change to `models.py` requires manually dropping and recreating tables, or initializing Alembic.

`imgURL` on `Recipe` stores a UUID-based filename (not a full path or URL). Images are stored locally in `app/uploads/images/` and served via `GET /api/image/{filename}`.

### Auth Token Flow

1. Login → server sets three cookies: `access_token` (httponly, 1h), `refresh_token` (httponly, 7d), `csrf_token` (JS-readable, 1h)
2. All subsequent requests carry cookies automatically
3. `get_current_user` is a shared dependency — it attempts access token decode, then silent refresh if expired
4. `POST /auth/refresh` is the explicit refresh endpoint and requires the `X-CSRF-Token` header

### Environment Variables

Required in `.env` (loaded by `config.py`):

```
DATABASE_URL=postgresql+asyncpg://postgres:postgres@db:5432/recipe_db
JWT_KEY=<hex string>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=7
```

`db` in `DATABASE_URL` is the Docker Compose service name for the Postgres container. For local development outside Docker, change it to `localhost`.

## Known Incomplete Areas

- **Image upload during recipe creation/update** — the file handling code in `POST /api/recipes` and `PATCH /api/recipes/{recipe_id}` is commented out. Image upload is a deliberate two-step flow: create the recipe first, then call `POST /api/upload?recipe_id={id}` which saves the file and updates `imgURL` on the recipe atomically.
- **CSRF** — `verify_csrf_token` is only enforced on `POST /auth/refresh`; other mutating routes don't use it.
- **Cookie security** — `secure=False` on all cookies; must be `True` in production (requires HTTPS).
