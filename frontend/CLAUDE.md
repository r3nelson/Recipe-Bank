# CLAUDE.md — Frontend

This file provides guidance to Claude Code when working with the frontend of this repository.

## Running the App

The preferred way to run everything is from the **project root** via Docker Compose (see `backend/CLAUDE.md` for details). To run the frontend alone outside Docker:

```bash
cd frontend
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # TypeScript check + production build
npm run preview    # serve the production build locally
```

## Architecture Overview

React 18 SPA written in TypeScript, bundled with Vite 6, styled with Tailwind CSS 4. Client-side routing via React Router v7.

```
src/
  api/            # Fetch wrappers — authAPI.ts, recipeAPI.ts
  components/     # Reusable UI (buttons/, forms/, recipeCard components/)
  context/        # AuthContext.tsx — global auth state
  hooks/          # Custom hooks (useAuth, useGetRecipes, useDeleteRecipe, …)
  pages/          # Route-level components (Landing, Login, Registration, Home, NotFound)
  types/          # TypeScript interfaces (recipe.ts, user.ts)
  App.tsx         # BrowserRouter + route definitions
  main.tsx        # React root mount
```

### Route Map

| Path | Component | Auth required |
|---|---|---|
| `/` | `Landing` | No |
| `/login` | `Login` | No |
| `/register` | `Registration` | No |
| `/home` | `Home` | Yes — `<ProtectedRoute>` redirects to `/` if not logged in |
| `*` | `NotFound` | — |

### Auth Flow

1. Login (`POST /auth/login`) → backend sets three cookies: `access_token` (httpOnly, 1 h), `refresh_token` (httpOnly, 7 d), `csrf_token` (JS-readable, 1 h).
2. Every fetch call uses `credentials: "include"` so cookies are sent automatically.
3. `fetchWithAuthRetry()` in `authAPI.ts` wraps every authenticated request — on a `401` it calls `POST /auth/refresh` once, then retries the original request.
4. Non-GET requests include the `X-CSRF-Token` header read from `document.cookie`.
5. `AuthContext` / `useAuth()` exposes `isLoggedIn` and `refreshLoginStatus()` to the component tree.

### API Layer

All API calls live in `src/api/`. Base URLs are currently **hardcoded** (see Known Issues below):

```ts
// authAPI.ts
const baseURL = "http://localhost:8000/auth";

// recipeAPI.ts
const baseURL = "http://localhost:8000/api/recipes";
```

Images are fetched directly from `http://localhost:8000/api/image/{filename}`.

## Docker Setup

**Dockerfile** (`frontend/Dockerfile`):
- `node:22-bullseye` base, runs `npm ci --legacy-peer-deps` at build time, then `npm run dev`.
- Exposes port `5173`.

**docker-compose.yml** (project root) frontend service:
- Port: `5173:5173`
- Volume: `./frontend:/app` (live source) + anonymous `/app/node_modules` (keeps the image-installed modules)
- Network: `recipe-network` (shared with backend/db)
- Depends on: `backend` (`service_started`)

## Known Issues & Next Steps

### 1. Docker container fails to start / HMR broken

Vite's WebSocket connection for Hot Module Replacement breaks inside Docker because the browser tries to connect to the container's internal hostname.

**Fix — add HMR host config to `vite.config.ts`:**

```ts
server: {
  host: true,
  port: 5173,
  hmr: {
    clientPort: 5173,  // tell the browser which port to use for the WebSocket
  },
  watch: {
    usePolling: true,
  },
},
```

If the container still exits immediately, check that the image was built with the latest `package.json` — stale images won't have all dependencies. Rebuild with `docker-compose up --build`.

### 2. CORS / Docker network — backend unreachable

**Root cause:** API base URLs are hardcoded to `http://localhost:8000`. This works when the browser runs on the host machine and the backend container exposes port 8000 — but it breaks in two common scenarios:

- **Vite proxy not configured** — if you change the API URL to the internal Docker hostname (`http://backend:8000`), it would only work server-side, not in the browser.
- **Backend CORS list doesn't include your browser origin** — `main.py` currently allows `http://localhost:5173` and `http://127.0.0.1:5173`. If your browser hits the frontend on a different host (e.g., a VM or mobile device), requests will be blocked.

**Fix — use a Vite proxy (recommended approach):**

Configure Vite to proxy `/api` and `/auth` requests to the backend. This way:
- The browser only ever talks to `localhost:5173`
- The Vite dev server forwards to the backend (by service name inside Docker, or `localhost` outside)
- No hardcoded backend URLs in frontend code
- No CORS issues at all (same-origin from the browser's perspective)

```ts
// vite.config.ts
server: {
  host: true,
  port: 5173,
  hmr: { clientPort: 5173 },
  watch: { usePolling: true },
  proxy: {
    "/api": {
      target: "http://backend:8000",   // Docker service name
      changeOrigin: true,
    },
    "/auth": {
      target: "http://backend:8000",
      changeOrigin: true,
    },
  },
},
```

Then change API base URLs in the source:

```ts
// authAPI.ts
const baseURL = "/auth";

// recipeAPI.ts
const baseURL = "/api/recipes";
```

For local dev outside Docker, change `target` to `http://localhost:8000` or use a `VITE_API_TARGET` env variable read in `vite.config.ts`.

### 3. Hardcoded API URLs — no environment variable support

There is no `.env` file in the frontend. All URLs are string literals in `authAPI.ts` and `recipeAPI.ts`. Once the Vite proxy is in place (above) this is largely solved — but if you ever need the URL to be configurable at runtime, use Vite env variables:

```bash
# frontend/.env
VITE_API_URL=http://localhost:8000
```

```ts
const baseURL = `${import.meta.env.VITE_API_URL}/auth`;
```

Vite bakes `import.meta.env.VITE_*` values into the bundle at build time, so they can differ between dev and production builds.

### 4. Image uploads incomplete

The backend docs note that image upload during recipe create/update is a deliberate two-step flow: create the recipe first, then call `POST /api/upload?recipe_id={id}`. The frontend `ImageUpload.tsx` component exists but may not be fully wired into this two-step flow. Verify that after a recipe is created the image upload call is made with the returned `recipe_id`.

### 5. CSRF enforcement gaps

`fetchWithAuthRetry` sends the `X-CSRF-Token` header on all non-GET requests, but the backend currently only verifies it on `POST /auth/refresh`. This is safe for now but means the CSRF header on other mutating routes is ignored. When the backend adds CSRF enforcement to recipe routes, no frontend changes will be needed.

### 6. Cookie `secure` flag

Backend cookies are set with `secure=False` — they only work over HTTP. For any HTTPS deployment the backend must be updated first, or cookies will be silently dropped by the browser.

## Environment Variables (frontend)

None required today. Recommended addition:

| Variable | Purpose | Default |
|---|---|---|
| `VITE_API_TARGET` | Backend URL used by Vite proxy config | `http://backend:8000` |
