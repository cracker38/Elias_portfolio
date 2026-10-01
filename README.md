# Elias Dukuzumuremyi — Portfolio

Full-stack professional portfolio: React (Vite) frontend, Node.js/Express REST API, SQLite database, and a JWT-protected admin dashboard.

## Stack

- Frontend: React, Vite, JavaScript, CSS
- Backend: Node.js, Express
- Database: SQLite (`node:sqlite`, no separate MySQL server required)
- Auth: JWT + bcrypt password hashing

The original brief mentioned MySQL. This project uses **SQLite** so it runs locally without extra database setup while keeping the same REST API shape.

## Project structure

```
portfolio/
├── frontend/
├── backend/
└── README.md
```

## Setup

### Backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

API: `http://localhost:5000`

Default admin (change immediately in `.env`, then delete `backend/data/portfolio.db` once if you need to re-seed):

- Email: `admin@localhost`
- Password: `ChangeThisPassword123!`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:5173` (proxies `/api` to the backend)

### Root convenience scripts

```bash
npm install
npm run dev
```

## Environment

See `backend/.env.example`. Never commit the real `.env`.

Optional:

- `PUBLIC_EMAIL` / `PUBLIC_LINKEDIN` for contact links
- `GITHUB_TOKEN` to raise GitHub API rate limits
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` used only on first seed

## Content policy

Projects are seeded from public GitHub repositories under `cracker38`. Employment history starts empty unless you add verified entries in admin. Certification dates and credential IDs should be updated in the dashboard.

## Admin

`/admin/login` → `/admin`

Manage projects, skills, experience, education, certifications, and contact messages.

## Security

- Passwords hashed with bcrypt
- Admin routes require JWT
- Helmet, CORS, rate limiting, and parameterized SQL
- Contact form posts to `POST /api/contact`
