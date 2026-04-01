# AGENTS.md — EmpregaEla Platform

## Project Overview

**EmpregaEla** is a job marketplace web platform focused on **women in the workforce**.
Companies can register and post job openings. Job seekers can browse listings without authentication and apply with an account. The platform also provides access to professional development courses behind authentication, similar to Hotmart.

---

## Tech Stack

- **Frontend**: HTML5, CSS3 (custom properties / CSS variables), Vanilla TypeScript
- **Build Tool**: Vite (with TypeScript support)
- **Backend**: Node.js + Express (TypeScript)
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: JWT (access + refresh tokens) stored in httpOnly cookies
- **Styling Philosophy**: Minimalist, clean, light colors — feminine but professional

---

## Project Structure

```
empregaela/
├── AGENTS.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── prisma/
│   └── schema.prisma
├── src/
│   ├── client/               # Frontend TypeScript
│   │   ├── main.ts
│   │   ├── router.ts
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── variables.css
│   │   └── pages/
│   │       ├── home.ts
│   │       ├── jobs.ts           # Public job listing
│   │       ├── job-detail.ts     # Public job detail view
│   │       ├── apply.ts          # Auth-required: apply to job
│   │       ├── courses.ts        # Auth-required: course catalog
│   │       ├── course-detail.ts  # Auth-required: enroll/access course
│   │       ├── register-person.ts
│   │       ├── register-company.ts
│   │       └── login.ts
│   └── server/               # Backend TypeScript (Express)
│       ├── index.ts
│       ├── routes/
│       │   ├── auth.routes.ts
│       │   ├── jobs.routes.ts
│       │   ├── companies.routes.ts
│       │   ├── persons.routes.ts
│       │   └── courses.routes.ts
│       ├── controllers/
│       ├── middleware/
│       │   ├── auth.middleware.ts
│       │   └── error.middleware.ts
│       ├── services/
│       └── utils/
└── public/
    └── assets/
```

---

## Core Rules for Agents

### Authentication Rules (CRITICAL)
- **Public routes** (no auth needed): `/jobs`, `/jobs/:id`, `/`, company registration, person registration, login
- **Protected routes** (auth required): `/apply/:jobId`, `/courses`, `/courses/:id`
- Apply the `authMiddleware` on the server for protected API endpoints
- On the client, check JWT before rendering protected pages — redirect to `/login` if not authenticated
- Never expose raw passwords; always hash with `bcrypt` (salt rounds: 12)
- JWT secret must come from environment variable `JWT_SECRET`

### Coding Standards
- **TypeScript strict mode** is ON — no `any` types unless explicitly justified with a comment
- Use `async/await` — no raw `.then()` chains
- All API responses follow this shape:
  ```json
  { "success": true, "data": {}, "message": "" }
  { "success": false, "error": "description" }
  ```
- Handle all errors with the global error middleware — never swallow errors silently
- Use Prisma transactions when multiple DB writes are involved

### Design Rules
- CSS custom properties only — no hardcoded color hex values outside `variables.css`
- Color palette lives in `src/client/styles/variables.css`:
  ```css
  --color-primary: #C2185B;       /* rose/pink — brand accent */
  --color-primary-light: #F8BBD0;
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text: #1A1A2E;
  --color-text-muted: #6B7280;
  --color-border: #E5E7EB;
  --color-success: #10B981;
  --color-error: #EF4444;
  ```
- Font: `DM Sans` (body) + `Playfair Display` (headings) — load from Google Fonts
- Mobile-first responsive design (breakpoints: 640px, 768px, 1024px, 1280px)
- All interactive elements must have `:focus-visible` styles for accessibility

### Pages & Sections

| Page | Path | Auth Required | Description |
|------|------|--------------|-------------|
| Home | `/` | No | Hero, platform value prop, CTA |
| Job Listings | `/jobs` | No | Browse all open jobs with search/filter |
| Job Detail | `/jobs/:id` | No | Full job description + Apply CTA |
| Apply to Job | `/apply/:id` | **YES** | Application form — redirect to login if not authenticated |
| Courses | `/courses` | **YES** | Course catalog (Hotmart-style grid) |
| Course Detail | `/courses/:id` | **YES** | Enroll / access course content |
| Person Registration | `/register` | No | Job seeker sign-up |
| Company Registration | `/register/company` | No | Employer sign-up |
| Login | `/login` | No | Unified login page |

### Database Models (Prisma)

```prisma
model Company {
  id          String   @id @default(uuid())
  name        String
  email       String   @unique
  cnpj        String   @unique
  password    String
  description String?
  logo        String?
  jobs        Job[]
  createdAt   DateTime @default(now())
}

model Person {
  id           String        @id @default(uuid())
  name         String
  email        String        @unique
  password     String
  resume       String?
  applications Application[]
  createdAt    DateTime      @default(now())
}

model Job {
  id           String        @id @default(uuid())
  title        String
  description  String
  location     String
  salary       String?
  type         JobType       // FULL_TIME | PART_TIME | FREELANCE | INTERNSHIP
  remote       Boolean       @default(false)
  companyId    String
  company      Company       @relation(fields: [companyId], references: [id])
  applications Application[]
  isActive     Boolean       @default(true)
  createdAt    DateTime      @default(now())
}

model Application {
  id        String   @id @default(uuid())
  personId  String
  jobId     String
  person    Person   @relation(fields: [personId], references: [id])
  job       Job      @relation(fields: [jobId], references: [id])
  message   String?
  status    AppStatus @default(PENDING) // PENDING | REVIEWED | ACCEPTED | REJECTED
  createdAt DateTime @default(now())

  @@unique([personId, jobId])
}

model Course {
  id          String   @id @default(uuid())
  title       String
  description String
  instructor  String
  thumbnail   String?
  duration    String
  level       String
  price       Float    @default(0)
  isFree      Boolean  @default(true)
  modules     Module[]
  createdAt   DateTime @default(now())
}

model Module {
  id       String   @id @default(uuid())
  title    String
  courseId String
  course   Course   @relation(fields: [courseId], references: [id])
  lessons  Lesson[]
  order    Int
}

model Lesson {
  id       String @id @default(uuid())
  title    String
  videoUrl String?
  content  String?
  moduleId String
  module   Module @relation(fields: [moduleId], references: [id])
  order    Int
}
```

### API Endpoints

```
POST   /api/auth/register/person
POST   /api/auth/register/company
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/jobs                  (public)
GET    /api/jobs/:id              (public)
POST   /api/jobs                  (company auth)
PUT    /api/jobs/:id              (company auth, own job only)
DELETE /api/jobs/:id              (company auth, own job only)

POST   /api/jobs/:id/apply        (person auth)
GET    /api/applications/mine     (person auth)

GET    /api/courses               (person auth)
GET    /api/courses/:id           (person auth)

GET    /api/companies/me          (company auth)
```

### Environment Variables

Always read from `.env` — never hardcode:
```
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
```

---

## Agent Behavior Guidelines

1. **Plan before you code** — for any new feature, briefly outline the approach before writing files
2. **One concern per file** — controllers handle HTTP, services handle business logic, utils handle helpers
3. **Never delete existing routes** without explicit instruction
4. **Seed data** — create `prisma/seed.ts` with at least 3 companies, 10 jobs, and 5 courses for development
5. **Error messages** must be user-friendly in Portuguese (pt-BR) on the frontend; technical logs in English
6. **Accessibility**: all images need `alt` attributes; forms need `label` associations; color contrast must meet WCAG AA
7. **Git discipline**: commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)

---

## Women-First Design Principles

- Copy and microcopy must be **inclusive and empowering** — never diminutive
- Highlight diversity metrics where possible (e.g., "X% of our job openings are at companies with gender equity policies")
- Course catalog should prioritize content on leadership, negotiation, tech skills, and entrepreneurship
- Job filters should include a "Women-Friendly Company" badge/filter — companies can self-certify

---

*Last updated: 2026 — EmpregaEla Platform*
