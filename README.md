# Nexus AI & Cloud Solutions

Enterprise B2B technology consulting website & enquiry management system.

## 1. Project Architecture

- **Frontend:** React 19 + Vite 8 + TypeScript + Tailwind CSS v4 + Framer Motion
- **Backend:** Python 3.13 + FastAPI + SQLAlchemy 2.0 + Pydantic v2
- **Database:** PostgreSQL (Supabase initial, AWS RDS ready) with Alembic migrations
- **Authentication:** Secure HTTP-only cookies + JWT (HS256) + direct `bcrypt` password hashing
- **Deployment Targets:**
  - Frontend: Vercel (rewrites configured in `frontend/vercel.json`)
  - Backend: Render (`Procfile` configured with Uvicorn ASGI server)
  - Database: Supabase / PostgreSQL (managed via Alembic)

---

## 2. Getting Started

### Prerequisites
- Node.js 20+ & npm
- Python 3.10+ (tested on Python 3.13)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

To run production build & type checks:
```bash
npm run build
```

### Backend Setup

```bash
cd backend
python -m venv .venv

# On Windows:
.\.venv\Scripts\Activate.ps1
# On Linux/macOS:
# source .venv/bin/activate

pip install -r requirements.txt
```

Create `.env` in `backend/` from `.env.example`:
```bash
cp .env.example .env
```

Start the FastAPI backend server:
```bash
uvicorn app.main:app --reload --port 8000
```

Backend API runs at `http://localhost:8000`.
- Health check: `http://localhost:8000/health`
- Interactive API Docs (local dev only): `http://localhost:8000/docs`

---

## 3. Database Migrations (Alembic)

Database schema is version-controlled via Alembic:

```bash
cd backend

# Apply migrations to database:
alembic upgrade head

# Roll back all migrations:
alembic downgrade base
```

---

## 4. Admin Account Management (CLI)

Admin users are created via the secure interactive CLI (no hardcoded passwords):

```bash
cd backend
python -m app.create_admin
```

Prompts will ask for:
- Username (minimum 3 characters)
- Email address
- Password (minimum 8 characters, securely hidden from terminal, hashed via bcrypt)

Admin Portal is accessed at `/admin` on the website.

---

## 5. Automated Backend Tests

The backend includes a comprehensive pytest suite running against an isolated in-memory test database:

```bash
cd backend
pytest -v
```

Tests cover:
- Health checks
- Contact, Project, and Service enquiry submissions
- Pydantic payload validation and bad input rejection
- Spam honeypot field rejection
- Unauthorized admin route blocking (401)
- Admin login, JWT issuance, HTTP-only cookie validation
- Full enquiry lifecycle (Create → List → View Details → Update Status → Complete → Logout)

---

## 6. Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000
VITE_SITE_NAME=Nexus AI & Cloud Solutions
VITE_SITE_URL=https://nexusaicloud.com
```

### Backend (`backend/.env`)
```env
# Database (PostgreSQL URL from Supabase)
DATABASE_URL=postgresql://user:password@localhost:5432/nexusaicloud

# JWT Secret
SECRET_KEY=change-this-to-a-random-secret-key-at-least-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# CORS Allowed Origin
FRONTEND_URL=http://localhost:5173

# Email Notifications (SMTP - provider-independent)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=noreply@nexusaicloud.com
SMTP_FROM_NAME=Nexus AI & Cloud Solutions
NOTIFICATION_EMAIL=contact@nexusaicloud.com

# Rate Limiting
RATE_LIMIT_PER_MINUTE=10
```

---

## 7. Project Structure

```
nexusaicloud/
├── frontend/
│   ├── public/
│   │   ├── fonts/           # Self-hosted Inter font
│   │   ├── robots.txt       # Search engine configuration
│   │   ├── sitemap.xml      # XML Sitemap
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, Footer, Layout, Section, PageWrapper
│   │   │   ├── sections/    # Hero, WhatWeDo, TechStrip, Services, Industries, CaseStudies, WhyNexus
│   │   │   └── ui/          # Button, Card, NumberedCard, Input, Textarea, Select, Badge, Container
│   │   ├── context/         # AuthContext (Admin session management)
│   │   ├── pages/           # Home, About, Services, ServiceDetail, Work, Contact, Privacy, NotFound
│   │   │   └── admin/       # AdminLogin, AdminDashboard
│   │   ├── services/        # api.ts, enquiry.ts, admin.ts
│   │   ├── styles/          # global.css (Tailwind v4 @theme design tokens)
│   │   └── types/           # TypeScript interfaces & types
│   ├── vercel.json          # Vercel deployment rewrites & cache headers
│   └── vite.config.ts       # Vite config with path aliases and proxy
└── backend/
    ├── alembic/             # Database migrations
    ├── app/
    │   ├── auth/            # JWT tokens & bcrypt password hashing
    │   ├── models/          # SQLAlchemy models (Enquiry, AdminUser)
    │   ├── routers/         # /health, /api/v1/contact, /api/v1/admin
    │   ├── schemas/         # Pydantic v2 validation schemas
    │   ├── services/        # Modular email notification service
    │   ├── config.py        # Settings via pydantic-settings
    │   ├── database.py      # SQLAlchemy engine & session factory
    │   ├── create_admin.py  # Interactive CLI for creating admin users
    │   └── main.py          # FastAPI application entry point
    ├── tests/               # Pytest suite with isolated test DB
    ├── Procfile             # Render deployment startup command
    └── requirements.txt     # Python dependencies
```
