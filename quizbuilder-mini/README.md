# QuizBuilder-Mini

A small, self-contained mock-up of the MDCATemy quiz builder, built specifically as a Docker testbed for a complete frontend + backend + database stack.

```
quizbuilder-mini/
├── docker-compose.yml         <- spins up db + backend + frontend
├── backend/                   <- Express + Postgres
│   ├── Dockerfile
│   ├── schema.sql             <- DB schema (loaded by Postgres on first boot)
│   ├── db/seed.sql            <- 30 demo MCQs (6 per subject)
│   ├── controllers/
│   ├── routes/
│   └── ...
└── frontend/                  <- React + Vite, served via nginx
    ├── Dockerfile
    ├── nginx.conf             <- serves the SPA + proxies /api -> backend
    └── src/
```

## Stack
- **Frontend**: React 19 + Vite, served by **nginx** (multi-stage build)
- **Backend**: Node 20 + Express 5
- **Database**: PostgreSQL 16

## Features (5 screens)
1. **Home** — start the quiz builder
2. **Subjects** — pick one or more of: Biology, Chemistry, Physics, English, Logical Reasoning
3. **Configure** — enter how many easy / medium / hard MCQs you want
4. **Quiz** — answer MCQs one-by-one
5. **Result** — score + per-question review with explanations

No login. The DB tracks quizzes, the subjects each quiz covered, and every attempted MCQ.

---

## Quick start (Docker)

From inside the `quizbuilder-mini` folder:

```bash
docker compose up --build
```

That builds three images and starts three containers:

| Service  | Container          | Host port |
|----------|--------------------|-----------|
| frontend | `quizmini_frontend` | **8080**  |
| backend  | `quizmini_backend`  | 3000      |
| db       | `quizmini_db`       | 5433      |

Then open http://localhost:8080 in your browser.

The Postgres image automatically runs `backend/schema.sql` then `backend/db/seed.sql` on first boot (mounted into `/docker-entrypoint-initdb.d/`). On subsequent runs the data is preserved in the named volume `quizmini_pgdata`.

### Useful commands

```bash
# Stop the stack
docker compose down

# Stop AND wipe the database volume (forces re-seed on next up)
docker compose down -v

# Rebuild a single service
docker compose up --build backend

# View logs
docker compose logs -f backend
```

---

## Running without Docker (optional)

You can also run the pieces locally if you have Node 20+ and a Postgres instance.

### Backend
```bash
cd backend
cp .env.example .env        # then edit DATABASE_* if needed
# Apply schema + seed against your local DB:
psql "$DATABASE_URL" -f schema.sql
psql "$DATABASE_URL" -f db/seed.sql
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
# By default the dev server proxies /api to nginx, so for `npm run dev` set:
VITE_API_BASE=http://localhost:3000/api/v1 npm run dev
```

---

## API

Base URL: `http://localhost:3000/api/v1`

| Method | Path                  | Body / query                                                                  | Returns                          |
|--------|-----------------------|-------------------------------------------------------------------------------|----------------------------------|
| GET    | `/health`             | —                                                                             | `{ status: "ok" }`               |
| GET    | `/subjects`           | —                                                                             | List of 5 subjects               |
| POST   | `/quizzes/generate`   | `{ subject_ids:[…], easy:n, medium:n, hard:n }`                               | `{ count, mcqs[] }`              |
| POST   | `/quizzes/submit`     | `{ quiz_name?, subject_ids:[…], attempts:[{mcq_id,selected_option}] }`        | `{ quiz_id, correct_count, … }`  |
| GET    | `/quizzes`            | —                                                                             | All persisted quizzes            |
