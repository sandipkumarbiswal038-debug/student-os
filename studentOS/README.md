# Student OS — Spine

Student OS is a mobile-first web application for MCA students. The Spine team owns the shared foundation: authentication, shared data, reusable UI components, and core APIs.

## Local setup

### Backend

```powershell
cd C:\Users\Saninee\studentOS\studentOS
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py migrate
python manage.py configure_google_sso
python manage.py runserver
```

The backend runs at `http://127.0.0.1:8000`.

### Frontend

```powershell
cd C:\Users\Saninee\studentOS\studentOS\frontend
npm install
npm run dev
```

The frontend runs at the address shown by Vite, usually `http://localhost:5173`.

### Google SSO setup

1. Copy `.env.example` to `.env` and set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from a Google OAuth web client.
2. In Google Cloud, add `http://127.0.0.1:8000/accounts/google/login/callback/` as an authorised redirect URI.
3. Add MCA test accounts to the Google consent screen while the app is in Testing.
4. Run `python manage.py migrate`, then `python manage.py configure_google_sso`. This removes duplicate local Google Social Applications and creates exactly one app for `127.0.0.1:8000`.
5. Start the Django server and Vite server. Google login redirects back to the React shell and only accepts `@niisgroup.org` accounts.

Open `http://127.0.0.1:8000/accounts/google/login/?process=login` after both servers are running, or click **Sign in with Google** in the frontend. Use an existing college Google account ending in `@niisgroup.org`; the app does not create passwords or Google accounts.

Never commit `.env` or Google OAuth secrets.

Google credentials are stored in exactly one Django Social Application by `configure_google_sso`. Do not create extra Google Social Applications manually in Django Admin.

## Coding standards

- Use clear names for files, components, functions, and API endpoints.
- Keep one React component per file.
- Reuse shared components from `frontend/src/components` instead of duplicating buttons or cards.
- Keep Django views focused on one resource or action.
- Do not commit secrets, API keys, database passwords, or `.env` files.
- Run the relevant local server before opening a pull request.

## Shared API routes

- `GET /api/accounts/` — Google login connection check
- `POST /api/accounts/logout/` — clears the current Django session
- `GET /api/subjects/` — subject list
- `GET /api/class-sessions/` — class-session list
- `GET /api/notifications/` — current user's notification list
- `POST /api/notifications/create/` — create a notification
- `POST /api/notifications/<id>/read/` — mark a notification as read

## Shared components

Import shared UI from `frontend/src/components`.

- `Button` — primary or secondary action button.
- `Input` — labelled form field.
- `Card` — grouped content container.
- `Modal` — focused confirmation or detail dialog.
- `NavBar` — top application bar.
- `BottomTabBar` — mobile feature navigation.
- `Toast` — temporary feedback message.
- `Loader` — loading indicator.
- `EmptyState` — no-data message.
- `ErrorState` — recoverable error message.

Example:

```jsx
import { Button } from './components/Button'

<Button onClick={saveChanges}>Save changes</Button>
```

## Week 1 and Week 2 demo

Week 1 shows the running Django backend and the responsive React/Tailwind shell.

Week 2 shows Google SSO, shared UI components, and the shell on the local development environment. Staging deployment is completed after the team chooses Render or Railway.

## Deployment preparation

`render.yaml` contains the staging backend service configuration. Before deploying, set these values in Render:

- `DJANGO_SECRET_KEY` — a new private production key.
- `ALLOWED_HOSTS` — the generated Render backend hostname.
- `CORS_ALLOWED_ORIGINS` — the generated frontend hostname.
- `DATABASE_URL` — supplied by the Render PostgreSQL database.

For the frontend, set `VITE_API_BASE_URL` to the deployed backend URL during the static-site build.
